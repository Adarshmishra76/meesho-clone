# Meesho Clone - Deployment Guide

## 🚀 Deployment Checklist

### 1. Environment Variables

Update `.env.production` with your actual backend URL:

```env
VITE_API_URL=https://your-backend-url.com/api
VITE_SITE_URL=https://meeshoindia.netlify.app
VITE_ADSENSE_CLIENT=ca-pub-3090683691757399
```

### 2. Backend Deployment

**Deploy your backend first** (MongoDB + Node.js + Express):

**Option A: Railway / Render / Heroku**
1. Push backend code to GitHub
2. Connect to Railway/Render/Heroku
3. Add environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```
4. Note the deployed backend URL

**Option B: Vercel (Serverless)**
- Use Vercel for backend API routes
- Add MongoDB connection in environment variables

### 3. Frontend Deployment (Netlify)

**Steps:**

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Environment Variables** (in Netlify dashboard):
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_SITE_URL=https://meeshoindia.netlify.app
   ```

4. **Add Redirects** - Create `public/_redirects`:
   ```
   /* /index.html 200
   ```

5. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod
   ```

### 4. SEO Assets

Add these files to `public/` folder:

1. **og-image.jpg** (1200x630px) - Open Graph image
2. **logo.png** - Site logo
3. **favicon.ico** - Browser favicon
4. **apple-touch-icon.png** (180x180px) - iOS icon

### 5. Environment-Specific URLs

**Update these files with your domain:**

1. `client/index.html`:
   - Change all `https://meeshoindia.netlify.app/` to your domain
   
2. `client/.env.production`:
   - Update `VITE_API_URL` with backend URL
   - Update `VITE_SITE_URL` with frontend URL

### 6. MongoDB Setup

**MongoDB Atlas (Recommended):**
1. Create cluster at mongodb.com
2. Whitelist all IPs (0.0.0.0/0) for serverless
3. Create database user
4. Get connection string
5. Add to backend environment variables

### 7. CORS Configuration

Update `server/server.js` CORS origins:

```javascript
app.use(cors({
    origin: ['https://meeshoindia.netlify.app', 'https://your-domain.com'],
    credentials: true
}));
```

### 8. Cookies & Authentication

**Important:** For production with different domains:

If frontend and backend are on different domains, you need to:

1. Use JWT tokens in localStorage (instead of cookies)
2. OR use same-site cookies with proper configuration
3. Update CORS to allow credentials

### 9. Build & Test

**Local Production Build:**
```bash
cd client
npm run build
npm run preview
```

Test thoroughly before deploying!

### 10. Post-Deployment

1. Test all features
2. Submit sitemap to Google Search Console
3. Test SEO with tools:
   - Google Rich Results Test
   - Facebook Sharing Debugger
   - Twitter Card Validator

---

## 📋 Quick Deploy Script

```bash
# Backend
cd server
npm install
# Set environment variables
npm start

# Frontend
cd ../client
npm install
npm run build
# Deploy to Netlify
```

---

## 🔧 Common Issues

### Issue: API calls failing
**Fix:** Check CORS, verify API_URL in environment variables

### Issue: Cookies not working
**Fix:** Ensure `withCredentials: true` and matching CORS origins

### Issue: 404 on refresh
**Fix:** Add `_redirects` file in `public/` folder

---

## 🌐 Recommended Hosting

**Frontend:** Netlify (Free tier available)  
**Backend:** Railway / Render (Free tier available)  
**Database:** MongoDB Atlas (Free tier available)

**Total Cost:** $0/month for starter traffic!

---

## ✅ Deployment Verification

After deployment, verify:
- [ ] Homepage loads correctly
- [ ] Products display
- [ ] Search works
- [ ] Cart functionality
- [ ] User login/signup
- [ ] Wishlist features
- [ ] Mobile responsiveness
- [ ] SEO meta tags (view page source)
- [ ] Open Graph preview (Facebook/LinkedIn)
- [ ] Twitter Card preview

---

## 📞 Support

If you face issues:
1. Check browser console for errors
2. Verify environment variables
3. Check CORS configuration
4. Test API endpoints manually

**Done!** Your app is now production-ready! 🎉
