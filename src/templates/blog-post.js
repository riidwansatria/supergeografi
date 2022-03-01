import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className=""
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="max-w-3xl mx-auto">
          <h1 itemProp="headline" className="text-5xl font-semibold py-4">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <div className="max-w-4xl mx-auto py-12">
          <img 
          className="w-full lg:h-96 sm:h-72 h-48 mx-auto object-cover rounded-md"
          src={post.frontmatter.featuredImage} alt={post.frontmatter.title}></img>
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="prose max-w-3xl mx-auto"
        />
      </article>
      <nav className="max-w-3xl mx-auto py-4 my-8 border-t-2 border-neutral-200">
        <ul
          className="flex flex-wrap justify-between p-0 uppercase font-semibold text-neutral-600 text-sm tracking-widest"
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
 