# Get baseimage version
ARG baseimage=master

# use builded image from https://gitlab.mgdis.fr/core/core-ui/playwright-baseimage repo
FROM registre.mgcloud.fr/mgdis/playwright-baseimage:${baseimage}

# Get Args
ARG args
ENV ARGS="${args}"

# set workdir
WORKDIR /app

# copy project files in images
COPY . .

# Import modified package.json
RUN cp -r temp/* .
RUN rm -rf temp/ 

# optimize image with cache
RUN --mount=type=cache,target=/cache

# install dependancies
RUN pnpm i ${ARGS}

# run all tests in parallel
CMD pnpm test:e2e ${ARGS}