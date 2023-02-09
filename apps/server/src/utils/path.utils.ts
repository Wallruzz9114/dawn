import findRoot from 'find-root';
import { join } from 'path';

export const getRootPath = () => {
  return findRoot(__dirname);
};

export const rootPath = getRootPath();

export const logPath = join(rootPath, 'logs');

export const publicPath = join(rootPath, 'public');

export const assetsPath = join(rootPath, 'public/assets');

export const staticAssetsPath = join(rootPath, 'public/static');

export const uploadRootPath = join(publicPath, 'static/upload');

export const getUploadPathWithYear = () => {
  return '/static/upload/' + new Date().getFullYear();
};
