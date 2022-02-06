module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Spotify Concerts",
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "YOUR_ID",
        dataset: "production",
      },
    },

    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-material-ui",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
