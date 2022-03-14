/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { Location } from '@reach/router'
import { SchemaOrg } from "./schemaorg"

const Seo = ({ description, lang, meta, title, image: customImage, datePublished, isBlogPost }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaImage = customImage || site.siteMetadata.image

  return (
    <Location>
      {({ location }) => {
        const url = `${site.siteMetadata.siteUrl}${location.pathname}`
        const image = `https:${metaImage}`
        return (
          <>
            <Helmet
              htmlAttributes={{
                lang,
              }}
              title={title}
              meta={[
                {
                  name: `description`,
                  content: metaDescription,
                },
                {
                  property: `og:title`,
                  content: title,
                },
                {
                  property: `og:description`,
                  content: metaDescription,
                },
                {
                  property: `og:image`,
                  content: image,
                },
                {
                  property: `og:type`,
                  content: `website`,
                },
                {
                  name: `twitter:card`,
                  content: `summary_large_image`,
                },
                {
                  name: `twitter:creator`,
                  content: site.siteMetadata?.social?.twitter || ``,
                },
                {
                  name: `twitter:title`,
                  content: title,
                },
                {
                  name: `twitter:description`,
                  content: metaDescription,
                },
                {
                  property: `twitter:image`,
                  content: image,
                },
              ].concat(meta)}
            />
            <SchemaOrg
              title={title}
              url={url}
              defaultTitle="Supergeografi"
              isBlogPost={isBlogPost}
              image={image}
              description={description}
              canonicalUrl={site.siteMetadata.siteUrl}
              datePublished={datePublished}
            />
          </>
        )
      }}
    </Location>
    
  )
}

Seo.defaultProps = {
  lang: `id`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
