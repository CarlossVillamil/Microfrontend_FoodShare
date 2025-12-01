# ===== BUILD STAGE =====
FROM node:18-alpine AS build

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir el host con Rspack + Module Federation
RUN npm run build

# ===== RUN STAGE =====
FROM nginx:1.25-alpine

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el build final
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
