# Google Sheets Integration Setup

## Overview

This landing page is configured to send form submissions to a Google Sheet. Currently, the system saves data to the local database and logs submissions. To enable full Google Sheets integration, follow these steps.

## Current Setup

The form submission flow:
1. User fills in name and phone
2. Data is validated on the client
3. Data is sent to the backend API
4. Data is saved to the local database
5. Webhook attempt is made to Google Sheets (currently logged)

## Google Sheets Integration Options

### Option 1: Google Apps Script (Recommended - No API Key Required)

This is the simplest approach and doesn't require OAuth2 setup.

#### Steps:

1. **Create a Google Sheet:**
   - Go to https://sheets.google.com
   - Create a new spreadsheet
   - Name it "Ideal Fit Submissions"
   - Add headers: `Nombre`, `Teléfono`, `Fecha`

2. **Create Google Apps Script:**
   - Open your Google Sheet
   - Click "Extensions" → "Apps Script"
   - Replace the default code with:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.name,
    data.phone,
    new Date()
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Datos guardados correctamente"
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy the Script:**
   - Click "Deploy" → "New deployment"
   - Select type: "Web app"
   - Execute as: Your account
   - Who has access: "Anyone"
   - Click "Deploy"
   - Copy the deployment URL (it will look like: `https://script.google.com/macros/d/...`)

4. **Update the Landing Page:**
   - Open `server/googleSheets.ts`
   - Update the `webhookUrl` in the `submitViaWebhook` function:
   
```typescript
const url = webhookUrl || "YOUR_DEPLOYMENT_URL_HERE";
```

5. **Test the Integration:**
   - Submit a test form
   - Check your Google Sheet for the new row

### Option 2: Google Sheets API (Advanced - Requires OAuth2)

For production use with more control:

1. **Set up Google Cloud Project:**
   - Go to https://console.cloud.google.com
   - Create a new project
   - Enable Google Sheets API
   - Create a service account
   - Download the JSON credentials file

2. **Install Google Sheets Library:**
```bash
npm install googleapis
```

3. **Update Backend Code:**
   - Create `server/googleSheetsAPI.ts` with proper authentication
   - Use the service account credentials
   - Implement proper error handling

### Option 3: Third-Party Services

Use services like Zapier, Make.com, or Integromat:

1. Create a webhook trigger in the service
2. Connect it to Google Sheets
3. Update the webhook URL in the landing page

## Testing the Integration

### Manual Test:

```bash
curl -X POST https://your-landing-page.com/api/trpc/form.submit \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "phone": "123456789"}'
```

### Using the Form:

1. Load the landing page
2. Scroll to the form section
3. Fill in test data
4. Submit the form
5. Check your Google Sheet for the new row

## Troubleshooting

### Data not appearing in Google Sheet:

1. **Check the webhook URL:**
   - Verify the URL is correct and accessible
   - Test the URL directly in a browser

2. **Check browser console:**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for error messages

3. **Check server logs:**
   - Look for error messages in the server output
   - Verify the webhook request was sent

4. **Check Google Apps Script logs:**
   - Open the Apps Script editor
   - Click "Execution log" to see any errors

### CORS Issues:

If you see CORS errors:
1. The Google Apps Script deployment must be set to "Anyone"
2. The script must return proper CORS headers
3. Consider using a backend proxy if needed

## Security Considerations

1. **Do not expose sensitive data:**
   - Google Sheets is public if shared
   - Consider using a private Google Sheet
   - Implement access controls

2. **Validate all input:**
   - The landing page validates on the client
   - The backend also validates before sending to Google Sheets
   - Never trust client-side validation alone

3. **Rate limiting:**
   - Implement rate limiting to prevent spam
   - Consider adding CAPTCHA for production

4. **Data privacy:**
   - Comply with GDPR and other privacy regulations
   - Inform users how their data will be used
   - Provide a way to delete submitted data

## Next Steps

1. Set up Google Apps Script (Option 1)
2. Test the integration with the form
3. Monitor submissions in the Google Sheet
4. Implement additional features as needed

## Support

For issues or questions:
- Check the browser console for error messages
- Review the server logs
- Test the webhook URL directly
- Verify Google Apps Script deployment settings
