import React, {useState} from "react";
import Layout from "../components/UI/Layout";
import {Box, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {graphql} from "gatsby";
import BlogPostCard from "../components/BlogPostCard";
import CircleIcon from "@mui/icons-material/Circle";

export const query = graphql`
  {
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
          gatsbyImageData(placeholder: BLURRED, aspectRatio: 3)
        }
      }
      categories {
        color
        title
      }
    }
  }
}
  `

const BlogPage = (props) => {
    const { data } = props;
    const posts = (data || {}).allSanityPost;

    function getAllCategories (){
        let categories = []
        posts.nodes.forEach( node => !node.categories.isEmpty && node.categories.forEach(
            category =>
                categories.find( element => category.title === element.title) === undefined && categories.push(category)
        ))

        categories = categories.sort( (a, b) => a.title > b.title ? 1 : -1 )

        return categories
    }

    const categories = getAllCategories();

    const [selectedCategory, setCategory] = useState(0);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };


    return (
        <Layout>
            <Grid
                justifyContent="center"
                container
                columns={{ xs: 4, sm: 8, md: 13 }}
            >
                <Grid item xs={4} sm={8} sx={{
                    mt: 2,
                    mb: 1,
                    mx: {xs: 1, sm: 1, md: 2}
                }}>
                <FormControl fullWidth>
                    <InputLabel> Category </InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value={0}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                     <CircleIcon sx={{fill: "primary"}}/> &nbsp;&nbsp; All Categories
                                </Box>
                        </MenuItem>
                        {categories.map( category =>
                            <MenuItem key={category.title} value={category.title}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                     <CircleIcon sx={{fill: category.color}}/> &nbsp;&nbsp; {category.title}
                                </Box>
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                </Grid>
                {posts.nodes.filter(node => node.categories.find( category =>
                    selectedCategory === 0 || category.title === selectedCategory
                )).sort((node, nodeAfter) => new Date(nodeAfter.publishedAt) - new Date(node.publishedAt)).map((node) =>
                    <BlogPostCard key={node.title} data={node} />
                )}
            </Grid>
        </Layout>
    )
}

export default BlogPage
