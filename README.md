# FrontendLibreria

Interfaz web para el sistema de gestión de biblioteca. Permite administrar usuarios, libros, ejemplares y préstamos consumiendo la API REST de [BackendLibreria](https://github.com/SantiagoPineda0353/BackendLibreria). Desarrollada con React, TypeScript y Vite, desplegada con Docker y Nginx.

## Tecnologías

- React 18
- TypeScript
- Vite
- Axios
- Docker / Docker Compose
- Nginx (servidor de la aplicación en producción)

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo
- Git
- El backend ([BackendLibreria](https://github.com/SantiagoPineda0353/BackendLibreria)) corriendo y accesible

## Variables de entorno

El proyecto usa un archivo `.env` en la raíz. Copia el archivo de ejemplo y ajusta los valores si lo necesitas:

```
VITE_API_URL=http://localhost:8080
FRONTEND_PORT=3000
```

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL donde el navegador del usuario puede alcanzar la API del backend. **Importante:** esta variable se incrusta en el código durante el build (Vite la resuelve en tiempo de compilación), por lo que debe ser una URL accesible desde el navegador, no solo desde dentro de la red de Docker. |
| `FRONTEND_PORT` | Puerto en el que quedará expuesta la aplicación en el host. |

> Si cambias `VITE_API_URL`, es necesario reconstruir la imagen (`docker compose up --build`) para que el nuevo valor quede incluido en el build, ya que no se lee en tiempo de ejecución.

## Ejecución del proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/SantiagoPineda0353/FrontendLibreria.git
cd FrontendLibreria

# 2. Crear el archivo .env a partir del ejemplo
copy .env.example .env        # Windows (PowerShell/CMD)
# cp .env.example .env        # Linux/Mac

# 3. Levantar el frontend con Docker (construye la imagen y la ejecuta)
docker compose up --build -d

# 4. Verificar que el contenedor este corriendo
docker compose ps
```

La aplicación queda disponible en `http://localhost:3000` (o el puerto que hayas definido en `FRONTEND_PORT`).

> **Nota:** este frontend requiere que el backend ([BackendLibreria](https://github.com/SantiagoPineda0353/BackendLibreria)) esté corriendo y accesible en la URL definida en `VITE_API_URL` para poder funcionar correctamente.

## Desarrollo local sin Docker (opcional)

Si prefieres correr el frontend directamente con Vite en modo desarrollo (hot reload):

```bash
npm install
npm run dev
```

Esto levanta la aplicación en `http://localhost:5173`.

## Funcionalidades

### Gestión de Libros
- Listar, crear, editar y eliminar libros
- Ver y agregar ejemplares de un libro específico

### Gestión de Usuarios
- Listar, crear, editar y eliminar usuarios

### Gestión de Préstamos
- Registrar un préstamo (selecciona usuario y libro; el sistema asigna automáticamente un ejemplar disponible)
- Consultar ejemplares disponibles por ISBN
- Listar préstamos por usuario o por libro
- Registrar la devolución de un préstamo

## ⚠️ Importante: CORS y puertos

El backend solo acepta peticiones desde orígenes explícitamente autorizados (configurados en `CorsConfig.java`). Si cambias el `FRONTEND_PORT` o corres la aplicación en un puerto distinto al configurado por defecto (`3000` en Docker, `5173` en desarrollo con Vite), las peticiones al backend serán **bloqueadas por la política de CORS** y verás un error similar a:

```
Access to XMLHttpRequest at 'http://localhost:8080/api/...' from origin 'http://localhost:XXXX'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

Si necesitas usar un puerto distinto, asegúrate de que ese origen esté agregado en la configuración de CORS del backend (`allowedOrigins` en `CorsConfig.java`), o usa los puertos por defecto documentados en este README para evitar este problema.

## Detener el proyecto

```bash
docker compose down
```
