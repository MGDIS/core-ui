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
          output: [
            // ES module
            {
              file: getFilePath(FOLDER.output, folder, 'index.js'),
              format: 'es',
              sourcemap: true,
            },
            // CommonJS
            {
              file: getFilePath(FOLDER.output, folder, 'index.cjs'),
              format: 'cjs',
              sourcemap: true,
            },
            // UMD
            {
              file: getFilePath(FOLDER.output, folder, 'index.umd.js'),
              format: 'umd',
              sourcemap: true,
              name: `${NAME}.${folder}`,
            },
          ],
          plugins: [nodeResolve(), commonjs(), typescript()],
          external: ['@playwright/test', 'vue', 'vue-template-compiler'],
        },
        {
          input,
          // types
          output: {
            file: getFilePath(FOLDER.output, folder, 'index.d.ts'),
            format: 'es',
          },
          plugins: [dts()],
        },
      ];
    });
};
