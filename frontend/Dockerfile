FROM node:20-slim

WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]
