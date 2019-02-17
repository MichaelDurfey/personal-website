module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: "Michael Durfey's Blog", // Navigation and Site Title
  siteTitleAlt: 'Michael Durfey', // Alternative Site title for SEO
  siteUrl: 'https://www.michaeldurfey.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/social/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Minimal Blog with big typography', // Your site description
  author: 'Michael Durfey', // Author for schemaORGJSONLD
  picture: '/social/SlackPhoto.png',
  siteLogo: '/social/logo.png', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@michael_pietro', // Twitter Username - Optional
  ogSiteName: 'https://www.facebook.com/michael.pietro', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.js
  headerFontFamily: 'Bitter',
  bodyFontFamily: 'Open Sans',
  baseFontSize: '18px',
};
