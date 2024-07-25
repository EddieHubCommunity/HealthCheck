ARG NODE_VERSION=22
FROM node:${NODE_VERSION} AS builder
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci  --omit=dev --ignore-scripts

COPY . .

RUN npx prisma generate
RUN npm run build

# Production image
FROM node:${NODE_VERSION} AS production
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD npm run start
