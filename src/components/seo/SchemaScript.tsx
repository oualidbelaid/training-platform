import { Helmet } from 'react-helmet-async'

interface SchemaScriptProps {
  schema: object
}

/** Shared `<script type="application/ld+json">` renderer so every `*Schema` component below only has to build the plain object (see `lib/seo/structured-data.ts`), not repeat this markup. */
export function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
