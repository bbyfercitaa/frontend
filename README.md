# 🚀 Fullstack Frontend

Aplicación React desarrollada con Vite, diseñada para ser desplegada en Vercel y conectada con un backend en Render.

## 🛠️ Tecnologías

- **React 18** - Librería de interfaz de usuario
- **Vite** - Herramienta de build rápida
- **React Router** - Navegación entre páginas
- **React Bootstrap** - Componentes UI
- **React Hook Form** - Manejo de formularios

## 🚀 Despliegue en Vercel

Este repositorio está configurado para ser desplegado automáticamente en Vercel:

1. **Conectar repositorio** desde GitHub a Vercel
2. **Configurar variables de entorno** en Vercel Dashboard:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com/api
   ```
3. **Deploy automático**: Cada push a `main` despliega automáticamente

## 🔗 Conexión con Backend en Render

Cuando tengas tu backend listo en Render:

1. Actualiza `VITE_API_URL` en las variables de entorno de Vercel
2. El frontend se conectará automáticamente al backend

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📱 Páginas Disponibles

- **Home** (`/`) - Página principal con productos destacados
- **Productos** (`/productos`) - Catálogo completo con filtros
- **Nosotros** (`/nosotros`) - Información de la empresa
- **Contactos** (`/contactos`) - Formulario de contacto
- **Iniciar Sesión** (`/iniciar-sesion`) - Login de usuarios
- **Registrarse** (`/registrarse`) - Registro de nuevos usuarios

---

**Listo para conectar con tu backend en Render 🚀**
