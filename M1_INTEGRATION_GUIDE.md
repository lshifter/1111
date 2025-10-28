# M1 Affiliate Program Integration Guide

## Overview

This landing page is fully integrated with the **M1 CPA Network** affiliate program. All orders submitted through the form are automatically sent to M1 for tracking and commission processing.

## Integration Details

### Your Affiliate Information

| Parameter | Value |
|-----------|-------|
| **Affiliate ID** | 1026218 |
| **GEO** | ES (Spain) |
| **Product ID** | 11133 |
| **Product Name** | Ideal Fit |
| **Product Price** | 29€ |

### How It Works

1. **Customer fills form** → Name, Phone, Email (optional)
2. **Form validation** → Client-side and server-side checks
3. **Data submission** → Sent to M1 API endpoint
4. **Order tracking** → M1 tracks the lead for commission
5. **Database storage** → Local backup + Google Sheets
6. **Confirmation** → Customer receives success message

## Technical Implementation

### Backend Integration

The integration is handled in `server/m1Affiliate.ts`:

```typescript
// Submit order to M1
const m1Result = await submitOrderToM1({
  name: input.name,
  phone: input.phone,
  email: input.email,
  geo: "ES",
  source: "landing_page",
});
```

### API Endpoints

The system attempts to submit orders to M1 using two methods:

#### Method 1: Direct API (Primary)
```
POST https://m1.top/api/orders
```

**Payload:**
```json
{
  "affiliate_id": 1026218,
  "product_id": 11133,
  "geo": "ES",
  "customer_name": "John Doe",
  "customer_phone": "+34612345678",
  "customer_email": "john@example.com",
  "source": "landing_page",
  "timestamp": "2025-10-28T07:00:00Z",
  "utm_source": "ideal_fit_landing",
  "utm_medium": "direct",
  "utm_campaign": "spain_offer"
}
```

#### Method 2: Webhook (Fallback)
```
POST https://m1.top/webhook/order
```

Same payload as Method 1.

### Response Handling

**Success Response:**
```json
{
  "success": true,
  "orderId": "M1-12345678",
  "message": "Pedido enviado a M1 correctamente"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error al enviar el pedido a M1",
  "error": "Connection timeout"
}
```

## Configuration

### Environment Variables

Add these to your `.env` file (optional):

```env
# M1 Affiliate Configuration
M1_AFFILIATE_ID=1026218
M1_PRODUCT_ID=11133
M1_GEO=ES
M1_WEBHOOK_URL=https://m1.top/webhook/order
```

### Modifying Affiliate Details

To change your affiliate information:

1. Open `server/m1Affiliate.ts`
2. Update the `M1_CONFIG` object:

```typescript
const M1_CONFIG = {
  affiliateId: YOUR_NEW_ID,
  productId: YOUR_PRODUCT_ID,
  geo: "ES", // Change if needed
  apiEndpoint: "https://m1.top/api/orders",
  webhookEndpoint: process.env.M1_WEBHOOK_URL || "https://m1.top/webhook/order",
};
```

3. Restart the development server

## Testing the Integration

### Manual Test via cURL

```bash
curl -X POST http://localhost:3000/api/trpc/form.submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "123456789",
    "email": "test@example.com"
  }'
```

### Expected Response

```json
{
  "success": true,
  "message": "Tu pedido ha sido enviado correctamente",
  "m1Status": true
}
```

### Browser Testing

1. Load the landing page
2. Click "¿Quiero mi Ideal Fit ahora!" button
3. Fill in the form with test data
4. Click "ENVIAR MI PEDIDO Y APROVECHAR LA OFERTA"
5. Check browser console for success message
6. Verify order appears in M1 dashboard

## Tracking & Monitoring

### Server Logs

The system logs all M1 interactions:

```
[M1 API] Order submitted successfully: { orderId: "M1-12345678" }
[M1 Webhook] Order submitted successfully
[M1 Integration] Error submitting order: Connection timeout
```

### M1 Dashboard

1. Log in to your M1 account at https://m1.top
2. Navigate to "Мои офферы" (My Offers)
3. Select product 11133
4. View real-time statistics:
   - Total leads
   - Confirmed orders
   - Commission earned
   - Conversion rate

### Database Backup

All orders are also stored locally in the database for backup:

```sql
SELECT * FROM form_submissions WHERE created_at > NOW() - INTERVAL 24 HOUR;
```

## Commission Structure

According to M1 terms:

| Metric | Details |
|--------|---------|
| **Payout** | Per confirmed lead |
| **Currency** | EUR / RUB (depending on region) |
| **Minimum Payout** | 1000 RUB (~€12) |
| **Payment Schedule** | Daily or on hold for verification |
| **Verification** | M1 call center verifies leads |

## Troubleshooting

### Orders Not Appearing in M1

**Symptoms:** Form submits successfully locally but no orders in M1 dashboard

**Solutions:**
1. Verify affiliate ID is correct (1026218)
2. Check product ID matches (11133)
3. Verify GEO is set to "ES"
4. Check server logs for error messages
5. Test API endpoint directly with cURL
6. Contact M1 support with order IDs

### API Connection Errors

**Symptoms:** "Error al enviar el pedido a M1"

**Solutions:**
1. Check internet connection
2. Verify M1 API is online: `curl https://m1.top/api/orders`
3. Check firewall/proxy settings
4. Try webhook endpoint instead
5. Check server logs for detailed error

### Webhook Timeout

**Symptoms:** Form takes too long to submit

**Solutions:**
1. Increase webhook timeout in `server/m1Affiliate.ts`
2. Check M1 server status
3. Try again after a few minutes
4. Contact M1 support

## Advanced Configuration

### Custom Tracking Parameters

Modify UTM parameters in `server/m1Affiliate.ts`:

```typescript
utm_source: "ideal_fit_landing",      // Change as needed
utm_medium: "direct",                 // or "cpc", "social", etc.
utm_campaign: "spain_offer",          // Your campaign name
```

### Conversion Tracking Pixel

To track conversions on M1 side, add this to the success page:

```html
<img src="https://m1.top/pixel?affiliate_id=1026218&order_id={ORDER_ID}" width="1" height="1" />
```

### Custom Webhooks

To send data to additional services:

1. Create a new function in `server/m1Affiliate.ts`
2. Call it after M1 submission
3. Example: Send to Zapier, Make.com, or custom API

## Security Considerations

### Data Protection

- All phone numbers are validated before submission
- Emails are optional to protect privacy
- No credit card data is collected
- HTTPS is required for production

### Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
// Add to your middleware
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
});

app.post("/api/trpc/form.submit", limiter, ...);
```

### GDPR Compliance

- Inform users how their data will be used
- Provide privacy policy link
- Allow data deletion requests
- Store consent timestamp

## Support & Resources

### M1 Documentation

- Main site: https://m1.top
- API docs: https://m1.top/documents/7
- Support email: support@m1.top
- Telegram: @m1_support

### Your Account

- Affiliate ID: **1026218**
- Product ID: **11133**
- GEO: **ES**

### Next Steps

1. ✅ Landing page is live and integrated
2. ⏳ Monitor orders in M1 dashboard
3. ⏳ Optimize conversion rate
4. ⏳ Scale traffic to increase commissions
5. ⏳ Request higher commission rates after performance

## FAQ

**Q: How long does it take for orders to appear in M1?**
A: Usually 5-15 minutes. M1 verifies leads with their call center.

**Q: What if a customer doesn't answer the phone?**
A: The lead is marked as "pending" for 24-48 hours. If not confirmed, it may not count toward commission.

**Q: Can I change the product ID?**
A: Yes, but you need a new product approved by M1 first. Contact your M1 manager.

**Q: How do I withdraw my earnings?**
A: Log in to M1 dashboard → Wallet → Request Withdrawal (minimum 1000 RUB)

**Q: Can I use this landing page for other products?**
A: Yes, modify the product ID and affiliate details in `server/m1Affiliate.ts`

## Changelog

| Date | Change |
|------|--------|
| 2025-10-28 | Initial M1 integration |
| - | Added webhook fallback |
| - | Implemented validation |
| - | Added error handling |

---

**Last Updated:** October 28, 2025  
**Status:** ✅ Active and Tested  
**Support:** Contact M1 support or your affiliate manager
