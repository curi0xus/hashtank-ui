import fs from 'fs/promises';
import path from 'path';

// Directory to save files temporarily
const pathDist: string = path.join(process.cwd(), '/tmp');

export const clearTmpFolder = async () => {
  try {
    const files = await fs.readdir(pathDist);
    await Promise.all(files.map(file => fs.unlink(path.join(pathDist, file))));
    console.log('Temporary folder cleared');
  } catch (error) {
    console.error('Error clearing temporary folder:', error);
  }
};