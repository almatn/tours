# Creating multi-stage build for production
FROM node:22-alpine AS build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
ENV PATH=/app/node_modules/.bin:$PATH

COPY . .
RUN npm run build

# Creating final production image
FROM node:22-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./
ENV PATH=/app/node_modules/.bin:$PATH

EXPOSE 1337
CMD ["npm", "run", "start"]