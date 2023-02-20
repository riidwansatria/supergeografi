import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { SchemaOrg } from "./schemaorg"

export const Seo = ({ title, description, image, pathname, children, datePublished, isBlogPost }) => {
  const { title: defaultTitle, description: defaultDescription, image: defaultImage, siteUrl, twitterUsername } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `https:${image}` || defaultImage,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="og:title" content={seo.title} />
      <meta name="og:description" content={seo.description} />
      <meta name="og:image" content={seo.image} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />

      <SchemaOrg
        title={seo.title}
        url={seo.url}
        defaultTitle="Supergeografi"
        isBlogPost={isBlogPost}
        image={seo.image}
        description={seo.description}
        canonicalUrl={siteUrl}
        datePublished={datePublished}
      />

      {children}
    </>
  )
}