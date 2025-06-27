FROM node:18-bullseye AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-bullseye

RUN apt-get update && \
    apt-get install -y libssl1.1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
