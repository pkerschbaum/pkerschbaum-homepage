/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.DEPLOYMENT_ORIGIN ?? 'http://localhost:3000',
  generateRobotsTxt: true,
};
