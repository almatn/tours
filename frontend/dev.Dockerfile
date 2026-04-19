FROM node:24.13.0-alpine3.22

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]