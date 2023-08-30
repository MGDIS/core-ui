/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFile, readFile, mkdir, stat } = require('fs').promises;
const { join } = require('path');

const SCRIPT_NAME = 'create-test-files';
const ROOT_FOLDER = join(__dirname, '..');
const TEMP_FOLDER = join(ROOT_FOLDER, 'temp');

const packages = [
  {
    path: 'package.json',
    scripts: {
      'apps:notification-center': 'pnpm --filter notification-center dev',
      'test:e2e:playwright': 'turbo test:e2e:playwright',
    },
    dependencies: {
      turbo: null,
    },
  },
  {
    path: 'packages/mg-components/package.json',
    module: 'dist/index.js',
    types: 'dist/types/index.d.ts',
    files: ['dist/', 'loader/'],
    scripts: {
      start: 'stencil build --dev --watch --serve',
      'test:e2e:playwright': 'pnpx @playwright/test test',
    },
    dependencies: {
      '@stencil/core': null,
    },
    devDependencies: {
      '@stencil/sass': null,
    },
  },
  {
    path: 'packages/notification-center/package.json',
    files: ['dist'],
    module: './dist/notification-center.es.js',
    exports: {
      '.': {
        import: './dist/notification-center.es.js',
        require: './dist/notification-center.umd.js',
      },
    },
    types: 'dist/index.d.ts',
    scripts: {
      'test:e2e:playwright': 'pnpx @playwright/test test',
    },
  },
  {
    path: 'apps/notification-center/package.json',
    scripts: {
      dev: 'vite --port 3210',
    },
    dependencies: {
      '@mgdis/mg-components': null,
      '@mgdis/notification-center': null,
    },
    devDependencies: {
      typescript: null,
      vite: null,
    },
  },
];

const turbo = {
  $schema: 'https://turborepo.org/schema.json',
  pipeline: {
    'test:e2e:playwright': {},
  },
};

const createPackages = async package => {
  const projectPackage = JSON.parse(await readFile(join(ROOT_FOLDER, package.path), { encoding: 'utf8' }));
  const createdPackage = { ...package };

  // update package
  delete createdPackage.path;
  createdPackage.name = projectPackage.name;
  for (const key of ['dependencies', 'devDependencies']) {
    if (createdPackage[key]) {
      for (const line of Object.keys(createdPackage[key])) {
        createdPackage[key][line] = projectPackage[key][line];
      }
    }
  }

  // write test package
  await writeFile(join(TEMP_FOLDER, `test-${package.path.split('/').join('-')}`), JSON.stringify(createdPackage));
};

(async () => {
  // create temp dir
  console.log(`[${SCRIPT_NAME}] adding temp folder...`);
  try {
    await stat(TEMP_FOLDER);
  } catch (_) {
    await mkdir(TEMP_FOLDER);
  }

  // create all required package.json
  console.log(`[${SCRIPT_NAME}] adding package.json files...`);
  for (const package of packages) {
    await createPackages(package);
    console.log(`[${SCRIPT_NAME}] '${package.path}' added to your project.`);
  }

  // create turbo.json file
  await writeFile(join(TEMP_FOLDER, 'turbo.json'), JSON.stringify(turbo));
  console.log(`[${SCRIPT_NAME}] 'turbo.json' added to your project.`);
})();
