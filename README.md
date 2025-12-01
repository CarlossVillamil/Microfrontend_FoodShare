# 🚀 FoodShare Microfrontends: Despliegue de Arquitectura Distribuida con K8s

## ✨ 1. Resumen Ejecutivo

Este proyecto es una **demostración práctica y académica** de la arquitectura de **Microfrontends (MFEs)**. Su objetivo principal es ilustrar los beneficios, desafíos, y la implementación en un entorno moderno que utiliza **Webpack Module Federation** para la composición en *runtime* y **Kubernetes (K8s)** para el despliegue distribuido y la orquestación.

La aplicación FoodShare divide la interfaz web en múltiples módulos independientes (`Host`, `Catálogo`, `Carrito` y `Pagos`), cada uno con su propio ciclo de vida, *build* y despliegue.

| Metodología | Orquestación | Despliegue | Servidor Estático |
| :--- | :--- | :--- | :--- |
| **Microfrontends** | Webpack Module Federation | Kubernetes (K8s) | Nginx |

-----

## 🏗️ 2. Arquitectura de Microfrontends

La arquitectura se basa en la división por dominios de negocio, donde cada MFE es una aplicación React independiente.

### 2.1. Componentes Modulares

| Módulo | Función Principal | Rol | Tecnologías |
| :--- | :--- | :--- | :--- |
| **Host / Container** | Orquestador principal. Define el *layout* y consume todos los remotos. | **Shell** | React, Module Federation |
| **Catálogo** | Listado de productos (`FoodList`) y vista principal de navegación. | **Remote MFE** | React, Module Federation |
| **Carrito** | Componente de MiniCart y flujo de gestión de órdenes. | **Remote MFE** | React, Module Federation |
| **Payment** | Módulo de *checkout* y procesamiento de pagos. | **Remote MFE** | React, Module Federation |

### 2.2. Tecnologías Clave

| Categoría | Herramienta | Motivo de Elección |
| :--- | :--- | :--- |
| **Composición** | **Webpack 5 + Module Federation** | Permite compartir dependencias (React, Zustand) sin necesidad de NPM, evitando la duplicación de código y facilitando *deploys* independientes. |
| **Contenerización** | **Docker** | Encapsula cada MFE con su propio servidor estático (Nginx), garantizando la inmutabilidad y portabilidad. |
| **Orquestación** | **Kubernetes (K8s)** | Simula un entorno de producción, gestionando la alta disponibilidad (réplicas) y el descubrimiento de servicios. |
| **Framework** | **React 18** | Utilizado consistentemente en todos los microfrontends. |

-----

## 💻 3. Despliegue en Kubernetes (K8s)

Los siguientes pasos asumen que las imágenes Docker (`torvald29/[mfe]:latest`) ya están publicadas en Docker Hub y que tu clúster K8s local (Docker Desktop o Minikube) está activo.

### 3.1. Requisitos y Configuración Inicial

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://aws.amazon.com/es/what-is/repo/
    cd Microfrontend_FoodShare
    ```
2.  **Configurar DNS Local (`hosts`):** Para que el Ingress funcione, mapea el dominio local a la IP de tu host.
      * Abre tu archivo `hosts` con permisos de administrador y añade:
    <!-- end list -->
    ```text
    127.0.0.1    foodshare.com
    ```

### 3.2. Instalación del Ingress Controller

Asegúrate de que el Nginx Ingress Controller esté instalado en tu clúster:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

### 3.3. Aplicación de Manifiestos

Aplica todos los archivos YAML que definen los Deployments, Services y la configuración de Ingress.

```bash
# Aplica Deployments, Services y Ingress.
# (Asegúrate de ejecutar esto desde donde estén tus archivos YAML)
kubectl apply -f .
```

### 3.4. Verificación y Acceso

1.  **Verificar Pods:** Confirma que todos los módulos estén en estado `Running`.

    ```bash
    kubectl get pods
    kubectl get deployments
    ```

2.  **Acceso a la Aplicación:** La aplicación principal estará disponible en:

    [http://foodshare.com/](http://foodshare.com/)

-----

## 🔧 4. Solución de Problemas (Troubleshooting)

Si el sitio no carga o si obtienes errores de conexión, sigue estas indicaciones:

### 4.1. `ERR_CONNECTION_REFUSED` o Fallo de Red

Este error indica que el *bridge* de red a tu clúster está inactivo:

  * **Si usas Docker Desktop:** Reinicia el componente de Kubernetes desde la configuración de Docker Desktop. Si no funciona, reinicia la aplicación Docker Desktop.
  * **Si usas Minikube:** Debes mantener un túnel de red activo en una terminal separada:
    ```bash
    minikube tunnel
    ```

### 4.2. Fallo de Carga de Módulos (404 Not Found)

Esto generalmente se debe a que la regla de Ingress para la ruta raíz (`/`) no estaba presente o las URLs de Module Federation son incorrectas.

  * **Verificar Regla Raíz:** Asegúrate de que la regla `path: /` apuntando a `host-service` esté correctamente configurada en tu `ingress.yaml`.
  * **Reiniciar Ingress:** Si aplicaste cambios, fuerce un reinicio del controlador:
    ```bash
    kubectl rollout restart deployment -n ingress-nginx ingress-nginx-controller
    ```

-----

## 📈 5. Beneficios y Desafíos Demostrados

| Aspecto | Conclusión | Soluciones Implementadas |
| :--- | :--- | :--- |
| **Despliegues** | Se verifica la **independencia** en los *releases* y *rollbacks* por módulo. | Despliegue separado de cada `Deployment` en K8s. |
| **Autonomía** | Cada MFE tiene un dueño y su propio *stack* de desarrollo, reflejando una estructura de equipos. | Uso de Webpack/Rspack y dependencias separadas. |
| **Rendimiento** | Se evita la duplicación de código en el *runtime*. | Uso de `shared` en Module Federation para compartir librerías esenciales (React, Zustand). |
| **Desafío (Composición)** | La configuración inicial de Module Federation y las rutas de Nginx (con `rewrite-target`) es compleja. | Uso de `pathType: Prefix` y manejo de variables de entorno en contenedores para las rutas. |

-----

## 👥 6. Autores y Contribución

Este proyecto fue desarrollado por:

| Nombre | ID Académico | Contribución Clave |
| :--- | :--- | :--- |
| **BALLADALES SCARPETTA SANTIAGO** | 202510051 | Configuración del host (Module Federation, Nginx, Docker/K8s) y diseño de la presentación. |
| **VILLAMIL GRISALES CARLOS MANUEL** | 202257751 | Desarrollo del microfrontend **Catálogo** (UI, lógica de productos, exposición de FoodList). |
| **SALDAÑA OLMOS SEBASTIAN** | 202410214 | Desarrollo del microfrontend **Carrito** (MiniCart, lógica de órdenes). |
| **MARULANDA CARDENAS SEBASTIAN** | 202410241 | Desarrollo del microfrontend **Payment** (Flujo de checkout, integración remota) y documentación. |

-----

## 🔗 7. Licencia y Presentación

### Video de Presentación

https://drive.google.com/file/d/1gf6OjOwJvVONQx4I6oZ3ZF2rBaxJPfQU/view?usp=drive_link

*(El video contiene la explicación detallada de la arquitectura y la demo en vivo del despliegue en Kubernetes.)*

### Licencia

Este es un proyecto académico y demo. Puede ser reutilizado para fines de práctica o *workshops*, respetando los créditos de los autores originales.
