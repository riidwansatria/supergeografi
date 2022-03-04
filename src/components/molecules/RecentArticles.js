import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const RecentArticles = () => {
    return (
        <StaticQuery
            query={graphql`
                query HeadingQuery {
                    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 1) {
                        nodes {
                          excerpt
                          fields {
                            slug
                          }
                          frontmatter {
                            date(formatString: "MMMM DD, YYYY")
                            title
                            description
                          }
                        }
                      }
                }
            `}
            render={data => (
                <div className="">
                    <header>
                        <h3 className="text-gray-8 md:text-2xl text-xl">
                            <Link to={data.allMarkdownRemark.nodes.fields.slug} itemProp="url">
                                <span itemProp="headline">{data.allMarkdownRemark.nodes.frontmatter.title}</span>
                            </Link>
                        </h3>
                        <small>{data.allMarkdownRemark.nodes.frontmatter.date}</small>
                    </header>
                    <section className="pb-8">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: data.allMarkdownRemark.nodes.frontmatter.description || data.allMarkdownRemark.nodes.excerpt,
                            }}
                            itemProp="description" />
                    </section>
                </div>
            )} />
    )
}

export default RecentArticles