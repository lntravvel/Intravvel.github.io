# Intravvel - Backend + Dashboard

Full-stack travel agency management system with Express backend and React dashboard, optimized for Vercel deployment.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## ✨ Features

- 🔐 **JWT Authentication** - Secure admin login
- 📊 **Admin Dashboard** - React + TypeScript + Vite
- 🗄️ **MongoDB Integration** - Mongoose ODM with connection caching
- 🤖 **AI Content Generation** - Google Gemini API integration
- 📧 **Email Notifications** - Nodemailer for contact forms
- 📦 **Service Management** - Full CRUD operations
- 💬 **Message Inbox** - Customer inquiry management
- 📝 **Content Editor** - Manage site sections dynamically
- 🎨 **Modern UI** - Tailwind CSS + Recharts + Lucide icons

## 📁 Project Structure

```
.
├── api/                    # Backend serverless functions
│   ├── index.ts           # Main API routes
│   ├── models/            # Mongoose schemas
│   ├── middleware/        # Auth middleware
│   └── utils/             # DB connection, AI utils
├── pages/                 # Dashboard pages
│   ├── Login.tsx
│   ├── Services.tsx
│   ├── Messages.tsx
│   ├── AIGenerator.tsx
│   └── ContentEditor.tsx
├── components/            # UI components
├── dist/                  # Build output (auto-generated)
├── vercel.json           # Vercel deployment config
├── vite.config.ts        # Vite configuration
├── DEPLOYMENT.md         # Detailed deployment guide
└── .env.example          # Environment variables template
```

## 🛠️ Tech Stack

### Backend
- Express.js (Serverless Functions)
- MongoDB + Mongoose
- JWT + bcryptjs
- Google Gemini AI
- Nodemailer

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Recharts
- Lucide Icons

## 🏃‍♂️ Local Development

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key (optional)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd intravvel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Frontend: http://localhost:5173
   
   For local backend testing, you'll need to run a separate Express server or use Vercel CLI:
   ```bash
   npm install -g vercel
   vercel dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- MongoDB Atlas setup
- Google Gemini API configuration
- Gmail SMTP setup
- Vercel deployment steps
- Environment variables guide
- Troubleshooting tips

### Quick Vercel Deploy

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## 🔑 Default Credentials

After deployment, initialize the admin user:

Visit: `https://your-app.vercel.app/api/v1/admin-init`

Default credentials:
- Email: `admin@intravvel.com`
- Password: `admin123`

**⚠️ Change these credentials immediately after first login!**

## 📡 API Endpoints

### Public Routes
- `GET /api/v1/services` - List all services
- `GET /api/v1/services/:id` - Get service by ID
- `GET /api/v1/site-content` - Get site content
- `POST /api/v1/contact` - Submit contact form

### Protected Routes (Requires JWT)
- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/services` - Create service
- `PUT /api/v1/services/:id` - Update service
- `DELETE /api/v1/services/:id` - Delete service
- `GET /api/v1/messages` - List messages
- `DELETE /api/v1/messages/:id` - Delete message
- `PUT /api/v1/site-content/:section` - Update content
- `POST /api/v1/ai/generate` - Generate AI content
- `POST /api/v1/upload` - Upload file (needs cloud storage)

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | ✅ Yes |
| `JWT_SECRET` | JWT signing secret | ✅ Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Optional |
| `EMAIL_USER` | Gmail address for notifications | Optional |
| `EMAIL_PASS` | Gmail app password | Optional |
| `ADMIN_EMAIL` | Admin notification email | Optional |
| `ALLOWED_ORIGINS` | CORS allowed domains | Optional |

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 📞 Support

For deployment issues, see [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section.

---

**Built with ❤️ for Intravvel Travel Agency**