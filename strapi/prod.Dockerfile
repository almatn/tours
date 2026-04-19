# Creating multi-stage build for production
FROM node:22-alpine AS build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production


FROM node:22-alpine

RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=build /app ./

RUN chown -R node:node /app
USER node

EXPOSE 1337
CMD ["npm", "run", "start"]