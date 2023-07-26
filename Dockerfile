FROM mcr.microsoft.com/playwright:v1.34.3-focal AS base
WORKDIR /app
RUN corepack enable
COPY . .
EXPOSE 9323
CMD [ "pnpm", "test:e2e:playwright" ]