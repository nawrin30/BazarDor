# Bazar Dor — Google ও GitHub Login সেটআপ (বাংলা)

এই আপডেটে Better Auth-এর server configuration-এ Google ও GitHub `socialProviders` যোগ করা হয়েছে এবং `BETTER_AUTH_URL` থেকে trusted origin সেট করা হয়েছে। OAuth provider credentials না দিলে Google/GitHub login চালু হবে না।

## 1. Netlify Environment variables

Netlify → আপনার Bazar Dor site → Site configuration → Environment variables-এ নিচের variable-গুলো সেট করুন:

- `BETTER_AUTH_URL` = আপনার live site-এর সম্পূর্ণ URL, যেমন `https://your-site-name.netlify.app` (শেষে `/` দেবেন না)
- `BETTER_AUTH_SECRET` = একটি নতুন, দীর্ঘ random secret
- `DATABASE_URL` = আপনার PostgreSQL connection string
- `GOOGLE_CLIENT_ID` = Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` = Google OAuth Client Secret
- `GITHUB_CLIENT_ID` = GitHub OAuth Client ID
- `GITHUB_CLIENT_SECRET` = GitHub OAuth Client Secret

কোনো secret কখনো GitHub-এ commit করবেন না বা কারও সঙ্গে chat-এ শেয়ার করবেন না।

## 2. Google OAuth তৈরি

1. Google Cloud Console-এ একটি project নির্বাচন/তৈরি করুন।
2. OAuth consent screen configure করুন এবং প্রয়োজনীয় test users যোগ করুন (যদি app testing mode-এ থাকে)।
3. Credentials → Create Credentials → OAuth client ID → Web application নির্বাচন করুন।
4. Authorized JavaScript origin-এ আপনার live URL দিন, যেমন `https://your-site-name.netlify.app`।
5. Authorized redirect URI-তে দিন:
   `https://your-site-name.netlify.app/api/auth/callback/google`
6. তৈরি হওয়া Client ID ও Client Secret Netlify-তে `GOOGLE_CLIENT_ID` ও `GOOGLE_CLIENT_SECRET` হিসেবে দিন।

## 3. GitHub OAuth তৈরি

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App-এ যান।
2. Homepage URL-এ আপনার live URL দিন।
3. Authorization callback URL-এ দিন:
   `https://your-site-name.netlify.app/api/auth/callback/github`
4. Register করার পর Client ID কপি করুন এবং Generate a new client secret দিয়ে secret তৈরি করুন।
5. Netlify-তে `GITHUB_CLIENT_ID` ও `GITHUB_CLIENT_SECRET` সেট করুন।

## 4. Redeploy

Environment variables save করার পর project root-এ Git Bash খুলে চালান:

```bash
npx netlify-cli deploy --prod
```

Deploy শেষে live site-এর `/signin` ও `/signup` পেজে Google এবং GitHub login পরীক্ষা করুন।

## গুরুত্বপূর্ণ

- OAuth callback URL-এ অবশ্যই আপনার বর্তমান live site-এর domain ব্যবহার করবেন। Site-এর নাম বদলালে Google ও GitHub console-এ callback/origin URL-ও update করতে হবে।
- Provider credentials ছাড়াই button কাজ করবে না; শুধু কোড যোগ করলেই provider-এর অনুমোদন পাওয়া যায় না।
- যদি Google OAuth app testing mode-এ থাকে, শুধু configured test users সাইন ইন করতে পারবে।
- ZIP থেকে `.env.local`, `.git`, `node_modules`, `.next` এবং স্থানীয় SQLite data বাদ দেওয়া হয়েছে। Production PostgreSQL configuration রাখা হয়েছে।
