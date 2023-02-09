export const environment = process.env.NODE_ENV;
export const isDevMode = Object.is(environment, 'development');
export const isProdMode = Object.is(environment, 'production');
export const isTestMode = Object.is(environment, 'test');

export const APP_SERVER = {
  hostname: 'localhost',
  port: '8080',
  environment,
};

export const MONGODB = {
  uri: isDevMode
    ? 'mongodb://localhost:27017/dawn_dev'
    : isTestMode
    ? 'mongodb://localhost:27017/dawn_test'
    : process.env.MONGODB_URL ||
      `mongodb://${process.env.MONGODB_HOSTNAME || 'localhost'}:${
        process.env.MONGODB_PORT || '27017'
      }/dawn`,
  username: process.env.MONGODB_USERNAME || '',
  password: process.env.MONGODB_PASSWORD || '',
};

export const TOKEN_SECRET_KEY =
  process.env.TOKEN_SECRET_KEY ?? 'NODEBLOG/bs32g1038@163.com/TOKEN';

export const ADMIN_USER_INFO = {
  nickName: 'jpinto3',
  email: 'jpinto19943@gmail.com',
  location: 'Edmonton, AB',
};

export const RSS = {
  title: 'A blog idea for our random thoughts',
  link: 'prod.website',
  language: 'en-US',
  description: 'Dawn - your online journal',
  maxRssItems: 50,
};

export const API_COMMENT_POST_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000,
  max: 30,
};

export const API_REQUEST_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000,
  max: 5000,
};
