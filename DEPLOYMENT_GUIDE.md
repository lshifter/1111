# Deployment Guide

Complete guide for deploying the Ideal Fit landing page to production.

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] M1 integration configured with correct IDs
- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] SSL certificate obtained
- [ ] Domain name configured
- [ ] Backup strategy in place
- [ ] Monitoring setup completed

## Production Environment Setup

### 1. Server Requirements

**Minimum:**
- 2 CPU cores
- 2GB RAM
- 20GB storage
- Ubuntu 22.04 LTS

**Recommended:**
- 4+ CPU cores
- 4GB+ RAM
- 50GB+ SSD storage
- Ubuntu 22.04 LTS or CentOS 8

### 2. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx
sudo apt install -y nginx

# Install SSL (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
```

### 3. Database Setup

```bash
# Start MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# Create database
mysql -u root -p << EOF
CREATE DATABASE ideal_fit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ideal_fit'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON ideal_fit.* TO 'ideal_fit'@'localhost';
FLUSH PRIVILEGES;
EOF

# Verify connection
mysql -u ideal_fit -p ideal_fit -e "SELECT 1;"
```

### 4. Application Setup

```bash
# Clone repository
cd /var/www
git clone https://github.com/YOUR_USERNAME/ideal-fit-landing.git
cd ideal-fit-landing

# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Edit .env with production values
nano .env
```

### 5. Environment Variables

```env
# Database
DATABASE_URL="mysql://ideal_fit:password@localhost:3306/ideal_fit"

# Node environment
NODE_ENV="production"
PORT=3000

# OAuth (from Manus platform)
JWT_SECRET="your_production_jwt_secret"
VITE_APP_ID="your_production_app_id"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://oauth.manus.im"

# M1 Affiliate
M1_AFFILIATE_ID=1026218
M1_PRODUCT_ID=11133
M1_GEO=ES
M1_WEBHOOK_URL="https://m1.top/webhook/order"

# Google Sheets (optional)
GOOGLE_SHEETS_WEBHOOK_URL="your_webhook_url"

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT="your_analytics_endpoint"
VITE_ANALYTICS_WEBSITE_ID="your_website_id"
```

### 6. Build Application

```bash
# Push database migrations
pnpm db:push

# Build frontend
pnpm build

# Verify build
ls -la dist/
```

## Nginx Configuration

### Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/ideal-fit-landing
```

```nginx
upstream ideal_fit_backend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;
    gzip_min_length 1000;

    # Proxy settings
    location / {
        proxy_pass http://ideal_fit_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Disable access to sensitive files
    location ~ /\. {
        deny all;
    }

    location ~ ~$ {
        deny all;
    }
}
```

### Enable Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/ideal-fit-landing \
           /etc/nginx/sites-enabled/ideal-fit-landing

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## SSL Certificate Setup

```bash
# Generate SSL certificate
sudo certbot certonly --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal
sudo certbot renew --dry-run
```

## Process Manager Setup (PM2)

### Install PM2

```bash
npm install -g pm2
```

### Create PM2 Config

```bash
cat > /var/www/ideal-fit-landing/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'ideal-fit-landing',
    script: './dist/server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    ignore_watch: ['node_modules', 'dist'],
  }]
};
EOF
```

### Start Application

```bash
cd /var/www/ideal-fit-landing

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save

# Setup auto-start on reboot
pm2 startup
```

### Monitor Application

```bash
# View logs
pm2 logs ideal-fit-landing

# View status
pm2 status

# View detailed info
pm2 info ideal-fit-landing

# Restart
pm2 restart ideal-fit-landing

# Stop
pm2 stop ideal-fit-landing

# Delete
pm2 delete ideal-fit-landing
```

## Database Backups

### Automated Daily Backup

```bash
# Create backup script
cat > /usr/local/bin/backup-ideal-fit.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/backups/ideal-fit"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
DB_NAME="ideal_fit"
DB_USER="ideal_fit"

mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME | gzip > $BACKUP_DIR/ideal_fit_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "ideal_fit_*.sql.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_DIR/ideal_fit_$DATE.sql.gz"
EOF

chmod +x /usr/local/bin/backup-ideal-fit.sh
```

### Setup Cron Job

```bash
# Edit crontab
sudo crontab -e

# Add daily backup at 2 AM
0 2 * * * /usr/local/bin/backup-ideal-fit.sh >> /var/log/ideal-fit-backup.log 2>&1
```

## Monitoring & Logging

### Application Logs

```bash
# View real-time logs
pm2 logs ideal-fit-landing

# View error logs
tail -f /var/www/ideal-fit-landing/logs/err.log

# View access logs
tail -f /var/log/nginx/access.log
```

### System Monitoring

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Monitor resources
htop

# Monitor disk I/O
iotop

# Monitor network
nethogs
```

### Setup Uptime Monitoring

```bash
# Install Uptime Kuma or similar
docker run -d --restart always -p 3001:3001 louislam/uptime-kuma:1

# Add monitoring URL
# http://your-domain.com
```

## Performance Optimization

### Enable Caching

```bash
# Redis installation
sudo apt install -y redis-server

# Start Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### CDN Setup

1. Sign up for Cloudflare (https://cloudflare.com)
2. Add your domain
3. Update nameservers
4. Enable caching rules
5. Setup page rules for API

### Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX idx_form_submissions_phone ON form_submissions(phone);

-- Analyze tables
ANALYZE TABLE form_submissions;

-- Check table status
SHOW TABLE STATUS FROM ideal_fit;
```

## Security Hardening

### Firewall Setup

```bash
# Install UFW
sudo apt install -y ufw

# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Deny all other
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Check status
sudo ufw status
```

### Fail2Ban Setup

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Start service
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
```

### Rate Limiting

```bash
# Add to Nginx config
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=5r/s;

location / {
    limit_req zone=general burst=20 nodelay;
    proxy_pass http://ideal_fit_backend;
}

location /api/ {
    limit_req zone=api burst=10 nodelay;
    proxy_pass http://ideal_fit_backend;
}
```

## Deployment Checklist

- [ ] Server provisioned and secured
- [ ] Database created and migrated
- [ ] Application built and tested
- [ ] Nginx configured and SSL enabled
- [ ] PM2 started and monitored
- [ ] Backups configured
- [ ] Monitoring setup
- [ ] Performance optimized
- [ ] Security hardened
- [ ] Domain pointing to server
- [ ] Email notifications configured
- [ ] Incident response plan ready

## Rollback Procedure

If something goes wrong:

```bash
# Stop current version
pm2 stop ideal-fit-landing

# Checkout previous version
cd /var/www/ideal-fit-landing
git log --oneline | head -5
git checkout COMMIT_HASH

# Rebuild
pnpm install
pnpm build
pnpm db:push

# Start again
pm2 start ecosystem.config.js
```

## Monitoring Dashboard

Create a monitoring dashboard with:

1. **Application Health**
   - Response time
   - Error rate
   - CPU usage
   - Memory usage

2. **Business Metrics**
   - Orders submitted
   - Conversion rate
   - Revenue generated

3. **Infrastructure**
   - Disk space
   - Database size
   - Backup status

## Support & Troubleshooting

### Common Issues

**Application won't start:**
```bash
# Check logs
pm2 logs ideal-fit-landing

# Check port
sudo lsof -i :3000

# Check database connection
mysql -u ideal_fit -p ideal_fit -e "SELECT 1;"
```

**High memory usage:**
```bash
# Restart application
pm2 restart ideal-fit-landing

# Check for memory leaks
pm2 monit
```

**Database connection errors:**
```bash
# Check MySQL status
sudo systemctl status mysql

# Check database
mysql -u ideal_fit -p ideal_fit -e "SHOW TABLES;"
```

## Post-Deployment

1. ✅ Verify all features working
2. ✅ Test M1 integration
3. ✅ Monitor logs for errors
4. ✅ Check performance metrics
5. ✅ Setup alerts
6. ✅ Document deployment
7. ✅ Train team on operations

---

**Created:** October 28, 2025  
**Last Updated:** October 28, 2025
