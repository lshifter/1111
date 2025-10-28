# 📦 Ideal Fit Landing Page - GitHub Upload Instructions

## Prerequisites

Before uploading to GitHub, ensure you have:
- Git installed (`git --version`)
- GitHub account and repository created
- Node.js 18+ and pnpm installed

## Step 1: Initialize Git Repository

```bash
cd ideal_fit_landing
git init
git add .
git commit -m "Initial commit: Ideal Fit landing page for Spanish market"
```

## Step 2: Add Remote Repository

```bash
# Replace YOUR_USERNAME and YOUR_REPO with your actual GitHub details
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 3: Verify Upload

Visit your GitHub repository to confirm all files are uploaded correctly.

## Installation for Others

Users can clone and run your project with:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd ideal_fit_landing
pnpm install
pnpm dev
```

## Project Structure

```
ideal_fit_landing/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── assets/        # Images and media
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML entry point
│   └── vite.config.ts     # Vite configuration
├── server/                # Backend (Express + tRPC)
│   ├── routers.ts         # API procedures
│   ├── db.ts              # Database helpers
│   └── _core/             # Core server logic
├── drizzle/               # Database ORM
│   └── schema.ts          # Database schema
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md              # Project documentation
```

## Key Features

✅ **Spanish Landing Page** - Fully localized for Spanish audience
✅ **Payment Integration** - Direct integration with Tovary-Promo
✅ **Responsive Design** - Mobile, tablet, and desktop optimized
✅ **Customer Reviews** - Authentic testimonials with images
✅ **TV Channel Logos** - Trust badges (IMAGEN TV, Telemundo, FIA)
✅ **YouTube Integration** - Embedded promotional video
✅ **Full-Stack Ready** - Backend API with database support

## Environment Variables

Create `.env.local` with:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=your_oauth_url
VITE_OAUTH_PORTAL_URL=your_portal_url
OWNER_OPEN_ID=your_owner_id
OWNER_NAME=your_name
VITE_APP_TITLE=Ideal Fit
VITE_APP_LOGO=your_logo_url
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
BUILT_IN_FORGE_API_URL=your_forge_api_url
BUILT_IN_FORGE_API_KEY=your_forge_api_key
```

## Common Issues & Solutions

### Issue: `pnpm install` fails
**Solution:** Clear cache and reinstall
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Port 3000 already in use
**Solution:** Use different port
```bash
pnpm dev -- --port 3001
```

### Issue: Database connection error
**Solution:** Verify DATABASE_URL in .env.local and ensure MySQL is running

### Issue: Build fails with TypeScript errors
**Solution:** Run type check and fix errors
```bash
pnpm check
```

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Auto-deploys on push

### Self-Hosted
```bash
pnpm build
pnpm start
```

## Support & Documentation

- **Setup Guide:** See QUICK_START.md
- **Full Documentation:** See README_GITHUB.md
- **Deployment Guide:** See DEPLOYMENT_GUIDE.md

## License

MIT License - Feel free to use and modify

---

**Ready to deploy? Follow the steps above and your landing page will be live!** 🚀
