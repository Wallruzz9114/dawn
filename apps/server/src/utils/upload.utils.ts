import fs from 'fs';
import { join } from 'path';
import util from 'util';
import { getUploadPathWithYear, publicPath } from './path.utils';

const writeFile = util.promisify(fs.writeFile);

/**
 * Upload a file
 * @param fileName the file name
 * @param fileBuffer the buffer
 * @returns the file url
 */
export const creteUploadFile = async (
  fileName: string,
  fileBuffer: Buffer
): Promise<string> => {
  const _uploadPath = getUploadPathWithYear();
  const basePath = join(publicPath, _uploadPath);
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }
  await writeFile(basePath + '/' + fileName, fileBuffer);
  const url = _uploadPath + '/' + fileName;
  return url;
};
