const path = require('path');
const _ = require('lodash');
const axios = require('axios');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const apiKey = process.env.API_KEY
  const tracks = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=almostcrimes_&api_key=${apiKey}&format=json`);
  const albums = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=almostcrimes_&period=1month&api_key=${apiKey}&format=json`);

  createPage({
    path: '/music',
    component: require.resolve("./src/templates/music.js"),
    context: { tracks: tracks.data,  albums: albums.data }
  });

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.js');
    const categoryPage = path.resolve('src/templates/category.js');
    resolve(
      graphql(`
        {
          posts: allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  category
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.posts.edges;

        posts.forEach((edge, index) => {
          const next = index === 0 ? null : posts[index - 1].node;
          const prev = index === posts.length - 1 ? null : posts[index + 1].node;

          createPage({
            path: edge.node.fields.slug,
            component: postPage,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next,
            },
          });
        });

        let categories = [];

        _.each(posts, edge => {
          if (_.get(edge, 'node.frontmatter.category')) {
            categories = categories.concat(edge.node.frontmatter.category);
          }
        });

        categories = _.uniq(categories);

        categories.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}`,
            component: categoryPage,
            context: {
              category,
            },
          });
        });
      })
    );
  }).catch(err => console.log(err));
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
