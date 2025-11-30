# GitHub Upload Steps

Follow these steps to upload your GreenVista project to GitHub:

## Step 1: Add All Files to Git
```powershell
cd F:\Projects\p
git add .
```

## Step 2: Create a Commit with Your Changes
```powershell
git commit -m "Add backend and frontend code with request approval, invoices, and notices features"
```

## Step 3: Push to GitHub
```powershell
git push origin main
```

## Complete Command Sequence
Run these commands in PowerShell:

```powershell
# Navigate to project directory
cd F:\Projects\p

# Add all files
git add .

# Commit changes
git commit -m "Add backend and frontend code with request approval, invoices, and notices features"

# Push to GitHub
git push origin main
```

## What's Being Uploaded
Your changes include:

### Backend Updates (`backend/`)
- ✅ Fixed service request routes (moved `/my` before `/`)
- ✅ Added Staff model import to requestController.js
- ✅ Updated ServiceRequest status enum (pending, approved, rejected, etc.)

### Frontend Updates (`frontend/`)
- ✅ AdminDashboard with pending requests approval/rejection
- ✅ Requests page with admin approval buttons
- ✅ Invoices page (rolled back payment interface)
- ✅ Support for both "open" and "pending" status requests

## Troubleshooting

If you get an authentication error:
```powershell
# Configure git credentials if needed
git config --global user.name "Your Name"
git config --global user.email "your.email@github.com"
```

If the push is rejected:
```powershell
# Try with force if needed (use with caution)
git push -u origin main
```

## Verify Upload
After pushing, verify on GitHub:
1. Go to https://github.com/JASHWANTHDB/GreenVista
2. Check that your files are visible in the main branch
3. Verify the commit message appears in the commit history
