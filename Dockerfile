FROM registre.mgcloud.fr/mgdis-interne/node:18-build AS base-builder
FROM mcr.microsoft.com/playwright:v1.34.3-focal AS base

# create builded image workspace
FROM base-builder AS workspace
WORKDIR /app
COPY . .
# install dependencies
RUN apt update -y && apt -y install jq
RUN corepack enable
RUN pnpm install
RUN pnpm run build

# create and launch playwright test runnner
FROM base AS testrunner
# set pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# copy project in playright image runner
COPY --from=workspace /app /app
WORKDIR /app/packages/mg-components
EXPOSE 8000
CMD [ "pnpm", "--package=@pnpm/@playwright/test", "dlx", "playwright", "test" ]