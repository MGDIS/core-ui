import { Config } from 'svgo';

export const svgoConfig: Config = {
  multipass: true,
  js2svg: {
    pretty: true,
  },
  plugins: ['preset-default', 'removeTitle', 'removeDimensions'],
};
