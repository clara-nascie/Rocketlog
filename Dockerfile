# Base Stage
FROM node:20-alpine AS base

RUN apk add --no-cache openssl

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

RUN npx prisma generate
RUN npm run build

# Production Runner Stage
FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3333

RUN npm ci --omit=dev

COPY prisma ./prisma
COPY --from=build /app/build ./build
COPY --from=build /app/src/generated ./build/generated

EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy && node build/server.js"]