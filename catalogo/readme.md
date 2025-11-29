# Catálogo Microfrontend - FoodShare

Este proyecto forma parte de la arquitectura de microfrontends **FoodShare**, y corresponde al módulo **Catálogo**, encargado de mostrar los productos disponibles.

## Tecnologías utilizadas

* React
* Webpack Module Federation
* Tailwind CSS

## Funcionalidad

* Muestra una lista de alimentos con nombre, precio e imagen.
* Permite agregar productos mediante un evento global `foodshare:add`.
* Se puede integrar de forma independiente en el Host.

## Ejecución

Instalar dependencias:

```bash
npm install
```

Ejecutar localmente:

```bash
npm start
```

El proyecto estará disponible en:

```
http://localhost:3001/
```

## Exposición del Microfrontend

Este módulo expone el componente `FoodList` mediante Module Federation:

Ruta de exposición:

```
./FoodList
```

Archivo configurado:

```
module-federation.config.ts
```

## Comunicación con otros microfrontends

Este módulo envía eventos al carrito mediante:

```
window.dispatchEvent(new CustomEvent("foodshare:add", { detail: food }))
```

## Estructura base del proyecto

```
catalogo/
 ├─ src/
 │   ├─ components/
 │   │   ├─ FoodCard.jsx
 │   │   └─ FoodList.jsx
 │   ├─ foods.js
 │   ├─ App.jsx
 │   └─ index.js
 ├─ module-federation.config.ts
 ├─ package.json
```

