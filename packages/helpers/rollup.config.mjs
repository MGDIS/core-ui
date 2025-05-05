import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import fs from 'fs/promises';

const NAME = 'CoreUiHelpers';
const FOLDER = {
  input: 'src',
  output: 'dist',
};

const getFilePath = (folder, path, filname) => [folder, path, filname].join('/');

export default async () => {
  const folders = await fs.readdir(FOLDER.input, { withFileTypes: true });
  return folders
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .flatMap(folder => {
      const input = getFilePath(FOLDER.input, folder, 'index.ts');

      return [
        {
          input,
          // ES module
          output: {
            file: getFilePath(FOLDER.output, folder, 'index.js'),
            format: 'es',
            sourcemap: true,
          },
          plugins: [typescript()],
        },
        {
          input,
          // CommonJS
          output: {
            file: getFilePath(FOLDER.output, folder, 'index.cjs'),
            format: 'cjs',
            sourcemap: true,
          },
          plugins: [typescript(), nodeResolve(), commonjs()],
        },
        {
          input,
          // UMD
          output: {
            file: getFilePath(FOLDER.output, folder, 'index.umd.js'),
            format: 'umd',
            sourcemap: true,
            name: `${NAME}.${folder}`,
          },
          plugins: [typescript(), nodeResolve(), commonjs()],
        },
        {
          input,
          // types
          output: {
            file: getFilePath(FOLDER.output, folder, 'types.d.ts'),
            format: 'es',
          },
          plugins: [dts()],
        },
      ];
    });
};
