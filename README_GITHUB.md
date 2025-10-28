# 🎯 Ideal Fit Landing Page - España

Una landing page de alta conversión para la venta de suplementos de pérdida de peso Ideal Fit, optimizada para la audiencia española con integración de pagos Tovary-Promo.

![Ideal Fit Landing Page](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-Proprietary-red)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

---

## ✨ Características Principales

### 🎬 Sección de Video
- Reproductor YouTube embebido con video promocional
- Botón de llamada a la acción (CTA) debajo del video
- Popup modal con oferta especial al hacer clic

### 💬 Testimonios de Clientes
- 3 testimonios auténticos de clientes españolas
- Fotos antes/después de resultados reales
- Fechas variadas (julio-octubre 2025)
- Calificaciones de estrellas
- Uno de los testimonios muestra progreso actual con promesa de futuros resultados

### 👨‍⚕️ Opinión de Experto
- Dr. Alejandro Torres - Nutricionista especializado en metabolismo
- Foto profesional del doctor
- Análisis científico del producto
- Recomendación profesional

### 📺 Logos de Medios
- IMAGEN TELEVISIÓN
- NOTICIAS TELEMUNDO
- FIA - FUERZA INFORMATIVA AZTECA

### 💳 Sistema de Pagos
- Integración directa con Tovary-Promo
- Redirección segura con parámetros de usuario
- Página de agradecimiento post-compra
- Rastreo de conversiones M1 CPA

### 🎨 Diseño Responsivo
- Optimizado para móvil, tablet y desktop
- Interfaz moderna y profesional
- Colores y tipografía españoles
- Accesibilidad WCAG compliant

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 20+
- pnpm (recomendado) o npm
- MySQL 8.0+

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/ideal_fit_landing.git
cd ideal_fit_landing

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Aplicar migraciones
pnpm db:push

# Iniciar desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📦 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 19, Tailwind CSS 4, TypeScript |
| **Backend** | Express 4, tRPC 11, Node.js |
| **Base de Datos** | MySQL 8.0 / TiDB |
| **Autenticación** | Manus OAuth 2.0 |
| **Pagos** | Tovary-Promo Integration |
| **Tracking** | M1 CPA Network |
| **Hosting** | Vercel / Railway / VPS |

---

## 📂 Estructura del Proyecto

```
ideal_fit_landing/
├── client/                          # Frontend React
│   ├── public/                      # Activos estáticos
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Landing page principal
│   │   │   └── ThankYou.tsx        # Página de agradecimiento
│   │   ├── components/             # Componentes reutilizables
│   │   ├── assets/                 # Imágenes y recursos
│   │   ├── lib/trpc.ts            # Cliente tRPC
│   │   ├── App.tsx                # Enrutador
│   │   └── index.css              # Estilos globales
│   └── index.html
├── server/                          # Backend
│   ├── routers.ts                  # Procedimientos tRPC
│   ├── db.ts                       # Helpers de BD
│   ├── m1Affiliate.ts              # Integración M1
│   └── _core/                      # Infraestructura
├── drizzle/                         # ORM y migraciones
│   └── schema.ts                   # Esquema de BD
├── shared/                          # Código compartido
└── package.json
```

---

## 🔧 Configuración

### Variables de Entorno Requeridas

```env
# Base de Datos
DATABASE_URL=mysql://usuario:contraseña@localhost:3306/ideal_fit

# Autenticación
JWT_SECRET=tu_jwt_secret_aqui
VITE_APP_ID=tu_app_id

# OAuth
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Tovary-Promo
TOVARY_PROMO_URL=https://tovary-promo.com/page/bcd509c11055e71c18857c14f2a114d66c806a42/
RETURN_URL=https://tu-dominio.com/thankyou

# M1 CPA
M1_AFFILIATE_ID=1026218
M1_GEO=ES
M1_PRODUCT_ID=11133
```

---

## 💰 Información de Precios

- **Precio Normal:** 78€
- **Precio Especial:** 39€
- **Ahorro:** 39€ (50% descuento)
- **Geo:** España

---

## 📊 Integración M1 CPA

El proyecto está configurado para rastrear conversiones automáticamente:

```typescript
// server/m1Affiliate.ts
const affiliateConfig = {
  affiliateId: "1026218",
  geo: "ES",
  productId: "11133",
};
```

Cada compra se registra automáticamente en M1 CPA Network.

---

## 🎯 Flujo de Usuario

1. Usuario llega a la landing page
2. Ve video promocional
3. Hace clic en "¡Quiero mi Ideal Fit ahora!"
4. Aparece popup con oferta especial
5. Hace clic en "Comprar ahora"
6. Se redirige a Tovary-Promo con datos de usuario
7. Completa pago
8. Se redirige a página de agradecimiento
9. Conversión registrada en M1 CPA

---

## 🧪 Testing

```bash
# Ejecutar tests
pnpm test

# Tests con coverage
pnpm test:coverage

# Lint
pnpm lint

# Type checking
pnpm type-check
```

---

## 📱 Responsividad

- ✅ Mobile-first design
- ✅ Optimizado para pantallas pequeñas
- ✅ Breakpoints: 640px, 768px, 1024px, 1280px
- ✅ Imágenes optimizadas para web
- ✅ Fuentes web optimizadas

---

## 🔐 Seguridad

- ✅ HTTPS requerido en producción
- ✅ Variables de entorno protegidas
- ✅ CORS configurado
- ✅ JWT para autenticación
- ✅ Validación de formularios
- ✅ Protección contra XSS
- ✅ Rate limiting en endpoints

---

## 📈 Optimización de Conversión

- **Headline claro:** "Si dedicas solo 20 minutos al mes..."
- **Urgencia:** Oferta especial limitada
- **Prueba social:** 3 testimonios auténticos
- **Autoridad:** Opinión de experto médico
- **Confianza:** Logos de medios, garantía, pago seguro
- **CTA fuerte:** Botones verdes prominentes
- **Móvil optimizado:** Fácil de usar en teléfono

---

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Railway
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Desplegar automáticamente

### VPS Propio
```bash
pnpm build
pnpm start
```

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisar [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md)
2. Consultar logs: `pnpm dev`
3. Contactar al equipo de desarrollo

---

## 📄 Licencia

**Propietario.** Todos los derechos reservados © 2025 Ideal Fit.

No se permite reproducción, distribución o modificación sin permiso explícito.

---

## 🎉 Características Futuras

- [ ] Integración con WhatsApp
- [ ] Chat en vivo con soporte
- [ ] Programa de afiliados
- [ ] Más idiomas
- [ ] Análisis avanzado
- [ ] A/B testing integrado

---

## 👥 Contribuidores

- **Desarrollo:** Manus AI Team
- **Diseño:** Equipo de UX/UI
- **Contenido:** Equipo de Marketing

---

**Última actualización:** Octubre 28, 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Production Ready
