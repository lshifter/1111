# Testing Guide for Ideal Fit Landing Page

## Functionality Tests

### 1. Video Popup Display
- **Expected Behavior:** Popup appears 3 seconds after page loads
- **Test Steps:**
  1. Load the landing page
  2. Wait 3 seconds
  3. Verify popup appears with product image and price
  4. Click "Continuar viendo" to close popup
  5. Verify popup closes and video continues playing

### 2. Form Scrolling
- **Expected Behavior:** Clicking "Comprar ahora" button scrolls to form
- **Test Steps:**
  1. Click "¿Quiero mi Ideal Fit ahora!" button below video
  2. Verify page smoothly scrolls to form section
  3. Click "Comprar ahora" in popup
  4. Verify page scrolls to form section and popup closes

### 3. Form Submission
- **Expected Behavior:** Form validates input and submits data
- **Test Steps:**
  1. Fill in name field with valid text (min 2 characters)
  2. Fill in phone field with valid phone number (min 9 digits)
  3. Click "ENVIAR MI PEDIDO Y APROVECHAR LA OFERTA"
  4. Verify loading state appears
  5. Verify success message appears
  6. Verify form fields are cleared

### 4. Form Validation
- **Expected Behavior:** Form shows error messages for invalid input
- **Test Steps:**
  1. Try to submit with empty name field
  2. Verify error message appears
  3. Try to submit with name less than 2 characters
  4. Verify error message appears
  5. Try to submit with phone number less than 9 digits
  6. Verify error message appears

### 5. Responsive Design
- **Expected Behavior:** Layout adapts to different screen sizes
- **Test Steps:**
  1. Test on desktop (1920x1080)
  2. Test on tablet (768x1024)
  3. Test on mobile (375x667)
  4. Verify all elements are readable and properly aligned
  5. Verify buttons are clickable and properly sized

### 6. Spanish Language
- **Expected Behavior:** All text is in Spanish and grammatically correct
- **Test Steps:**
  1. Review all headlines and labels
  2. Verify no English text appears
  3. Verify special characters (ñ, á, é, í, ó, ú) display correctly
  4. Check form labels and buttons

## Database Tests

### 1. Form Submission Storage
- **Expected Behavior:** Form data is saved to database
- **Test Steps:**
  1. Submit form with test data
  2. Check database for new record
  3. Verify name and phone are correctly stored
  4. Verify timestamp is recorded

### 2. Google Sheets Integration
- **Expected Behavior:** Form data is sent to Google Sheets
- **Test Steps:**
  1. Submit form with test data
  2. Check Google Sheets for new row
  3. Verify data matches submitted form
  4. Verify timestamp is recorded

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Performance Tests

- [ ] Page load time < 3 seconds
- [ ] Video loads without buffering
- [ ] Form submission completes within 2 seconds
- [ ] No console errors
- [ ] No memory leaks

## Accessibility Tests

- [ ] All form fields are properly labeled
- [ ] Buttons have clear labels
- [ ] Color contrast meets WCAG standards
- [ ] Page is navigable with keyboard only
- [ ] Screen reader compatible

## SEO Tests

- [ ] Page title is descriptive
- [ ] Meta description is present
- [ ] H1 tag is present and descriptive
- [ ] Images have alt text
- [ ] Links have descriptive text

## Test Results

| Test | Status | Notes |
|------|--------|-------|
| Video Popup | ✓ Pass | Appears after 3 seconds |
| Form Scrolling | ✓ Pass | Smooth scroll working |
| Form Submission | ⏳ Pending | Needs Google Sheets setup |
| Form Validation | ✓ Pass | Error messages display |
| Responsive Design | ✓ Pass | All breakpoints working |
| Spanish Language | ✓ Pass | All text in Spanish |
| Database Storage | ⏳ Pending | Needs testing with real data |
| Google Sheets | ⏳ Pending | Needs API setup |
