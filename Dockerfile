FROM registre.mgcloud.fr/mgdis/playwright-baseimage:master
WORKDIR /app
RUN corepack enable
COPY . .
COPY packages/mg-components/package.test.json packages/mg-components/package.json
WORKDIR /app/packages/mg-components
RUN --mount=type=cache,target=/cache
RUN pnpm i
CMD [ "pnpx", "@playwright/test", "test"]