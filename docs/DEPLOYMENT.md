# Production Deployment Guide: AwaazPath

This document outlines the deployment procedures for AwaazPath on modern cloud hosting platforms like **Vercel**, **Railway**, **Render**, or a standalone **Ubuntu/Linux Node.js server**.

---

## 1. Deploying to Vercel (Recommended)

Next.js is maintained by Vercel, making it the most seamless production environment for AwaazPath.

### Step-by-Step Vercel Deployment:
1. Push your repository to GitHub, GitLab, or Bitbucket:
   ```bash
   git init
   git add .
   git commit -m "feat: complete AwaazPath production build"
   git remote add origin https://github.com/your-username/AwaazPath.git
   git push -u origin main
   ```
2. Navigate to [https://vercel.com/new](https://vercel.com/new) and import your repository.
3. In **Project Settings > Environment Variables**, configure the following variables:
   - `GNANI_API_KEY`: Your live Gnani AI API key
   - `GNANI_STT_MODEL`: `prisma-v3.0`
   - `GNANI_TTS_MODEL`: `timbre-v3.0`
4. Click **Deploy**. Vercel will automatically run:
   - `npm install`
   - `npm run build`
5. Your production deployment will be live at `https://your-project.vercel.app` with global CDN edge routing and HTTPS automatically enabled.

---

## 2. Deploying on a Standalone Node.js Server (e.g., Ubuntu VPS)

### Requirements:
- Ubuntu 22.04 LTS or newer
- Node.js 20 LTS or Node.js 22
- PM2 Process Manager
- Nginx for SSL reverse proxy

### Commands:
```bash
# 1. Clone repository
git clone https://github.com/your-username/AwaazPath.git /var/www/awaazpath
cd /var/www/awaazpath

# 2. Install dependencies & build
npm install --production=false
npm run build

# 3. Setup production environment file
cp .env.example .env
nano .env # Paste your GNANI_API_KEY

# 4. Start process with PM2
npm install -g pm2
pm2 start npm --name "awaazpath" -- start
pm2 save
pm2 startup
```

### Nginx Reverse Proxy Configuration (`/etc/nginx/sites-available/awaazpath`):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M; # Necessary for audio uploads
    }
}
```

Enable SSL using Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 3. Environment Variable Security Best Practices

1. **Never Commit Secrets:** The `.gitignore` file includes `.env*` to prevent accidental commits of keys.
2. **Server-Side Only:** Next.js prefixes client-accessible variables with `NEXT_PUBLIC_`. Note that `GNANI_API_KEY` intentionally does **not** have this prefix, ensuring it is never exposed in browser bundles.
3. **Credit Conservation:** Keep `Credit Saver Mode` enabled so that users cannot trigger unexpected high-volume API requests against your 5,000 credit allocation.
