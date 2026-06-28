# ============================================================
# Backend Dockerfile - Node.js + Express
# ============================================================

# 1. szakasz: függőségek telepítése külön rétegben (gyorsabb újrabuild)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# 2. szakasz: futtató image
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

# a már telepített függőségeket vesszük át az előző szakaszból
COPY --from=deps /app/node_modules ./node_modules
# a forráskód másolása (a .dockerignore kizárja a feleslegeset)
COPY . .

# a szerver a 3000-es porton figyel (app.js: process.env.PORT || 3000)
EXPOSE 3000

CMD ["node", "app.js"]
