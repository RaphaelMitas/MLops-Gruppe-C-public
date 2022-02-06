import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Avatar, Box, CardActionArea, Chip, Grid} from '@mui/material';
import {GatsbyImage} from "gatsby-plugin-image"
import {formatRelative} from "date-fns";
import CircleIcon from '@mui/icons-material/Circle';
import {Link} from "gatsby";

export default function BlogPostCard(props) {
    const { data } = props;
    return (
        <Grid item component={Card} xs={4} sm={4} md={4} sx={{margin: 1}}>

            <CardActionArea component={Link} to={`/blog/${data.slug.current}`} sx={{height: "100%"}}>
                <CardMedia >
                    <GatsbyImage alt={"damn"} image={data.mainImage.asset.gatsbyImageData}/>
                </CardMedia>
                <CardContent sx={{display: "flex", flexDirection: "column", height: 195}}>
                    <Typography gutterBottom variant="h6" component="div">
                        {data.title}
                    </Typography>
                    <Typography gutterBottom sx={{overflow: "hidden"}} variant="body2" color="text.secondary">
                        {data.subtitle}
                    </Typography>
                    <Box  sx={{flexGrow: 1}}/>
                    <Box sx={{ display: 'grid'}} >
                        {!data.categories.isEmpty && data.categories.map(category =>
                            <Chip
                                key={category.title}
                                icon={<CircleIcon sx={{fill: category.color}}/>}
                                variant={"outlined"}
                                label={category.title}
                                sx={{ height: 30 }}
                            />
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, alignItems: "center" }}>
                        <Chip sx={{maxWidth: {xs: 130, sm: 150, md: "max-content"}}}
                            avatar={
                                <Avatar
                                    alt={data.author.name}
                                    src={data.author.image.asset.gatsbyImageData.images.fallback.src}
                                />
                            }
                            label={data.author.name}
                            variant="outlined"

                        />
                        <Typography
                            variant={"body2"}
                            align="right"
                            px={1}
                            sx={{flexGrow: 1}}
                        >
                            { formatRelative(new Date(data.publishedAt), new Date()) }
                        </Typography>

                    </Box>
                </CardContent>
            </CardActionArea>
        </Grid>
    );
}
