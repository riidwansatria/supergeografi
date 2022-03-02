import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/templates/layout"
import Seo from "../components/seo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Hero from "../components/organisms/Hero"
import HighlightOSN from "../components/organisms/HighlightOSN"

import socialMedia from '../data/social-media';


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <body className="bg-white">
      <Layout location={location} title={siteTitle}>
      <Seo title = 'Home'/>
        <Hero />

        {/* Recent articles section */}
        <div className="max-w-6xl p-6 mx-auto">
          <div className="flex items-center gap-2">
              <svg width="50" height="4" viewBox="0 0 50 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line y1="2" x2="50" y2="2" stroke="#4565DB" strokeWidth="4"/>
              </svg>
              <p className="col-span-1">supergeografi</p>
          </div>
          <h2 className="font-bold text-5xl">Artikel Terbaru</h2>
        </div>

        <div className="grid grid-cols-3 max-w-6xl mx-auto gap-8">
          {/* Last published article */}
          <div className="bg-neutral-200 p-4 rounded-3xl">
            
          </div>

          {/* Recent articles */}
          <div>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug

                return (
                  <li key={post.fields.slug}>
                    <article
                      className="flex py-4 gap-4"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <img 
                      className="w-20 h-20 mx-auto object-cover rounded-2xl"
                      src={post.frontmatter.featuredImage} alt={post.frontmatter.title}></img>
                      <div className="flex-1 items-center">
                        <h3 className="font-bold text-neutral-800 text-sm">
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-neutral-400">{post.frontmatter.date}</small>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Newsletter */}
          <div className="">
            <h3 className="text-xl font-bold">
            📬 Ikuti Newsletter kami dan dapatkan Artikel terbaru lebih awal
            </h3>
            <form name="contact" method="POST" data-netlify="true" onSubmit="submit" data-netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="contact"></input>
              <div hidden>
                <input name="bot-field"/>
              </div>
              <input
                type="email"
                name="email"
                class="mt-6 block w-full rounded-lg border-neutral-300 shadow-sm"
                placeholder="Email"
              />
              <div>
                <button type="submit" className="block w-full bg-primary hover:bg-primary-light text-white text-sm sm:text-md font-medium tracking-widest py-3 px-4 mt-3 rounded-lg">SUBSCRIBE</button>
              </div>
              <div data-netlify-recaptcha="true"></div>
            </form>

            <ul className="flex space-x-2 py-6">
              {socialMedia.map((s) => (
                <li key={s.label} className=''>
                  <button className="flex bg-neutral-400 hover:bg-neutral-500 text-white text-xl font-bold p-2 items-center justify-center h-12 w-12 rounded-full">
                    <a alt={s.label} href={s.link}>
                      <FontAwesomeIcon icon={s.icon} />
                    </a>
                  </button>
                </li>
              ))}
            </ul>
          </div>


        </div>

        <HighlightOSN />
        
      </Layout>
    </body>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
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
