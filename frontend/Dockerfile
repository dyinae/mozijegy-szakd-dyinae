# ============================================================
# Frontend Dockerfile - Angular 21 build + nginx kiszolgálás
# ============================================================

# 1. szakasz: Angular alkalmazás buildelése Node-on
FROM node:22-alpine AS build
WORKDIR /app

# előbb csak a package fájlok -> kihasználjuk a Docker réteg-cache-t
COPY package*.json ./
RUN npm ci

# a teljes forráskód másolása és production build
COPY . .
RUN npm run build

# 2. szakasz: a kész statikus fájlok kiszolgálása nginx-szel
FROM nginx:alpine

# az alapértelmezett nginx oldal eltávolítása
RUN rm -rf /usr/share/nginx/html/*

# Angular 21 az "application" builderrel a dist/frontend/browser mappába épít
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# saját nginx konfiguráció (SPA routing + /api proxy a backend felé)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
