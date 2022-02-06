const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryResults = await graphql(`
    query AllSanityPost {
  allSanityPost {
    nodes {
      publishedAt
      title
      subtitle
      slug {
        current
      }
      author {
        name
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, aspectRatio: 1)
          }
        }
      }
      markdown
      mainImage {
        asset {
          gatsbyImageData(placeholder: BLURRED, aspectRatio: 2.5)
        }
      }
      categories {
        color
        title
      }
      images {
        asset {
          gatsbyImageData(placeholder: BLURRED)
          originalFilename
        }
      }
    }
  }
}
  `)

  const postTemplate = path.resolve(`src/components/BlogPost.js`)
  queryResults.data.allSanityPost.nodes.forEach(node => {
    createPage({
      path: `/blog/${node.slug.current}`,
      component: postTemplate,
      context: {
        // This time the entire product is passed down as context
        data: node,
      },
    })
  })
}
