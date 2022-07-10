/** @type {import('next-sitemap').IConfig} */
module.exports = {
  generateRobotsTxt: true,
  siteUrl: process.env.DEPLOYMENT_ORIGIN ?? 'http://localhost:3000',
  sourceDir: 'dist',
};
