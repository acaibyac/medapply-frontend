# ---------- deps ----------
FROM node:20-alpine AS deps
WORKDIR /app
# Copiem fișierele necesare pentru instalare
COPY package.json package-lock.json* pnpm-lock.yaml* ./
# Instalăm dependențele (folosim cache npm)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps || npm i --legacy-peer-deps

# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Cream folderul public (dacă nu există)
RUN mkdir -p public

# Build Next.js (generează .next/standalone și .next/static)
RUN npm run build

# ---------- run ----------
FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiem doar fișierele necesare pentru rulare
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Expunem portul
EXPOSE 3000

# Pornim aplicația Next.js standalone
CMD ["node", "server.js"]
