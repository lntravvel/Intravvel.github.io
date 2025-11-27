# Intravvel - Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying to Vercel, ensure you have:

- ✅ GitHub account
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ MongoDB Atlas account (free tier available)
- ✅ Google Gemini API key (from https://aistudio.google.com)
- ✅ Gmail account with App Password (for email notifications)

---

## 🗄️ MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new cluster (select Free Tier)

2. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Grant "Read and write to any database" role

3. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Vercel serverless functions

4. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/intravvel?retryWrites=true&w=majority`

---

## 🤖 Google Gemini AI Setup

1. **Get API Key**
   - Visit https://aistudio.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the API key (starts with `AIza...`)

2. **Important Notes**
   - Free tier includes 60 requests per minute
   - Sufficient for testing and small-scale production
   - Keep your API key secret

---

## 📧 Gmail SMTP Setup

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled

2. **Create App Password**
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Intravvel Backend"
   - Copy the 16-character password (no spaces)

3. **Use in Environment Variables**
   - EMAIL_USER: your full Gmail address
   - EMAIL_PASS: the 16-character app password

---

## 🚀 Vercel Deployment Steps

### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Restructured for Vercel deployment"

# Add remote repository
git remote add origin https://github.com/your-username/intravvel.git

# Push to GitHub
git push -u origin main
```

### 2. Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGO_URI` | Your MongoDB connection string | From MongoDB Atlas |
| `JWT_SECRET` | Random secure string | Generate with: `openssl rand -base64 32` |
| `GEMINI_API_KEY` | Your Gemini API key | From Google AI Studio |
| `EMAIL_USER` | Your Gmail address | e.g., `contact@yourdomain.com` |
| `EMAIL_PASS` | Gmail App Password | 16-character password |
| `ADMIN_EMAIL` | Admin notification email | Where contact forms go |
| `ALLOWED_ORIGINS` | Your domain | e.g., `https://intravvel.vercel.app` |

**Important**: Set all variables for "Production", "Preview", and "Development" environments.

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Visit your deployed site at `https://your-project.vercel.app`

---

## 🔧 Post-Deployment Configuration

### Initialize Admin User

1. Visit: `https://your-project.vercel.app/api/v1/admin-init`
2. You should see a JSON response with admin credentials
3. **Default credentials:**
   - Email: `admin@intravvel.com`
   - Password: `admin123`
4. **⚠️ IMPORTANT**: Change these credentials immediately after first login

### Test API Endpoints

Test these endpoints to ensure everything works:

- `GET /api/v1/services` - Should return empty array `[]`
- `GET /api/v1/site-content` - Should return empty array `[]`
- `POST /api/v1/auth/login` - Login with admin credentials

### Access Dashboard

1. Go to `https://your-project.vercel.app`
2. Login with admin credentials
3. You should see the dashboard

---

## 📤 File Upload Configuration (IMPORTANT)

The current file upload endpoint returns placeholder URLs since Vercel Serverless Functions don't support persistent file storage.

### Option 1: Vercel Blob (Recommended)

```bash
npm install @vercel/blob
```

Update `api/index.ts`:

```typescript
import { put } from '@vercel/blob';

app.post('/api/v1/upload', authenticateToken as any, upload.single('image') as any, async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const blob = await put(`uploads/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
    access: 'public',
  });
  
  res.json({ url: blob.url });
});
```

Add to Vercel environment variables:
- `BLOB_READ_WRITE_TOKEN` (auto-generated by Vercel when you use Blob)

### Option 2: Cloudinary

```bash
npm install cloudinary
```

1. Sign up at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret
3. Add to environment variables
4. Update upload endpoint to use Cloudinary SDK

### Option 3: AWS S3

Use `aws-sdk` or `@aws-sdk/client-s3` and configure with your S3 credentials.

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `Cannot find module '@google/genai'`
- ✅ **Fixed**: Make sure you're using `@google/generative-ai` (already updated in package.json)

**Error**: `Module not found: Can't resolve ...`
- Check that all imports use relative paths (e.g., `./models/User` not `../backend/models/User`)
- Run `npm install` locally to verify dependencies

### Runtime Errors

**Error**: `MongooseError: Operation buffering timed out`
- Check `MONGO_URI` is correct in Vercel environment variables
- Verify MongoDB Atlas allows connections from `0.0.0.0/0`

**Error**: `GEMINI_API_KEY is not defined`
- Add `GEMINI_API_KEY` to Vercel environment variables
- Redeploy after adding variables

**Error**: `CORS policy blocked request`
- Update `ALLOWED_ORIGINS` to include your Vercel domain
- Format: `https://your-project.vercel.app` (no trailing slash)

### API Returns 404

- Verify `vercel.json` routes are correct
- Check function logs in Vercel Dashboard → Deployments → View Function Logs

### Email Not Sending

- Verify Gmail App Password is correct (16 characters, no spaces)
- Check `EMAIL_USER` and `EMAIL_PASS` in environment variables
- Look for errors in Vercel function logs

---

## 📊 Monitoring & Logs

### View Function Logs

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Click on a deployment
5. Click "View Function Logs"

### Monitor Performance

- Go to "Analytics" tab in Vercel Dashboard
- View request counts, response times, and errors

---

## 🔄 Updating Your Deployment

After making code changes:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel automatically redeploys on every push to your main branch.

---

## 🎯 Production Best Practices

1. **Security**
   - ✅ Change default admin credentials
   - ✅ Use strong JWT_SECRET (32+ characters)
   - ✅ Keep API keys secret (never commit to git)
   - ✅ Enable Vercel's Firewall if available

2. **Performance**
   - ✅ MongoDB connection caching is already implemented
   - ✅ Use Vercel's Edge Network (automatic)
   - ✅ Monitor function execution times

3. **Reliability**
   - ✅ Set up MongoDB Atlas backups
   - ✅ Use Vercel's Preview deployments for testing
   - ✅ Monitor error rates in Vercel Analytics

4. **Scalability**
   - ✅ Vercel automatically scales serverless functions
   - ✅ Consider MongoDB Atlas cluster upgrades for high traffic
   - ✅ Implement rate limiting if needed

---

## 📞 Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://www.mongodb.com/docs/atlas/
- **Google Gemini API**: https://ai.google.dev/docs
- **Vite Documentation**: https://vitejs.dev/

---

## ✅ Deployment Checklist

Use this checklist to ensure everything is configured:

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with read/write permissions
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string obtained
- [ ] Google Gemini API key generated
- [ ] Gmail App Password created
- [ ] GitHub repository created and code pushed
- [ ] Vercel project imported
- [ ] All environment variables added to Vercel
- [ ] Project deployed successfully
- [ ] Admin user initialized via `/api/v1/admin-init`
- [ ] Dashboard login tested
- [ ] API endpoints tested
- [ ] Default admin password changed
- [ ] File upload solution configured (if needed)

**Congratulations! Your Intravvel backend and dashboard are now live! 🎉**
