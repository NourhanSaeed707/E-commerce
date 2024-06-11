// module.exports = {
//     reactStrictMode: true,
// };
  

// next.config.js
import withPlugins from 'next-compose-plugins';
import withTM from 'next-transpile-modules';

const config = withPlugins([withTM], {
  reactStrictMode: true,
  future: {
    webpack5: true, // Enable Webpack 5 which has better support for ES modules
  },
  // Other Next.js configuration options
});

export default config;

