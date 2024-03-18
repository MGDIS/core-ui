import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const setEsModule = ({ path }) => ({
  input: ['src', path, 'index.ts'].join('/'),
  output: {
    file: ['dist', path, 'index.js'].join('/'),
    format: 'es',
    sourcemap: true,
  },
  plugins: [typescript()],
});

const setCommonJs = ({ path }) => ({
  input: ['src', path, 'index.ts'].join('/'),
  output: {
    file: ['dist', path, 'index.cjs'].join('/'),
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [typescript(), nodeResolve(), commonjs()],
});

const setUMD = ({ path }) => ({
  input: ['src', path, 'index.ts'].join('/'),
  output: {
    file: ['dist', path, 'index.umd.js'].join('/'),
    format: 'umd',
    name: `MgComponentsHelpers.${path}`,
    sourcemap: true,
  },
  plugins: [typescript(), nodeResolve(), commonjs()],
});

const setTypes = ({ path }) => ({
  input: ['src', path, 'index.ts'].join('/'),
  output: {
    file: ['dist', path, 'types.d.ts'].join('/'),
    format: 'es',
  },
  plugins: [dts()],
});

export default ['angular', 'vue'].flatMap(path => [setEsModule({ path }), setCommonJs({ path }), setUMD({ path }), setTypes({ path })]);
