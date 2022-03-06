import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

const Categories = ({ pageContext, data, location }) => {
    const { category } = pageContext
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const categoryPosts = data.categoryArticles.nodes
    const recentPosts = data.recentArticles.nodes

    return (
    <Layout location={location} title={siteTitle}>
        <Seo title = {category}/>

        {/* Tag header */}
        <header className="bg-gray-2 rounded-2xl items-center mb-16">
            <div className='max-w-6xl p-8 mx-auto'>
                <h1 className="text-3xl text-gray-7 font-semibold py-4">{category}</h1>
            </div>
        </header>

        <main className="grid grid-cols-6 gap-8 max-w-6xl mx-auto">
            {/* Articles list */}
            <div className="col-span-4">
                <ol style={{ listStyle: `none` }}>
                {categoryPosts.map(post => {
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
                                <h3 className="font-bold text-gray-7 text-2xl">
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
                                className="text-sm text-gray-4"
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
            <div className="col-span-2 grid grid-cols-1 gap-12 border-2 border-gray-1 rounded-xl h-fit p-4 ml-20">
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
                    className="block w-full rounded-lg bg-gray-1 border-0 text-sm font-medium"
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
                    {recentPosts.map(post => {
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
                            <h3 className="text-gray-8 text-xs">
                                <Link to={post.fields.slug} itemProp="url">
                                <span itemProp="headline">{title}</span>
                                </Link>
                            </h3>
                            <small className="text-gray-4 text-xs">{post.frontmatter.date}</small>
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
Categories.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
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
export default Categories
export const pageQuery = graphql`
  query($category: String) {
    site {
        siteMetadata {
          title
        }
      }
    categoryArticles: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
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
    recentArticles: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 5) {
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