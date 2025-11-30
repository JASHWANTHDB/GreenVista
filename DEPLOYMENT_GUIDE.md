# GreenVista - Deployment Guide for Vercel & Render

## Overview
This guide will help you deploy the GreenVista application to Vercel (Frontend) and Render (Backend).

---

## Backend Deployment on Render

### Step 1: Prepare Backend for Deployment

1. Create a `Procfile` in the backend directory:
```
web: node server.js
```

2. Ensure your backend `package.json` has a start script:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository and set up:
   - **Name:** `greenvista-backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`

### Step 3: Set Environment Variables on Render

In the Render dashboard, go to your web service and add these environment variables:

```
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
PORT = 5000
CLIENT_URL = https://your-frontend-url.vercel.app
NODE_ENV = production
```

### Step 4: Get Your Backend URL
After deployment, Render will give you a URL like: `https://greenvista-backend.onrender.com`

---

## Frontend Deployment on Vercel

### Step 1: Prepare Frontend for Deployment

1. Create `.env.local` in the frontend directory:
```
VITE_API_URL=https://greenvista-backend.onrender.com
```

2. Make sure your `vite.config.js` exists and is properly configured.

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Follow the prompts and select:
   - Project name: `greenvista-frontend`
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

**Option B: Using GitHub**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Set Environment Variables on Vercel

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://greenvista-backend.onrender.com`
   - Select: Production, Preview, Development

### Step 4: Deploy
Click "Deploy" and wait for the build to complete.

---

## Environment Variables Summary

### Frontend (.env.local)
```
VITE_API_URL=https://greenvista-backend.onrender.com
```

### Backend (Render Dashboard)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

---

## Important Notes

1. **CORS Configuration:**
   - Update `backend/server.js` to include your Vercel frontend URL in CORS origin

2. **MongoDB Connection:**
   - Ensure your MongoDB Atlas whitelist includes:
     - Render IP (usually 0.0.0.0/0 for Render)
     - Your local development IP

3. **JWT Secret:**
   - Use a strong, random JWT_SECRET in production
   - Generate one: `openssl rand -base64 32`

4. **Verification:**
   - Test the frontend connects to backend by checking network requests
   - Login functionality should work end-to-end

---

## Troubleshooting

### CORS Errors
Update `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

### MongoDB Connection Issues
- Whitelist Render IP in MongoDB Atlas
- Check connection string includes `authSource=admin`

### Build Failures
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node version matches (Node 16+ recommended)

### API URL Not Connecting
- Verify `VITE_API_URL` is set correctly in Vercel
- Check backend is accessible from your browser
- Ensure CORS is properly configured

---

## Local Development

### Start Backend (Local MongoDB)
```bash
cd backend
npm install
npm run dev
```

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Then visit `http://localhost:5173`

---

## Resources
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
