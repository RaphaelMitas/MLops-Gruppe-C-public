import React, {useContext} from "react";
import {darkModeContext} from "./UI/ThemeHandler";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {formatRelative} from 'date-fns'


import {
    darcula as CodeStyleDark,
    materialLight as CodeStyleLight
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {Avatar, Box, Grid, Link, Typography} from "@mui/material";
import Layout from "./UI/Layout";
import Markdown from "markdown-to-jsx";
import {GatsbyImage} from "gatsby-plugin-image";
import {styled} from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";




const BlogPost = ({ pageContext }) => {
    const { data } = pageContext

    const StyledTypography = styled(Typography)({
        wordWrap: "break-word"
    });


    const CodeBlock = ({className, children}) => {
        const { darkMode } = useContext(darkModeContext)
        let lang = 'text'; // default monospaced text
        if (className && className.startsWith('lang-')) {
            lang = className.replace('lang-', '');
        }
        return (
            <div>
                {darkMode ?
                    <SyntaxHighlighter language={lang} style={CodeStyleDark}>
                        {children}
                    </SyntaxHighlighter>
                    :
                    <SyntaxHighlighter language={lang} style={CodeStyleLight}>
                        {children}
                    </SyntaxHighlighter>
                }
            </div>
        );
    }

    const PreBlock = ({children, ...rest}) => {
        if ('type' in children && children['type'] === 'code') {
            return CodeBlock(children['props']);
        }
        return <pre {...rest}>{children}</pre>;
    };

    function MarkdownListItem(props) {
        return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />;
    }

    function inlineImage(props){
        if(!props.src.startsWith("http")){
            let asset = data.images.find(element => element.asset.originalFilename === props.src)
            if (asset){
                asset = asset.asset
            }
            return <GatsbyImage alt={props.alt} image={asset ? asset.gatsbyImageData : ""}/>
        }
        else {
            return <img alt={props.alt} src={props.src}/>
        }
    }

    const markdownOptions = {
        overrides: {
            pre: PreBlock,
            h1: {
                component: StyledTypography,
                props: {
                    gutterBottom: true,
                    variant: 'h2',
                    component: 'h1',
                },
            },
            h2: {
                component: StyledTypography,
                props: { gutterBottom: true, variant: 'h4', component: 'h2' },
            },
            h3: {
                component: StyledTypography,
                props: { gutterBottom: true, variant: 'subtitle1' },
            },
            h4: {
                component: StyledTypography,
                props: {
                    gutterBottom: true,
                    variant: 'caption',
                    paragraph: true,
                },
            },
            p: {
                component: StyledTypography,
                props: { paragraph: true },
            },
            a: { component: Link },
            img: {
                component: inlineImage,
            },


            li: {
                component: MarkdownListItem,
            },
        },
    };

    return (
        <Layout>
            <Grid container justifyContent="center" columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                <Grid item xs={4} sm={8} md={10} lg={8} p={0}>
                    <GatsbyImage alt="main Image" image={data.mainImage.asset.gatsbyImageData}/>
                </Grid>
                <Grid item xs={4} sm={8} md={8} lg={6} p={3}>

                    <StyledTypography variant="h2">{data.title}</StyledTypography>

                    {!data.categories.isEmpty && data.categories.map( category =>
                        <Typography paragraph={false} sx={{ display: 'flex', flexGrow: 1, mt: 2 }}>
                            <CircleIcon sx={{fill: category.color}}/> &nbsp;&nbsp; {category.title}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center", py: 1, pb: 3 }}>
                        <Avatar
                            alt={data.author.name}
                            src={data.author.image.asset.gatsbyImageData.images.fallback.src}
                        />
                        <Typography sx={{flexGrow: 1}} px={1}>{data.author.name}</Typography>
                        <Typography
                            align="right"
                            px={1}
                        >
                            { formatRelative(new Date(data.publishedAt), new Date()) }
                        </Typography>

                    </Box>

                    <Markdown
                        options={markdownOptions}
                    >
                        {data.markdown}
                    </Markdown>
                </Grid>

            </Grid>
        </Layout>

    )
}

export default BlogPost
