# Pakai image Node versi penuh (bukan alpine) supaya watcher fs stabil
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json untuk install deps
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code ke container
COPY . .

# Expose port Next.js default
EXPOSE 3000

# Jalankan Next.js di mode development supaya hot reload jalan
CMD ["npm", "run", "dev"]
