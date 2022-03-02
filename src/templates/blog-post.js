import * as React from "react"
import { Link, graphql } from "gatsby"
import { UserCircleIcon, CalendarIcon } from '@heroicons/react/outline'

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const posts = data.allMarkdownRemark.nodes
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
        <div className='grid grid-cols-6 gap-8 max-w-6xl mx-auto'>
          {/* Main article */}
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
            className="prose col-span-4 p-4"
          />

          {/* Sidebar */}
          <div className="col-span-2 grid grid-cols-1 gap-12 border-2 border-neutral-100 rounded-xl h-fit p-4 ml-20">
            {/* Newsletter */}
            <div className='space-y-4'>
              <h3 className="text-md font-bold uppercase tracking-widest">Newsletter</h3>
              <span className='text-sm'>📬 Ikuti Newsletter kami dan dapatkan Artikel terbaru lebih awal</span>
              <form name="contact" method="POST" data-netlify="true" onSubmit="submit" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact"></input>
                <div hidden>
                  <input name="bot-field"/>
                </div>
                <input
                  type="email"
                  name="email"
                  class="block w-full rounded-lg bg-neutral-100 border-0 text-sm font-medium"
                  placeholder="Email"
                />
                <div>
                  <button type="submit" className="block w-full bg-primary hover:bg-primary-light text-white text-sm font-medium tracking-widest py-2 px-4 mt-3 rounded-lg">SUBSCRIBE</button>
                </div>
                <div data-netlify-recaptcha="true"></div>
              </form>
            </div>
            

            {/* Latest articles */}
            <div className=''>
              <h3 className="text-md font-bold uppercase tracking-widest">Artikel terbaru</h3>
              <ol style={{ listStyle: `none` }}>
                {posts.map(post => {
                  const title = post.frontmatter.title || post.fields.slug

                  return (
                    <li key={post.fields.slug}>
                      <article
                        className="flex py-2 gap-4"
                        itemScope
                        itemType="http://schema.org/Article"
                      >
                        <img 
                        className="w-12 h-12 mx-auto object-cover rounded-lg"
                        src={post.frontmatter.featuredImage} alt={post.frontmatter.title}></img>
                        <div className="flex-1 items-center">
                          <h3 className="text-neutral-800 text-xs">
                            <Link to={post.fields.slug} itemProp="url">
                              <span itemProp="headline">{title}</span>
                            </Link>
                          </h3>
                          <small className="text-neutral-400 text-xs">{post.frontmatter.date}</small>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ol>
            </div>
            
          </div>
        </div>
        
      </article>
      <nav className="mx-auto py-4 my-8 bg-neutral-200 border-t-2 border-neutral-200">
        <ul
          className="flex flex-wrap justify-between max-w-6xl p-0 mx-auto uppercase font-semibold text-neutral-600 text-sm tracking-widest"
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 5) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage
        }
      }
    }
  }
`
 