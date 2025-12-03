# 🎉 La Pica de la Isa - Sistema de Gestión de Eventos

Sistema integral de gestión de asistencia para el centro de eventos "La Pica de la Isa", desarrollado con arquitectura MERN (MongoDB, Express, React, Node.js).

## 📋 Descripción

Este proyecto es un gestor de asistencia diseñado específicamente para centros de eventos, permitiendo la administración eficiente de reservas, control de asistentes y gestión operativa del local.

## 🚀 Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Docker** - Contenedorización

### Frontend
- **React** - Librería de UI
- **Vite** - Build tool y dev server

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started) y Docker Compose
- [Node.js](https://nodejs.org/) (v14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Gr4ykt/Proyecto-La-Pica-De-La-Isa.git
cd Proyecto-La-Pica-De-La-Isa
```

### 2. Iniciar el Backend

El backend utiliza Docker Compose para gestionar todos los servicios necesarios (Node.js, MongoDB, etc.).

```bash
docker-compose up --build
```

Este comando:
- Construirá las imágenes Docker necesarias
- Levantará todos los contenedores del backend
- Configurará la base de datos MongoDB
- Iniciará el servidor Express

### 3. Configurar el Frontend

En una nueva terminal, instala las dependencias del frontend:

```bash
npm install
```

### 4. Iniciar el Frontend

Una vez instaladas las dependencias, inicia el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

## 🎯 Uso

Una vez que tanto el backend como el frontend estén ejecutándose:

1. Abre tu navegador en `http://localhost:5173`
2. Accede al sistema con tus credenciales
3. Comienza a gestionar eventos y asistencias

## 📁 Estructura del Proyecto

```
Proyecto-La-Pica-De-La-Isa/
├── backend/              # Código del servidor
│   ├── src/             # Código fuente
│   ├── Dockerfile       # Configuración Docker
│   └── ...
├── frontend/            # Aplicación React
│   ├── src/            # Componentes y lógica
│   ├── public/         # Archivos estáticos
│   └── ...
├── docker-compose.yml   # Orquestación de servicios
└── README.md           # Este archivo
```

## 🛠️ Scripts Disponibles

### Backend
```bash
docker-compose up         # Iniciar servicios
docker-compose down       # Detener servicios
docker-compose logs -f    # Ver logs en tiempo real
```

### Frontend
```bash
npm run dev              # Servidor de desarrollo
npm run build            # Compilar para producción
npm run preview          # Previsualizar build de producción
```

## 🐛 Solución de Problemas

### El backend no inicia
- Verifica que Docker esté ejecutándose
- Asegúrate de que los puertos necesarios no estén ocupados
- Revisa los logs: `docker-compose logs`

### El frontend no carga
- Confirma que las dependencias estén instaladas: `npm install`
- Verifica que el puerto 5173 esté disponible
- Revisa la configuración de la API en el frontend

### Problemas de conexión entre frontend y backend
- Verifica que ambos servicios estén corriendo
- Confirma las URLs de API en la configuración del frontend
- Revisa la configuración de CORS en el backend

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es parte de un proyecto integrativo empresarial.

## 👥 Autores

- **Gr4ykt** - [GitHub](https://github.com/Gr4ykt)

## 📞 Contacto

Para consultas sobre el proyecto, por favor abre un issue en el repositorio de GitHub.

---

⭐️ Si este proyecto te fue útil, considera darle una estrella en GitHub