# Hostinger Deployment

Use these settings for Hostinger Node.js deployment through GitHub. The contact form requires a Node.js runtime because it sends email from `/api/contact`.

- Framework: `Next.js`
- Branch: `main`
- Node.js: `22.x`
- Root directory: `/`
- Install command: `npm ci`
- Build command: `npm run build:hostinger`
- Start command: `npm run start`
- Environment variable: `SITE_URL=https://javidverse.com`
- Environment variable: `EMAIL_USER=javidverse@gmail.com`
- Environment variable: `EMAIL_APP_PASSWORD=your_google_app_password`
- Environment variable: `EMAIL_FROM_NAME=JavidVerse`
- Environment variable: `EMAIL_TO=javidverse@gmail.com`

If the final domain is different, update `SITE_URL` in Hostinger before deploying. This value controls canonical URLs, Open Graph sharing links, Twitter sharing cards, `robots.txt`, `sitemap.xml`, and email source context.

Use a Google-generated Gmail App Password for `EMAIL_APP_PASSWORD`. Do not use the regular Gmail account password.

Do not set `NEXT_OUTPUT=export` for this deployment. Static export disables the backend runtime required by `/api/contact`.
