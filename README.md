# TempoTest Frontend

Frontend de Tempo para la gestión de transacciones y tempistas. Esta aplicación está construida con React, TypeScript y Vite, consume la API de `tempoService` y puede ejecutarse tanto en desarrollo local como en contenedor Docker con Nginx.

## Objetivo

El frontend permite:

- listar transacciones registradas en el backend
- crear nuevas transacciones
- listar tempistas
- crear y eliminar tempistas

La aplicación consume endpoints REST del servicio backend y mantiene parte del estado cliente con Zustand.

## Stack técnico

- React 19
- TypeScript 5
- Vite 8
- Zustand para estado global
- Axios para consumo HTTP
- Vitest + Testing Library para pruebas
- ESLint para linting
- Docker multi-stage para build y empaquetado
- Nginx Alpine para servir archivos estáticos en producción

## Requisitos

### Desarrollo local

- Node.js 20 o superior
- npm 10 o superior

### Ejecución con contenedores

- Docker
- Docker Compose

## Instalación

Desde la carpeta del frontend:

```bash
cd tempoTest
npm install
```

## Scripts disponibles

```bash
npm run dev
```

Levanta el frontend en modo desarrollo con Vite.

```bash
npm run build
```

Ejecuta la compilación TypeScript y genera el bundle de producción en `dist/`.

```bash
npm run preview
```

Sirve localmente el build generado para validación rápida.

```bash
npm run test
```

Ejecuta la suite de pruebas con Vitest en modo run.

```bash
npm run test:watch
```

Ejecuta Vitest en modo observación.

```bash
npm run lint
```

Corre ESLint sobre el proyecto.

## Variables de entorno

La aplicación usa variables expuestas por Vite. La variable principal es:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Comportamiento

- si `VITE_API_BASE_URL` no existe, el frontend usa `http://localhost:8080`
- esta variable se consume en [`src/config/axiosClient.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/config/axiosClient.ts)
- en build Docker se inyecta como `ARG` y luego como `ENV`

### Ejemplo de `.env`

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Ejecución local

1. iniciar el backend `tempoService`
2. crear un archivo `.env` en la raíz de `tempoTest`
3. definir `VITE_API_BASE_URL`
4. ejecutar:

```bash
npm run dev
```

Por defecto Vite suele levantar en `http://localhost:5173`.

## Integración con backend

La comunicación HTTP se centraliza con Axios en [`src/config/axiosClient.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/config/axiosClient.ts).

### Configuración del cliente HTTP

- `baseURL`: `VITE_API_BASE_URL`
- `timeout`: 10000 ms
- header por defecto: `Content-Type: application/json`
- interceptor de respuesta para logging de errores en consola

### Endpoints consumidos

#### Transacciones

- `GET /transaction`
- `POST /transaction`
- `GET /transaction/:transactionId`
- `DELETE /transaction/:transactionId`

Repositorio: [`src/api/tramsactionRepository.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/api/tramsactionRepository.ts)

#### Tempistas

- `GET /tempistas`
- `POST /tempistas`
- `GET /tempistas/:name`
- `DELETE /tempistas/:id`

Repositorio: [`src/api/tempistaRepository.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/api/tempistaRepository.ts)

### CORS esperado

El backend actualmente permite orígenes como:

- `http://localhost:5173`
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

Referencia: [`tempoService/src/main/java/org/bank/temposervice/config/CorsConfig.java`](/Users/makubex/Documents/prueba tempo/tempoService/src/main/java/org/bank/temposervice/config/CorsConfig.java)

## Arquitectura del frontend

### Patrón general

La aplicación sigue una separación simple por capas:

- `pages/`: composición de pantallas
- `components/`: piezas reutilizables de UI
- `api/`: repositorios para acceso a backend
- `store/`: estado global con Zustand
- `types/`: contratos TypeScript
- `styles/`: hojas CSS por componente/página

### Navegación

La navegación no usa `react-router`. El componente principal [`src/App.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/App.tsx) cambia la vista mediante estado local:

- `transactions`
- `add-transaction`
- `tempistas`
- `add-tempista`

Esto hace que la app funcione como SPA simple sin rutas URL declarativas.

### Estado global

#### Transacciones

Store: [`src/store/transactionStore.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/store/transactionStore.ts)

Responsabilidades:

- mantener listado de transacciones
- manejar `loading` y `error`
- controlar paginación cliente básica
- exponer acciones para cargar, agregar y eliminar

#### Tempistas

Store: [`src/store/tempistaStore.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/store/tempistaStore.ts)

Responsabilidades:

- mantener listado de tempistas
- manejar `loading` y `error`
- exponer acciones para carga, inserción y eliminación

Nota: la pantalla de tempistas actualmente consulta el repositorio directamente y solo sincroniza parte del estado al eliminar.

### Tipado

Los contratos de integración están en [`src/types/api.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/types/api.ts).

#### Request de transacción

```ts
interface TransactionRequest {
  transactionId: number;
  amount: number;
  merchant: string;
  tempistaId: number;
  transactionDate: string;
}
```

#### Response de transacción

```ts
interface TransactionResponse {
  transactionId: number;
  amount: number;
  merchant: string;
  tempistaName: string;
  transactionDate: string;
  createdAt: string;
}
```

#### Request y response de tempista

```ts
interface TempistaRequest {
  name: string;
}

interface TempistaResponse {
  id: number;
  name: string;
}
```

## Flujo funcional por pantalla

### TransactionsPage

Archivo: [`src/pages/TransactionsPage.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/pages/TransactionsPage.tsx)

- carga transacciones al montar
- obtiene datos desde Zustand
- muestra mensajes de carga y error
- renderiza tabla paginada

### AddTransactionPage

Archivo: [`src/pages/AddTransactionPage.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/pages/AddTransactionPage.tsx)

- renderiza el formulario de alta
- invoca `transactionRepository.createTransaction`
- actualiza el store local al crear
- redirige a la vista de transacciones luego del guardado

### TempistasPage

Archivo: [`src/pages/TempistasPage.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/pages/TempistasPage.tsx)

- carga tempistas al montar
- muestra grilla de tarjetas
- permite borrar con confirmación del navegador
- muestra estado vacío si no existen registros

### AddTempistaPage

Archivo: [`src/pages/AddTempistaPage.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/pages/AddTempistaPage.tsx)

- renderiza el formulario de tempista
- invoca `tempistaRepository.createTempista`
- redirige a la vista de listado luego del guardado

## Validaciones del formulario

### TransactionForm

Archivo: [`src/components/TransactionForm.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/components/TransactionForm.tsx)

Validaciones implementadas:

- `transactionId` obligatorio, numérico y mayor que 0
- `merchant` obligatorio
- `amount` obligatorio, numérico y mayor que 0
- `transactionDate` obligatoria y no futura
- `tempistaId` obligatorio

Comportamiento adicional:

- carga tempistas al montar para poblar el selector
- transforma la fecha a ISO antes del envío
- deshabilita acciones durante el submit

### TempistaForm

Archivo: [`src/components/TempistaForm.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/components/TempistaForm.tsx)

Validaciones implementadas:

- `name` obligatorio

## Estructura del proyecto

```text
tempoTest/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── pages/
│   ├── store/
│   ├── styles/
│   ├── test/
│   └── types/
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── package.json
├── vite.config.ts
└── vitest.config.ts
```

## Build y despliegue con Docker

### Dockerfile

Archivo: [`Dockerfile`](/Users/makubex/Documents/prueba tempo/tempoTest/Dockerfile)

La imagen usa dos etapas:

1. `node:20-alpine`
   - instala dependencias con `npm ci`
   - copia el código fuente
   - inyecta `VITE_API_BASE_URL`
   - genera `dist/` con `npm run build`

2. `nginx:1.27-alpine`
   - copia `nginx.conf`
   - copia `dist/` a `/usr/share/nginx/html`
   - expone el puerto `80`

### docker-compose

Archivo: [`docker-compose.yml`](/Users/makubex/Documents/prueba tempo/tempoTest/docker-compose.yml)

Configuración actual:

- servicio: `tempotest`
- contenedor: `tempotest-app`
- puerto host por defecto: `3001`
- puerto contenedor: `80`
- reinicio: `unless-stopped`
- healthcheck con `wget` a `http://localhost`

### Variables soportadas por Compose

```env
VITE_API_BASE_URL=http://localhost:8080
FRONT_PORT=3001
```

### Levantar con Docker Compose

```bash
cd tempoTest
docker compose up --build
```

Acceso esperado:

- frontend: `http://localhost:3001`

## Configuración de Nginx

Archivo: [`nginx.conf`](/Users/makubex/Documents/prueba tempo/tempoTest/nginx.conf)

Nginx está configurado para servir una SPA:

- `root /usr/share/nginx/html`
- `index index.html`
- `try_files $uri $uri/ /index.html`

Esto permite que cualquier ruta termine resolviendo el `index.html` del bundle.

## Testing

La configuración de pruebas está en [`vitest.config.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/vitest.config.ts) y [`src/test/setup.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/test/setup.ts).

Características actuales:

- entorno `jsdom`
- integración con `@testing-library/jest-dom`
- limpieza automática después de cada test

Cobertura funcional presente en el repositorio:

- navegación principal en [`src/App.test.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/App.test.tsx)
- formulario de tempistas en [`src/components/TempistaForm.test.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/components/TempistaForm.test.tsx)
- página de alta de tempistas en [`src/pages/AddTempistaPage.test.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/pages/AddTempistaPage.test.tsx)
- listado de tempistas en [`src/pages/TempistasPage.test.tsx`](/Users/makubex/Documents/prueba tempo/tempoTest/src/pages/TempistasPage.test.tsx)
- store de tempistas en [`src/store/tempistaStore.test.ts`](/Users/makubex/Documents/prueba tempo/tempoTest/src/store/tempistaStore.test.ts)

## Consideraciones técnicas actuales

- la URL del backend se resuelve en build time cuando se empaqueta con Docker
- la navegación es interna por estado y no por URL
- la paginación de transacciones es cliente y se calcula con bloques de 10 elementos
- el frontend asume disponibilidad del backend en el origen configurado
- parte del manejo de errores se estandariza en los repositorios y parte se resuelve en los componentes
- existe una documentación complementaria en:
  - [`API_INTEGRATION.md`](/Users/makubex/Documents/prueba tempo/tempoTest/API_INTEGRATION.md)
  - [`COMPONENTS.md`](/Users/makubex/Documents/prueba tempo/tempoTest/COMPONENTS.md)
  - [`FORMS.md`](/Users/makubex/Documents/prueba tempo/tempoTest/FORMS.md)
  - [`RESPONSIVE_GUIDE.md`](/Users/makubex/Documents/prueba tempo/tempoTest/RESPONSIVE_GUIDE.md)

## Problemas comunes

### El frontend no conecta con el backend

Revisar:

- que `tempoService` esté levantado
- que `VITE_API_BASE_URL` apunte al host y puerto correctos
- que el backend permita el origen desde donde corre el frontend

### Error de CORS

Revisar la configuración en [`tempoService/src/main/java/org/bank/temposervice/config/CorsConfig.java`](/Users/makubex/Documents/prueba tempo/tempoService/src/main/java/org/bank/temposervice/config/CorsConfig.java) y agregar el origen necesario.

### Los cambios de `.env` no se reflejan

En Vite, las variables `VITE_*` se leen al iniciar el proceso. Reiniciar el servidor de desarrollo o reconstruir la imagen Docker.

## Próximas mejoras sugeridas

- incorporar `react-router` si se necesitan rutas navegables
- unificar completamente el uso de Zustand en tempistas
- agregar cobertura de pruebas para transacciones
- mover estilos inline a archivos CSS
- agregar manejo centralizado de notificaciones de error y éxito
- incorporar paginación real desde backend
