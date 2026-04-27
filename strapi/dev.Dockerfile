FROM node:22-alpine

# Install dependencies needed for Strapi + sharp (images)
RUN apk add --no-cache \
  build-base \
  gcc \
  autoconf \
  automake \
  zlib-dev \
  libpng-dev \
  vips-dev \
  git

WORKDIR /app

# Install deps (including devDeps)
COPY package.json package-lock.json ./
RUN npm install

# Copy app
COPY . .

ENV NODE_ENV=development

EXPOSE 1337

# 👇 Dev mode with hot reload
CMD ["npm", "run", "develop"]