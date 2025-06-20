# Gunakan Node.js versi penuh agar mendukung file watcher dan dependensi native
FROM node:22

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json terlebih dahulu untuk caching instalasi
COPY package*.json ./

# Install semua dependensi
RUN npm install

# Salin semua file project (termasuk prisma/schema.prisma)
COPY . .

# Jalankan Prisma generate (untuk membangun @prisma/client)
RUN npx prisma generate

# Buka port default Next.js
EXPOSE 3000

# Jalankan server dalam mode development agar hot reload aktif
CMD ["npm", "run", "dev"]
