FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_DIR=/app/storage

COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/data ./data

RUN mkdir -p /app/storage

EXPOSE 3000

CMD ["node", "server/index.js"]
