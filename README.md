# Ideal Fit - Spanish Landing Page

A high-converting landing page for the Ideal Fit weight loss supplement, optimized for the Spanish market and integrated with the M1 CPA affiliate network.

## 🎯 Features

- **YouTube Video Integration:** Embedded video with professional popup
- **Smart Popup:** Appears on button click (not auto-popup)
- **Dynamic Pricing:** Strikethrough original price (59€) with special offer (29€)
- **Before/After Gallery:** Professional transformation images in customer reviews
- **Customer Testimonials:** 3 authentic Spanish reviews with AI-generated photos
- **Expert Opinion:** Dr. Alejandro Torres (Madrid) nutritionist recommendation
- **M1 Affiliate Integration:** Automatic order submission to M1 CPA network
- **Form Validation:** Client and server-side validation
- **Responsive Design:** Mobile, tablet, and desktop optimized
- **Spanish Language:** 100% Spanish content optimized for Spain
- **Database Storage:** Local backup of all submissions
- **Google Sheets Integration:** Webhook submission to Google Sheets

## 📋 Project Structure

```
ideal_fit_landing/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx            # Main landing page
│   │   ├── components/
│   │   ├── assets/                 # Images (reviews, before/after)
│   │   ├── App.tsx                 # Routes
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── public/                      # Static files
│   └── index.html
├── server/                          # Express backend
│   ├── routers.ts                  # tRPC procedures
│   ├── db.ts                       # Database queries
│   ├── m1Affiliate.ts              # M1 integration
│   ├── googleSheets.ts             # Google Sheets webhook
│   └── _core/                      # Framework internals
├── drizzle/
│   └── schema.ts                   # Database schema
├── M1_INTEGRATION_GUIDE.md         # M1 setup guide
├── GOOGLE_SHEETS_SETUP.md          # Google Sheets setup
├── TESTING_GUIDE.md                # Testing procedures
├── todo.md                         # Project tasks
└── README.md                       # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- MySQL database (or TiDB)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ideal_fit_landing.git
cd ideal_fit_landing

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

The site will be available at `http://localhost:3000`

## 🔧 Configuration

### M1 Affiliate Setup

Your affiliate details are pre-configured:

```
Affiliate ID: 1026218
Product ID: 11133
GEO: ES (Spain)
Product Price: 29€
```

To change these values, edit `server/m1Affiliate.ts`:

```typescript
const M1_CONFIG = {
  affiliateId: 1026218,      // Your affiliate ID
  productId: 11133,          // Your product ID
  geo: "ES",                 // Geographic region
  apiEndpoint: "https://m1.top/api/orders",
  webhookEndpoint: process.env.M1_WEBHOOK_URL || "https://m1.top/webhook/order",
};
```

### Google Sheets Integration

To enable Google Sheets webhook:

1. Follow instructions in `GOOGLE_SHEETS_SETUP.md`
2. Create a Google Apps Script
3. Update the webhook URL in `server/googleSheets.ts`

### Database Configuration

Update `DATABASE_URL` in `.env`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/ideal_fit"
```

## 📱 Usage

### Customer Flow

1. **Landing:** Customer lands on page
2. **Video:** Watches YouTube video
3. **Popup:** Clicks "¿Quiero mi Ideal Fit ahora!" → Popup appears
4. **Order:** Clicks "Comprar ahora" → Scrolls to form
5. **Form:** Fills name, phone, email
6. **Submit:** Clicks "ENVIAR MI PEDIDO Y APROVECHAR LA OFERTA"
7. **Confirmation:** Receives success message
8. **M1 Processing:** Order sent to M1 for verification

### Admin Monitoring

**Check orders in database:**
```sql
SELECT * FROM form_submissions ORDER BY created_at DESC LIMIT 10;
```

**Monitor M1 dashboard:**
- Log in to https://m1.top
- View real-time order statistics
- Track commission earnings

## 🎨 Customization

### Change Product Image

Replace the image URL in `client/src/pages/Home.tsx`:

```tsx
<img
  src="https://your-image-url.com/product.jpg"
  alt="Ideal Fit"
/>
```

### Modify Pricing

Update prices in the Home component:

```tsx
<div className="text-lg text-gray-500 line-through mb-2">
  Precio normal: 59€  {/* Change this */}
</div>
<div className="text-4xl font-bold text-green-500 mb-1">
  SOLO 29€  {/* And this */}
</div>
```

### Edit Expert Opinion

Modify Dr. Torres' quote in `client/src/pages/Home.tsx`:

```tsx
<p className="text-gray-700 leading-relaxed">
  "Your custom expert opinion here..."
</p>
```

### Add/Remove Reviews

Customer reviews are defined in the Home component. Add or remove review cards as needed.

## 📊 Analytics

### Form Submissions

Track all submissions:

```bash
# View recent submissions
curl http://localhost:3000/api/trpc/form.getRecent

# Export to CSV
SELECT name, phone, email, created_at FROM form_submissions 
INTO OUTFILE '/tmp/submissions.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

### M1 Statistics

Access your M1 dashboard for:
- Total leads submitted
- Confirmed orders
- Commission earned
- Conversion rate
- Real-time statistics

## 🔐 Security

### Data Protection

- ✅ HTTPS required for production
- ✅ Input validation (client + server)
- ✅ No credit card data stored
- ✅ Phone number validation
- ✅ Email validation (optional field)

### Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

app.post("/api/trpc/form.submit", limiter, ...);
```

### GDPR Compliance

- ✅ Privacy policy link in footer
- ✅ Optional email field
- ✅ Clear data usage disclosure
- ✅ Data deletion capability

## 🧪 Testing

Run the testing guide:

```bash
# See TESTING_GUIDE.md for comprehensive test procedures
cat TESTING_GUIDE.md
```

### Quick Test

```bash
# Test form submission
curl -X POST http://localhost:3000/api/trpc/form.submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "123456789",
    "email": "test@example.com"
  }'
```

## 📦 Deployment

### Build for Production

```bash
# Build frontend
pnpm build

# Build backend
pnpm build:server

# Start production server
pnpm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Heroku

```bash
# Create Heroku app
heroku create ideal-fit-landing

# Set environment variables
heroku config:set DATABASE_URL="your_database_url"

# Deploy
git push heroku main
```

### Deploy to Docker

```bash
# Build image
docker build -t ideal-fit-landing .

# Run container
docker run -p 3000:3000 ideal-fit-landing
```

## 🐛 Troubleshooting

### Orders Not Appearing in M1

1. Check affiliate ID: `1026218`
2. Verify product ID: `11133`
3. Check GEO setting: `ES`
4. Review server logs for errors
5. Test API endpoint directly

### Form Submission Fails

1. Check browser console for errors
2. Verify database connection
3. Check server logs
4. Validate form input
5. Check M1 API availability

### Database Connection Error

1. Verify `DATABASE_URL` in `.env`
2. Check database is running
3. Verify credentials
4. Check network connectivity
5. Review database logs

## 📚 Documentation

- **M1 Integration:** See `M1_INTEGRATION_GUIDE.md`
- **Google Sheets Setup:** See `GOOGLE_SHEETS_SETUP.md`
- **Testing Guide:** See `TESTING_GUIDE.md`
- **Project Tasks:** See `todo.md`

## 🤝 Support

### M1 Support

- Website: https://m1.top
- Email: support@m1.top
- Telegram: @m1_support

### Your Affiliate Manager

- Affiliate ID: 1026218
- Product ID: 11133
- Contact M1 support for manager assignment

## 📄 License

This project is proprietary. All rights reserved.

## 🎯 Next Steps

1. ✅ Landing page deployed
2. ✅ M1 integration configured
3. ⏳ Monitor first orders
4. ⏳ Optimize conversion rate
5. ⏳ Scale traffic
6. ⏳ Request higher commission rates

## 📞 Contact

For questions or support:

1. Check documentation files
2. Review M1 dashboard
3. Contact M1 support team
4. Review server logs

---

**Created:** October 28, 2025  
**Status:** ✅ Production Ready  
**Last Updated:** October 28, 2025
