import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

const Tags = ({ pageContext, data, location }) => {
    const { tag } = pageContext
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const posts = data.allMarkdownRemark.nodes

    return (
    <Layout location={location} title={siteTitle}>
        <Seo title = {tag}/>

        {/* Tag header */}
        <header className="bg-neutral-200 rounded-2xl items-center mb-16">
            <div className='max-w-6xl p-8 mx-auto'>
                <h1 className="text-3xl text-neutral-700 font-semibold py-4">{tag}</h1>
            </div>
        </header>

        <main className="grid grid-cols-6 gap-8 max-w-6xl mx-auto">
            {/* Articles list */}
            <div className="col-span-4">
                <ol style={{ listStyle: `none` }}>
                {posts.map(post => {
                    const title = post.frontmatter.title || post.fields.slug

                    return (
                    <li key={post.fields.slug}>
                        <article
                        className="py-4 gap-4"
                        itemScope
                        itemType="http://schema.org/Article"
                        >
                        <div className="grid grid-cols-5 gap-4">
                            <img 
                            className="col-span-2 w-full h-48 mx-auto object-cover rounded-2xl"
                            src={post.frontmatter.featuredImage} alt={post.frontmatter.title}></img>
                            <div className="col-span-3 items-center p-4">
                                <h3 className="font-bold text-neutral-700 text-2xl">
                                <Link to={post.fields.slug} itemProp="url">
                                    <span itemProp="headline">{title}</span>
                                </Link>
                                </h3>
                                <small className="text-primary">{post.frontmatter.date}</small>
                                <p
                                dangerouslySetInnerHTML={{
                                    __html: post.frontmatter.description || post.excerpt,
                                }}
                                itemProp="description" 
                                className="text-sm text-neutral-400"
                                />
                            </div>
                        </div>
                        </article>
                    </li>
                    )
                })}
                </ol>
            </div>
            
            
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
        </main>

        
    </Layout>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    site {
        siteMetadata {
          title
        }
      }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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