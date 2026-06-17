# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build TypeScript files
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
# Default port internal to container
ENV PORT=3333

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled JavaScript files from build stage
COPY --from=build /app/dist ./dist

# Expose port 3333
EXPOSE 3333

CMD ["node", "dist/server.js"]
