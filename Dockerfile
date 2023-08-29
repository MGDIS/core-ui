# use builded image from https://gitlab.mgdis.fr/core/core-ui/playwright-baseimage repo
FROM registre.mgcloud.fr/mgdis/playwright-baseimage:master

# set workdir
WORKDIR /app

# enable pnpm
RUN corepack enable

# copy project files in images
COPY . .

# create needeed packages and files to run playwright: depencencies, commandes, ...
COPY temp/test-package.json package.json
COPY temp/test-packages-mg-components-package.json packages/mg-components/package.json
COPY temp/test-packages-notification-center-package.json packages/notification-center/package.json
COPY temp/test-apps-notification-center-package.json apps/notification-center/package.json
COPY temp/turbo.json turbo.json

# optimize image with cache
RUN --mount=type=cache,target=/cache

# install dependancie
RUN pnpm i

# run all tests in parallel
CMD [ "pnpm", "test:e2e:playwright"]