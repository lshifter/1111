# Ideal Fit Landing Page - GitHub Deployment Guide

## 📋 Descripción del Proyecto

**Ideal Fit Landing Page** es un sitio web de ventas de alta conversión optimizado para la audiencia española. Incluye video promocional, testimonios de clientes, opinión de expertos, integración con sistema de pagos Tovary-Promo y redirección directa a la página de pago.

**Stack Tecnológico:**
- Frontend: React 19 + Tailwind CSS 4
- Backend: Express 4 + tRPC 11
- Base de Datos: MySQL/TiDB
- Autenticación: Manus OAuth
- Pagos: Tovary-Promo Integration

---

## 🚀 Instalación Local

### Requisitos Previos

- Node.js 20+ (recomendado 22.13.0)
- npm o pnpm (recomendado pnpm)
- Git

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/ideal_fit_landing.git
   cd ideal_fit_landing
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env.local
   ```

   Editar `.env.local` con tus credenciales:
   ```env
   DATABASE_URL=mysql://usuario:contraseña@host:puerto/basedatos
   JWT_SECRET=tu_jwt_secret_aqui
   VITE_APP_ID=tu_app_id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://portal.manus.im
   ```

4. **Ejecutar migraciones de base de datos:**
   ```bash
   pnpm db:push
   ```

5. **Iniciar servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

   El servidor estará disponible en `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
ideal_fit_landing/
├── client/                    # Frontend React
│   ├── public/               # Activos estáticos
│   ├── src/
│   │   ├── pages/           # Componentes de página
│   │   │   ├── Home.tsx     # Landing page principal
│   │   │   └── ThankYou.tsx # Página de agradecimiento
│   │   ├── components/      # Componentes reutilizables
│   │   ├── lib/            # Utilidades y configuración
│   │   ├── App.tsx         # Enrutador principal
│   │   └── index.css       # Estilos globales
│   └── index.html          # Template HTML
├── server/                   # Backend Express + tRPC
│   ├── routers.ts          # Procedimientos tRPC
│   ├── db.ts               # Helpers de base de datos
│   ├── m1Affiliate.ts      # Integración M1 CPA
│   └── _core/              # Código de infraestructura
├── drizzle/                 # Esquema y migraciones
│   └── schema.ts           # Definición de tablas
├── shared/                  # Código compartido
├── storage/                 # Helpers de S3
└── package.json            # Dependencias del proyecto
```

---

## 🔧 Configuración de Tovary-Promo

El sitio está configurado para redirigir directamente a Tovary-Promo para el procesamiento de pagos.

**URL de Pago (con parámetros):**
```
https://tovary-promo.com/page/bcd509c11055e71c18857c14f2a114d66c806a42/?name=test&phone=88171818171811&return_url=https%3A%2F%2Fidealfitspain-nbuxk6zs.manus.space%2Fthankyou
```

**Parámetros:**
- `name`: Nombre del cliente
- `phone`: Teléfono del cliente
- `return_url`: URL de redirección después de la compra (página de agradecimiento)

---

## 📊 Integración M1 CPA

El proyecto incluye integración con M1 CPA Network para rastreo de conversiones.

**Parámetros Configurados:**
- **Affiliate ID:** 1026218
- **Geo:** ES (España)
- **Product ID:** 11133
- **Archivo de integración:** `server/m1Affiliate.ts`

**Cómo funciona:**
1. El usuario completa el formulario
2. Los datos se envían a la base de datos local
3. Se registra la conversión en M1 CPA
4. Se redirige al usuario a la página de pago

---

## 🌐 Despliegue en Producción

### Opción 1: Vercel (Recomendado para Frontend)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Opción 2: Railway / Render (Full Stack)

1. Crear proyecto en Railway o Render
2. Conectar repositorio Git
3. Configurar base de datos MySQL
4. Desplegar

### Opción 3: Servidor Propio (VPS)

1. Instalar Node.js y npm/pnpm
2. Clonar repositorio
3. Instalar dependencias: `pnpm install`
4. Compilar: `pnpm build`
5. Iniciar: `pnpm start`
6. Usar PM2 para mantener el proceso activo

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor de desarrollo

# Construcción
pnpm build            # Compila para producción
pnpm preview          # Previsualiza build de producción

# Base de datos
pnpm db:push          # Aplica migraciones
pnpm db:studio        # Abre Drizzle Studio

# Linting
pnpm lint             # Ejecuta ESLint
pnpm type-check       # Verifica tipos TypeScript

# Producción
pnpm start            # Inicia servidor de producción
```

---

## 🎨 Personalización

### Cambiar Colores

Editar `client/src/index.css` para modificar variables CSS:

```css
@layer base {
  :root {
    --primary: 34 197 94;      /* Verde principal */
    --destructive: 239 68 68;  /* Rojo para precios tachados */
    /* ... más variables */
  }
}
```

### Cambiar Textos

Todos los textos están en español en `client/src/pages/Home.tsx`. Buscar y reemplazar según sea necesario.

### Cambiar Imágenes

Las imágenes se encuentran en `client/src/assets/`. Reemplazar archivos manteniendo los mismos nombres.

---

## 🔐 Seguridad

- ✅ Variables de entorno no se commitean (`.env` en `.gitignore`)
- ✅ Contraseñas de base de datos en variables de entorno
- ✅ JWT para autenticación segura
- ✅ HTTPS requerido en producción
- ✅ CORS configurado correctamente

---

## 📞 Soporte y Contacto

Para preguntas o problemas:
1. Revisar documentación del proyecto
2. Consultar logs de error
3. Contactar al equipo de desarrollo

---

## 📄 Licencia

Este proyecto es propietario. Todos los derechos reservados © 2025 Ideal Fit.

---

## ✅ Checklist de Despliegue

Antes de desplegar a producción:

- [ ] Configurar todas las variables de entorno
- [ ] Probar localmente: `pnpm dev`
- [ ] Ejecutar migraciones: `pnpm db:push`
- [ ] Verificar enlaces de pago
- [ ] Probar formularios y redirecciones
- [ ] Verificar responsive design en móviles
- [ ] Configurar dominio personalizado
- [ ] Habilitar HTTPS
- [ ] Configurar backups de base de datos
- [ ] Monitorear logs y errores

---

**Última actualización:** Octubre 28, 2025
**Versión:** 1.0.0
