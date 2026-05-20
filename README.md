# IntelliPark API

Backend REST API para el sistema de gestión de parqueaderos **IntelliPark**, desarrollado con Node.js y Express como proyecto formativo del programa ADSO en el SENA.

---

## Tecnologías

| Tecnología     | Uso                                        |
|----------------|--------------------------------------------|
| Node.js        | Entorno de ejecución del servidor          |
| Express.js     | Framework web para la API REST             |
| PostgreSQL      | Base de datos relacional                   |
| `pg`           | Cliente PostgreSQL para Node.js            |
| `bcrypt`       | Cifrado de contraseñas                     |
| `jsonwebtoken` | Autenticación mediante tokens JWT          |
| `cors`         | Habilitación de solicitudes entre dominios |
| `dotenv`       | Gestión de variables de entorno            |
| `nodemon`      | Reinicio automático en desarrollo          |

---

## Estructura del proyecto

```
intelliParkApi/
├── docs/                        # Documentación del proyecto
│   └── 1-objetivo-inicial.txt
├── src/
│   ├── config/
│   │   └── database.js          # Configuración y pool de conexión a PostgreSQL
│   ├── app.js                   # Configuración de Express (middlewares y rutas)
│   └── server.js                # Punto de entrada: arranca el servidor
├── .env                         # Variables de entorno (no se sube al repositorio)
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore
└── package.json
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [PostgreSQL](https://www.postgresql.org/) v14 o superior
- npm v9 o superior

---

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd intelliParkApi
```

2. Instalar las dependencias:

```bash
npm install
```

3. Configurar las variables de entorno:

```bash
cp .env.example .env
```

Luego editar el archivo `.env` con los valores correspondientes (ver sección [Variables de entorno](#variables-de-entorno)).

---

## Variables de entorno

El archivo `.env` debe contener las siguientes variables:

```env
# Servidor
PORT=3000

# Base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=intellipark_db
DB_USER=tu_usuario_db
DB_PASSWORD=tu_contraseña_db

# Autenticación JWT
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRES_IN=1h
```

> **Nunca subas el archivo `.env` al repositorio.** Está incluido en `.gitignore`.

---

## Ejecución

**Modo desarrollo** (con reinicio automático):

```bash
npm run dev
```

**Modo producción:**

```bash
npm start
```

El servidor se inicia por defecto en `http://localhost:3000`.

---

## Endpoints disponibles

### `GET /api/health`

Verifica el estado del servidor y la conexión a la base de datos.

**Respuesta exitosa (`200 OK`):**

```json
{
  "status": "ok",
  "message": "IntelliPark API is running",
  "database": {
    "connected": true,
    "time": "2025-01-01T00:00:00.000Z"
  }
}
```

**Respuesta con error de BD (`500 Internal Server Error`):**

```json
{
  "status": "error",
  "message": "IntelliPark API is running, but database connection failed",
  "database": {
    "connected": false,
    "error": "descripción del error"
  }
}
```

---

## Módulo 1 — Objetivo inicial

Construir la base funcional del backend dejando listo:

- [x] Proyecto Node.js inicializado
- [x] Dependencias instaladas
- [x] Estructura de carpetas
- [x] Servidor Express configurado
- [x] Variables de entorno con `.env`
- [x] CORS habilitado
- [x] Conexión inicial a PostgreSQL
- [x] Endpoint de prueba: `GET /api/health`

---

## Autores

Proyecto formativo desarrollado en el **SENA** — Programa **Análisis y Desarrollo de Software (ADSO)**.
