import { Config } from 'svgo';

export const svgoConfig: Config = {
  multipass: true,
  js2svg: {
    pretty: true,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: 'removeDimensions',
    },
  ],
};
