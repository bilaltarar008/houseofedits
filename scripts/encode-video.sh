#!/usr/bin/env bash
#
# encode-video.sh — turn a master file into an adaptive HLS ladder + poster.
#
# Requires ffmpeg (https://ffmpeg.org). On Windows use Git Bash or WSL.
#
# Usage:
#   ./scripts/encode-video.sh <input.mov> <output-name>
#
# Produces:
#   public/videos/<output-name>/
#     master.m3u8          <- point the CMS "HLS URL" field here
#     v0/ v1/ v2/          <- 1080p / 720p / 480p renditions
#     poster.jpg           <- first clean frame, ~1600px wide
#
# In production, upload the <output-name> folder to a CDN (Cloudflare R2 /
# Bunny) and set NEXT_PUBLIC_VIDEO_CDN_BASE so /videos/* resolves to it.

set -euo pipefail

INPUT="${1:?Usage: encode-video.sh <input> <output-name>}"
NAME="${2:?Usage: encode-video.sh <input> <output-name>}"
OUT="public/videos/${NAME}"

mkdir -p "${OUT}"

# Poster frame (skip 1s in to avoid a black first frame)
ffmpeg -y -ss 00:00:01 -i "${INPUT}" -frames:v 1 -vf "scale=1600:-2" -q:v 3 \
  "${OUT}/poster.jpg"

# Adaptive HLS: 1080p / 720p / 480p, 6s segments
ffmpeg -y -i "${INPUT}" \
  -filter_complex "[0:v]split=3[v1][v2][v3]; \
    [v1]scale=w=1920:h=-2[v1out]; \
    [v2]scale=w=1280:h=-2[v2out]; \
    [v3]scale=w=854:h=-2[v3out]" \
  -map "[v1out]" -c:v:0 libx264 -b:v:0 5000k -maxrate:v:0 5350k -bufsize:v:0 7500k \
  -map "[v2out]" -c:v:1 libx264 -b:v:1 2800k -maxrate:v:1 2996k -bufsize:v:1 4200k \
  -map "[v3out]" -c:v:2 libx264 -b:v:2 1200k -maxrate:v:2 1284k -bufsize:v:2 1800k \
  -map a:0 -map a:0 -map a:0 -c:a aac -b:a 128k -ac 2 \
  -x264-params "keyint=120:min-keyint=120:scenecut=0" \
  -preset veryslow -profile:v high -crf 20 -sc_threshold 0 \
  -g 120 -keyint_min 120 \
  -hls_time 6 -hls_playlist_type vod -hls_flags independent_segments \
  -hls_segment_type mpegts \
  -hls_segment_filename "${OUT}/v%v/segment_%03d.ts" \
  -master_pl_name master.m3u8 \
  -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" \
  "${OUT}/v%v/playlist.m3u8"

echo "Done -> ${OUT}/master.m3u8"
