/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Article, Wrapper, Button, SectionTitle, Signup } from 'components';
import Img from 'gatsby-image';
import linkedinLogo from '../../static/icons/linkedin.png';
import twitterLogo from '../../static/icons/Twitter_Logo_Blue.svg';
import githubLogo from '../../static/icons/github-seeklogo.com.svg';
import { media } from '../utils/media';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media ${media.tablet} {
    padding: 3rem 2rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`;

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 4rem 2rem;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.grey.dark};
  p {
    font-size: 1.68rem;
    margin-top: -1rem;
    @media ${media.phone} {
      font-size: 1.25rem;
    }
    @media ${media.tablet} {
      font-size: 1.45rem;
    }
  }
`;

const Picture = styled.div`
  grid-column: 2;
  margin-bottom: 20px;
  img {
    @media ${media.phone} {
      padding: 2rem 1.5rem;
    }
  }
  overflow: hidden;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  align-items: center;
`;

const image = ({ fixed }) => (
  <ImageDiv>
    <h1 style={{ padding: `auto` }}>Hi.</h1>
    <Img
      fixed={fixed}
      imgStyle={{
        borderRadius: `50%`,
        marginLeft: `auto`,
        marginRight: `auto`,
      }}
    />
  </ImageDiv>
);

const ButtonsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 60px;
`;

const StyledImage = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 0px;
  margin-right: 0.75rem;
`;

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
    avatar: { childImageSharp: fixed },
  },
}) => (
  <Layout>
    <Wrapper>
      <Hero>
        <Picture>{image(fixed)}</Picture>
        <p>I'm Michael Durfey, a Software Engineer passionate about improving the quality and speed of the web.</p>
        <ButtonsDiv>
          <Link to="/contact">
            <Button big>
              <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z" />
              </svg>
              Contact
            </Button>
          </Link>
          <Link to="/music">
            <Button big>
              <svg
                xmlns="http://purl.org/dc/elements/1.1/"
                version="1.2"
                width="3.782058mm"
                height="7.1205735mm"
                viewBox="0 0 2.1521999 4.0519995"
                id="svg2"
              >
                <path
                  transform="matrix(0.004,0,0,-0.004,1.3162,0.03999969)"
                  d="m 0,0 c 0,-178 203,-292 203,-470 0,-33 -9,-65 -23,-95 18,-37 29,-75 29,-117 0,-63 -16,-125 -42,-183 -5,-8 -12,-12 -19,-12 -13,0 -26,11 -23,27 26,52 42,110 42,168 0,97 -95,191 -167,257 l 0,-75 -16,0 0,500 16,0 z m 153,-517 c 5,15 7,31 7,47 0,96 -91,190 -160,257 0,-118 91,-206 153,-304 z"
                  id="path60"
                />
                <rect
                  transform="translate(1.2512,1.9999997)"
                  x="-0.064999998"
                  y="-2"
                  width="0.13"
                  height="3.3122001"
                  ry="0.039999999"
                  id="rect62"
                />
                <a id="a64" transform="translate(-101.4744,-6.3453003)">
                  <path
                    transform="matrix(0.004,0,0,-0.004,101.4744,9.8453)"
                    d="m 220,138 c 56,0 109,-29 109,-91 0,-72 -56,-121 -103,-149 -36,-21 -76,-36 -117,-36 -56,0 -109,29 -109,91 0,72 56,121 103,149 36,21 76,36 117,36 z"
                    id="path66"
                  />
                </a>
              </svg>
              Music
            </Button>
          </Link>
          <a href="https://www.linkedin.com/in/michael-durfey/" target="__blank" rel="nofollow noopener noreferrer">
            <Button big>
              <StyledImage alt="Linkedin Logo" src={linkedinLogo} />
              LinkedIn
            </Button>
          </a>
          <a href="https://twitter.com/Michaelpietro_" target="__blank" rel="nofollow noopener noreferrer">
            <Button big>
              <StyledImage alt="twitter logo" src={twitterLogo} />
              Twitter
            </Button>
          </a>
          <a href="https://github.com/MichaelDurfey" target="__blank" rel="nofollow noopener noreferrer">
            <Button big>
              <StyledImage alt="Github logo" src={githubLogo} />
              Github
            </Button>
          </a>
        </ButtonsDiv>
      </Hero>
      <Content>
        <SectionTitle>Latest stories</SectionTitle>
        {postEdges.map(post => (
          <Article
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
            category={post.node.frontmatter.category}
            key={post.node.fields.slug}
          />
        ))}
      </Content>
      <Signup />
    </Wrapper>
  </Layout>
);

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
    avatar: PropTypes.shape({
      childImageSharp: PropTypes.shape({ fixed: PropTypes.object.isRequired }),
    }),
  }).isRequired,
};

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
            category
            image
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
    avatar: file(relativePath: { eq: "SlackPhoto.jpg" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
