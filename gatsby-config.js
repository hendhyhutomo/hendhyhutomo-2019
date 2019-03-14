module.exports = {
    siteMetadata: {
        title: `Coming Soon | Hendhy Hutomo `,
        siteUrl: `https://hendhyhutomo.com`,
    },
    plugins: [{
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/assets`,
                name: 'assets',
            },
        }, {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Hendhy Hutomo",
                short_name: "hendhyhutomo",
                start_url: "/",
                background_color: "#000000",
                theme_color: "#000000",
                display: "standalone",
                icon: "src/images/icon/icon.png",
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify-cache`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        // `gatsby-plugin-netlify-cms`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-layout`,
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-69513343-8",
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-static-images`,
                    `gatsby-remark-unwrap-images`,
                    `gatsby-remark-relative-images`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1280,
                            backgroundColor: 'transparent', // required to display blurred image first
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-netlify`,
            options: {
                generateMatchPathRewrites: false, // boolean to turn off automatic creation of redirect rules for client only paths
            },
        },
    ],
}
