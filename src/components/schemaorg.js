import React from 'react'

export function SchemaOrg({
  isBlogPost,
  defaultTitle,
  title,
  url,
  image,
  description,
  canonicalUrl,
  datePublished,
}) {
  const baseSchema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: defaultTitle,
    },
  ]

  const schema = isBlogPost
    ? [
        ...baseSchema,
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url,
          name: title,
          alternateName: defaultTitle,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
          author: {
            '@type': 'Person',
            name: 'Ridwan Satria',
            url: 'https://ridwansatria.com'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Supergeografi',
          },
          mainEntityOfPage: {
            '@type': 'WebSite',
            '@id': canonicalUrl,
          },
          datePublished,
        },
      ]
    : baseSchema

  return (
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
  )
}