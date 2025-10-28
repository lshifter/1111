# GitHub Setup Guide

## How to Upload to GitHub

This guide will help you upload the Ideal Fit landing page project to GitHub.

### Prerequisites

- GitHub account (https://github.com)
- Git installed on your computer
- Terminal/Command Prompt access

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `ideal-fit-landing`
3. Add description: "High-converting Spanish landing page for Ideal Fit supplement with M1 affiliate integration"
4. Choose visibility: **Private** (recommended) or **Public**
5. Click "Create repository"

### Step 2: Initialize Git (if not already done)

```bash
cd /path/to/ideal_fit_landing

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Ideal Fit landing page with M1 integration"
```

### Step 3: Add Remote Repository

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ideal-fit-landing.git

# Verify remote was added
git remote -v
```

### Step 4: Push to GitHub

```bash
# Push main branch
git branch -M main
git push -u origin main
```

### Step 5: Verify Upload

1. Go to https://github.com/YOUR_USERNAME/ideal-fit-landing
2. Verify all files are present
3. Check that documentation files are visible

## Project Files Structure

When uploaded, your repository will contain:

```
ideal-fit-landing/
├── client/                              # React frontend
│   ├── src/
│   │   ├── pages/Home.tsx              # Main landing page
│   │   ├── components/                 # UI components
│   │   ├── assets/                     # Images
│   │   ├── App.tsx                     # Routes
│   │   └── index.css                   # Styles
│   ├── index.html
│   └── package.json
├── server/                              # Express backend
│   ├── routers.ts                      # tRPC procedures
│   ├── db.ts                           # Database helpers
│   ├── m1Affiliate.ts                  # M1 integration ⭐
│   ├── googleSheets.ts                 # Google Sheets webhook
│   └── _core/                          # Framework internals
├── drizzle/
│   └── schema.ts                       # Database schema
├── .env.example                         # Environment template
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── vite.config.ts                       # Vite config
├── README.md                            # Main documentation ⭐
├── M1_INTEGRATION_GUIDE.md              # M1 setup guide ⭐
├── GOOGLE_SHEETS_SETUP.md               # Google Sheets guide
├── TESTING_GUIDE.md                     # Testing procedures
├── GITHUB_SETUP.md                      # This file
├── todo.md                              # Project tasks
└── .gitignore                           # Git ignore rules
```

## Important Files

### Core Integration Files

- **`server/m1Affiliate.ts`** - M1 CPA network integration
  - Handles order submission to M1
  - Manages affiliate tracking
  - Validates order data

- **`server/routers.ts`** - tRPC API endpoints
  - Form submission endpoint
  - M1 integration trigger
  - Google Sheets webhook

- **`client/src/pages/Home.tsx`** - Main landing page
  - All UI components
  - Form handling
  - Popup logic

### Documentation Files

- **`README.md`** - Start here for overview and setup
- **`M1_INTEGRATION_GUIDE.md`** - Detailed M1 configuration
- **`GOOGLE_SHEETS_SETUP.md`** - Google Sheets webhook setup
- **`TESTING_GUIDE.md`** - Comprehensive testing procedures

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/ideal_fit"

# OAuth (provided by platform)
JWT_SECRET="your_jwt_secret"
VITE_APP_ID="your_app_id"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://oauth.manus.im"

# M1 Affiliate (optional - defaults are built-in)
M1_AFFILIATE_ID=1026218
M1_PRODUCT_ID=11133
M1_GEO=ES
M1_WEBHOOK_URL="https://m1.top/webhook/order"

# Google Sheets (optional)
GOOGLE_SHEETS_WEBHOOK_URL="your_google_apps_script_url"
```

## Installation & Running

### Local Development

```bash
# Install dependencies
pnpm install

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

Visit http://localhost:3000

### Production Build

```bash
# Build frontend and backend
pnpm build

# Start production server
pnpm start
```

## Key Features to Highlight

When sharing this project:

✅ **M1 Affiliate Integration**
- Automatic order submission to M1 CPA network
- Affiliate ID: 1026218
- Product ID: 11133
- GEO: Spain (ES)

✅ **Smart Popup**
- Appears only on button click
- Beautiful design with product image
- Strikethrough pricing (59€ → 29€)

✅ **Before/After Images**
- Professional transformation photos
- Integrated in customer reviews
- High-quality results showcase

✅ **Spanish Optimization**
- 100% Spanish language
- Spain-specific content
- Culturally adapted messaging

✅ **Multiple Data Channels**
- Local database backup
- Google Sheets webhook
- M1 affiliate tracking

## Collaboration

### Adding Collaborators

1. Go to repository Settings
2. Click "Collaborators"
3. Add GitHub usernames
4. They'll receive an invitation

### Branching Strategy

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request on GitHub
```

## Updating the Repository

### Pull Latest Changes

```bash
git pull origin main
```

### Push Local Changes

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### View Commit History

```bash
git log --oneline
```

## Protecting Sensitive Data

### .gitignore

The project includes a `.gitignore` file that excludes:

```
node_modules/
.env
.env.local
dist/
build/
*.log
.DS_Store
```

**Never commit:**
- `.env` files with real credentials
- Database passwords
- API keys
- Personal information

### Secret Management

For sensitive data:

1. Use `.env.example` as template
2. Never commit actual `.env` files
3. Use GitHub Secrets for CI/CD
4. Document required variables in README

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
      # Add deployment step here
```

## Troubleshooting

### Git Push Fails

```bash
# Check remote URL
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/YOUR_USERNAME/ideal-fit-landing.git

# Try push again
git push -u origin main
```

### Large File Error

```bash
# Check file sizes
git ls-files -l | sort -k4 -rn | head -20

# Remove large files
git rm --cached large_file.bin
echo "large_file.bin" >> .gitignore
git commit -m "Remove large file"
```

### Authentication Issues

```bash
# Generate personal access token on GitHub
# Settings → Developer settings → Personal access tokens

# Use token as password when prompted
git push origin main
```

## Repository Settings

### Recommended Settings

1. **Branch Protection**
   - Settings → Branches
   - Require pull request reviews
   - Require status checks to pass

2. **Visibility**
   - Keep as Private if containing sensitive data
   - Make Public for open-source projects

3. **Collaborators**
   - Add team members with appropriate permissions
   - Use branch protection for main branch

## Documentation Best Practices

### README.md

- Clear project description
- Quick start guide
- Feature list
- Installation instructions
- Configuration guide
- Troubleshooting section

### CONTRIBUTING.md

If accepting contributions:

```markdown
# Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Wait for review

## Code Style

- Use TypeScript
- Follow ESLint rules
- Write tests for new features
```

## Sharing the Project

### Share Repository Link

```
https://github.com/YOUR_USERNAME/ideal-fit-landing
```

### Share with Specific People

1. Go to repository
2. Click "Share"
3. Generate shareable link
4. Set expiration date if needed

### Clone for Others

```bash
git clone https://github.com/YOUR_USERNAME/ideal-fit-landing.git
cd ideal-fit-landing
pnpm install
```

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Add documentation
4. ✅ Configure branch protection
5. ⏳ Set up CI/CD pipeline
6. ⏳ Add collaborators
7. ⏳ Monitor repository activity

## Support

For GitHub help:
- GitHub Docs: https://docs.github.com
- GitHub Support: https://support.github.com
- Stack Overflow: Tag with `github`

---

**Created:** October 28, 2025  
**Last Updated:** October 28, 2025
