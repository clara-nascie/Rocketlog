# Base Stage
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

# Development Stage
FROM base AS development

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

# Build Stage
FROM base AS build

RUN npm ci

COPY . .

RUN npm run build

# Production Runner Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3333

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build

EXPOSE 3333

CMD ["node", "build/server.js"]
