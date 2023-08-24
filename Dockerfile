# use builded image from https://gitlab.mgdis.fr/core/core-ui/playwright-baseimage repo
FROM registre.mgcloud.fr/mgdis/playwright-baseimage:master

# set workdir
WORKDIR /app

# enable pnpm
RUN corepack enable

# copy project files in images
COPY . .

# create package.json for project and packages wich use playwright for requirements: depencencies, commandes, ...
COPY package.test.json package.json
COPY packages/mg-components/package.test.json packages/mg-components/package.json
COPY apps/notification-center/package.test.json apps/notification-center/package.json

# optimize image with cache
RUN --mount=type=cache,target=/cache

# install dependancie
RUN pnpm i

# run all tests in parallel
CMD [ "pnpm", "test:e2e:playwright"]