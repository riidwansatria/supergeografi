import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

export default function LatestPost() {
    const data = useStaticQuery(graphql`
        query LatestPostQuery {
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
            site {
                siteMetadata {
                  siteUrl
                }
            }
        }
    `)
    return (
        <div className="">
            <header>
                <h3 className="text-neutral-800 md:text-2xl text-xl">
                    <Link to="/blog" itemProp="url">
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
    )
}