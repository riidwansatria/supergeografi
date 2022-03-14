require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Supergeografi`,
    author: {
      name: `Ridwan Satria`,
      summary: `Global Engineering student at Kyoto University 京都大学.`,
    },
    description: `Telusuri lebih jauh tentang manusia, lingkungannya, dan bumi yang kita pijak beserta bentang alamnya bersama Supergeografi!`,
    siteUrl: `https://supergeografi.com/`,
    image: `//images.ctfassets.net/1qxcg8ht0ty0/71lB8h7EUlmHHJJSwhqBy9/0e5c4831eb7f541bc4e1d1bbce2ee58c/supergeografi-header.png`,
    social: {
      twitter: `@Supergeografi`,
    },
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 720,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries")
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-E58R8N5VKF", // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Supergeografi`,
        short_name: `Supergeografi`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/icon-circle-white.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['DM Sans', 'DM Serif Text', 'Open Sans']
        }
      }
    },
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-sitemap`,
    "gatsby-plugin-slug",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `1qxcg8ht0ty0`,
        accessToken: `bdeL5bC660z9_iTx84BVQJHZpodHBKKP40TlOheyfLc`,
      },
    },
  ],
}
