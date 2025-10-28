# 🚀 Quick Start Guide - Ideal Fit Landing Page

## Installation (3 steps)

### 1. Clone & Install
```bash
git clone https://github.com/tu-usuario/ideal_fit_landing.git
cd ideal_fit_landing
pnpm install
```

### 2. Setup Environment
```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your credentials:
# - DATABASE_URL
# - JWT_SECRET
# - VITE_APP_ID
# - OAUTH_SERVER_URL
# - VITE_OAUTH_PORTAL_URL
```

### 3. Run Development Server
```bash
pnpm db:push    # Apply database migrations
pnpm dev        # Start dev server
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## Key Files to Customize

| File | Purpose |
|------|---------|
| `client/src/pages/Home.tsx` | Landing page content and layout |
| `client/src/index.css` | Colors, fonts, and global styling |
| `client/src/assets/` | Images, logos, and review photos |
| `server/routers.ts` | API endpoints and business logic |
| `drizzle/schema.ts` | Database schema and tables |

---

## Deployment

### Vercel (Recommended - Easiest)
```bash
npm install -g vercel
vercel
```

### Railway or Render
1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Auto-deploys on every push

### Self-Hosted VPS
```bash
pnpm build
pnpm start
```

---

## Useful Commands

```bash
# Development
pnpm dev              # Start development server
pnpm dev --host       # Accessible from network

# Building
pnpm build            # Production build
pnpm preview          # Preview production build locally

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript validation

# Database
pnpm db:push          # Apply schema migrations
pnpm db:studio        # Open Drizzle Studio GUI
```

---

## Payment Integration

The site redirects to Tovary-Promo for payment processing:

```
https://tovary-promo.com/page/bcd509c11055e71c18857c14f2a114d66c806a42/
?name=USER_NAME
&phone=USER_PHONE
&return_url=https://your-domain.com/thankyou
```

**Configuration:**
- Affiliate ID: 1026218
- Geo: ES (Spain)
- Product ID: 11133

---

## Customization Examples

### Change Price
Edit `client/src/pages/Home.tsx`:
```typescript
// Change from 78€ → 39€ to your desired prices
<div className="text-2xl text-red-600 line-through font-bold">
  Precio normal: 78€
</div>
<div className="text-6xl font-bold text-green-500">
  SOLO 39€
</div>
```

### Change Colors
Edit `client/src/index.css`:
```css
@layer base {
  :root {
    --primary: 34 197 94;      /* Green */
    --destructive: 239 68 68;  /* Red */
    /* ... more variables */
  }
}
```

### Update Testimonials
Edit `client/src/pages/Home.tsx` - search for review sections with Carmen, Lucía, Elena

---

## Troubleshooting

### Port 3000 already in use
```bash
pnpm dev -- --port 3001
```

### Database connection error
```bash
# Check DATABASE_URL in .env.local
# Verify MySQL is running
# Run migrations: pnpm db:push
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

---

## Project Structure

```
ideal_fit_landing/
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   ├── assets/     # Images and media
│   │   └── index.css   # Global styles
│   └── index.html
├── server/             # Backend (Express + tRPC)
│   ├── routers.ts      # API procedures
│   └── db.ts           # Database helpers
├── drizzle/            # Database ORM
│   └── schema.ts       # Table definitions
└── package.json
```

---

## Support & Documentation

- 📖 **Full Setup Guide:** [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md)
- 📖 **Project Overview:** [README_GITHUB.md](./README_GITHUB.md)
- 🐛 **Debugging:** Check console output from `pnpm dev`
- 💬 **Questions:** Review code comments and documentation

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Run database migrations
4. ✅ Start development server
5. ✅ Customize content (texts, images, colors)
6. ✅ Test payment flow
7. ✅ Deploy to production

---

**Happy coding! 🎉**

For detailed information, see [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md)
