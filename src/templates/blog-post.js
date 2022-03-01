import * as React from "react"
import { Link, graphql } from "gatsby"
import { UserCircleIcon, CalendarIcon } from '@heroicons/react/outline'

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const author = data.site.siteMetadata.author?.name || `Supergeografi`
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
        {/* Article header */}
        <header className="grid grid-cols-2 bg-neutral-200 rounded-2xl items-center mt-6 mb-16">
          <div>
            <img 
            className="w-full sm:h-[32rem] h-48 mx-auto object-cover rounded-l-2xl"
            src={post.frontmatter.featuredImage} alt={post.frontmatter.title}></img>
          </div>
          <div className="p-12">
            <span className="uppercase text-sm text-primary font-bold tracking-wider">{post.frontmatter.category}</span>
            <h1 itemProp="headline" className="text-5xl font-semibold text-gray-800 py-4">{post.frontmatter.title}</h1>
            <div className='flex gap-4 mt-8'>
              <div className='flex gap-1 items-center'>
                <UserCircleIcon className="block h-4 w-4"/>
                <span className="uppercase text-sm font-medium tracking-wider">{author}</span>
              </div>
              <div className='flex gap-1 items-center'>
                <CalendarIcon className="block h-4 w-4"/>
                <span className="uppercase text-sm font-medium tracking-wider">{post.frontmatter.date}</span>
              </div>
            </div>
          </div>

        </header>
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
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
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
 