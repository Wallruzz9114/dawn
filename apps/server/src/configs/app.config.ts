const smtpConfig = {
  isEnableSmtp: false,
  smtpHost: 'smtp.163.com',
  smtpSecure: true,
  smtpPort: 465,
  smtpAuthUser: '',
  smtpAuthpass: '',
};

export type SmtpConfig = typeof smtpConfig;

export const defaultConfig = {
  siteTitle: 'Dawn - your online journal',
  siteMetaKeyWords: 'Dawn, blog, website, articles, online journal',
  siteMetaDescription:
    'This is a place to write your daily journal/articles and share them with the community. Engage and spread knowlege in total privacy',
  siteLogo: '/assets/images/logo.svg',
  github: 'https://github.com/bs32g1038',
  projectGithub: 'https://github.com/bs32g1038/node-blog',
  siteDomain:
    process.env.NODE_ENV === 'production'
      ? 'prod.website'
      : 'http://127.0.0.1:3000',
  ...smtpConfig,
};

export type AppConfig = typeof defaultConfig;
