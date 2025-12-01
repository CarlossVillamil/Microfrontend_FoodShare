# ----------------------------------------------------------------
# ETAPA 1: BUILD (Construcción del código de React)
# ----------------------------------------------------------------
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y las dependencias
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copia el código fuente
COPY . .

RUN npm run build 

# ----------------------------------------------------------------
# ETAPA 2: PRODUCTION (Servir los archivos estáticos con Nginx)
# ----------------------------------------------------------------
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# El contenedor expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]