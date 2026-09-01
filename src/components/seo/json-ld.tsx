/**
 * Renders a JSON-LD <script>. Use with the builders in `src/lib/schema.ts`:
 *
 *   <JsonLd data={graph(organizationSchema(), websiteSchema())} />
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Content is app-controlled structured data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
