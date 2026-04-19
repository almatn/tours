FROM node:22-alpine AS build

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# build admin panel
RUN npm run build


# -----------------------
FROM node:22-alpine

RUN apk add --no-cache vips-dev

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app /app

EXPOSE 1337

CMD ["npm", "run", "start"]