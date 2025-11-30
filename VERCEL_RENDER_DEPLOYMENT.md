# GreenVista Deployment Guide - Vercel & Render

This guide walks you through deploying GreenVista to production on Vercel (frontend) and Render (backend).

## Prerequisites

Before starting, ensure you have:
- GitHub account with your GreenVista repository pushed
- MongoDB Atlas account (for database)
- Vercel account (linked to GitHub)
- Render account (linked to GitHub)

---

## Part 1: MongoDB Atlas Setup (Required First)

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create an account
3. Click **"Create a Deployment"** → Select **Free** tier
4. Choose region closest to you
5. Click **"Create Deployment"**
6. Wait for cluster to be created (5-10 minutes)

### Step 2: Create Database User

1. Go to **Database Access** section
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Create username and password (save these!)
5. Set **User Permissions** to **"Atlas Admin"**
6. Click **"Add User"**

### Step 3: Get Connection String

1. Go to **Database** section
2. Click **"Connect"** button on your cluster
3. Select **"Drivers"** tab
4. Choose **Node.js** driver
5. Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Replace `<username>` and `<password>` with your database user credentials
7. Replace `myFirstDatabase` with `greenvista` (or your desired DB name)

**Keep this connection string safe - you'll need it for Render.**

---

## Part 2: Deploy Backend to Render

### Step 1: Prepare Environment Variables

You'll need these values ready:
- **MONGODB_URI**: Connection string from MongoDB Atlas (from Part 1)
- **JWT_SECRET**: Create a strong secret (e.g., `your-super-secret-jwt-key-min-32-chars`)
- **PORT**: `5000`
- **CLIENT_URL**: Will update later after frontend deployment
- **NODE_ENV**: `production`

### Step 2: Create Render Web Service

1. Go to [Render](https://render.com)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select your **GreenVista** repository
5. Click **"Connect"**

### Step 3: Configure Render Deployment

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `greenvista-backend` (or your preferred name) |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `cd backend && npm start` |
| **Root Directory** | (leave empty or `backend`) |

### Step 4: Add Environment Variables

1. Scroll down to **Environment** section
2. Click **"Add Environment Variable"** for each:

```
MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/greenvista?retryWrites=true&w=majority

JWT_SECRET = your-super-secret-jwt-key-min-32-characters-long

PORT = 5000

CLIENT_URL = http://localhost:5173

NODE_ENV = production
```

3. Click **"Create Web Service"**
4. Wait for deployment (5-10 minutes)

### Step 5: Get Backend URL

Once deployed:
1. Your backend URL will be shown at the top (e.g., `https://greenvista-backend.onrender.com`)
2. **Save this URL** - you'll need it for frontend deployment

### Step 6: Update Backend Environment Variable

1. Go to your Render service **Settings**
2. Find **CLIENT_URL** environment variable
3. Update it to: `https://your-vercel-frontend-url.vercel.app` (update after frontend deployment)
4. Click **"Save"**

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Connect Repository to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Find and select your **GreenVista** repository
5. Click **"Import"**

### Step 2: Configure Vercel Project

1. **Project Name**: `greenvista-frontend` (or preferred name)
2. **Framework Preset**: Vite
3. **Root Directory**: `frontend/` ← **Important: Select this!**

### Step 3: Add Environment Variables

1. Before clicking **"Deploy"**, scroll to **Environment Variables** section
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://greenvista-backend.onrender.com` (your Render backend URL from Part 2)

3. Click **"Add"**

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (3-5 minutes)
3. You'll get your frontend URL (e.g., `https://greenvista-frontend.vercel.app`)

### Step 5: Test Frontend

1. Click the deployment URL
2. Test login with your credentials
3. Verify API calls are working (check browser console for errors)

---

## Part 4: Final Configuration

### Update Backend Client URL

1. Go back to [Render Dashboard](https://dashboard.render.com)
2. Select your **greenvista-backend** service
3. Go to **Settings** → **Environment**
4. Update **CLIENT_URL** to your Vercel frontend URL
5. Click **"Save"** and Render will auto-redeploy

### Verify Everything Works

1. Visit your Vercel frontend URL
2. Try logging in with admin/owner credentials
3. Test creating/viewing service requests
4. Check that images and data load correctly
5. Open browser DevTools Console to check for errors

---

## Troubleshooting

### Frontend Shows "Cannot Connect to API"

**Solution**: 
- Verify `VITE_API_URL` is correct in Vercel environment variables
- Check that Render backend is actually running (visit backend URL directly)
- Look for CORS errors in browser console

### Backend Returns 401 Unauthorized

**Solution**:
- Verify JWT_SECRET is the same on backend and frontend
- Check that Bearer token is being sent in requests
- Look at Render logs for more details

### Build Fails on Vercel

**Solution**:
- Check that `vercel.json` exists in root directory
- Verify `Root Directory` is set to `frontend/`
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `frontend/package.json`

### Database Connection Failed

**Solution**:
- Verify MongoDB URI includes correct username/password
- Check that database user exists in MongoDB Atlas
- Verify IP whitelist allows all IPs (0.0.0.0/0) in MongoDB Atlas Security tab
- Test connection string locally first

### Service Not Responding

**Solution**:
- Check Render service is actually running (not suspended)
- Verify all environment variables are set correctly
- Check service logs in Render dashboard
- Ensure `NODE_ENV=production` is set

---

## Monitoring & Logs

### View Render Backend Logs

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click your **greenvista-backend** service
3. Click **"Logs"** tab
4. Check for errors

### View Vercel Frontend Logs

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project
3. Go to **Deployments** tab
4. Click latest deployment
5. View **Build Logs** or **Runtime Logs**

---

## Database Backups

### Backup MongoDB Data

1. Go to MongoDB Atlas dashboard
2. Click your cluster
3. Go to **Backup** section
4. Create manual backup before major changes
5. Download backup if needed

---

## Success Indicators

✅ Frontend loads without errors  
✅ Login page appears  
✅ Can log in with valid credentials  
✅ Dashboard loads with data  
✅ Can view service requests  
✅ Can create new service requests  
✅ Admin can approve/reject requests  
✅ No console errors in browser  
✅ API calls complete within 1-2 seconds  

---

## Next Steps

After successful deployment:
1. Set up custom domain (optional) - configure in Vercel/Render settings
2. Enable automatic deployments from main branch
3. Set up monitoring alerts
4. Regular database backups
5. Monitor usage and scale if needed

---

## Support

If you encounter issues:
1. Check Render logs: Dashboard → Service → Logs
2. Check Vercel logs: Dashboard → Project → Deployments
3. Check browser DevTools Console for frontend errors
4. Verify all environment variables are set
5. Test backend URL directly in browser to check API health

