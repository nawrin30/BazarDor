import { betterAuth } from "better-auth";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured");
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not configured");
}

if (!process.env.BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL is not configured");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Keep your database provider's SSL requirements in mind.
  ssl: { rejectUnauthorized: true },
  max: 5,
});

const appURL = process.env.BETTER_AUTH_URL.replace(/\/$/, "");
const trustedOrigins = [appURL];
if (process.env.NODE_ENV !== "production") {
  trustedOrigins.push("http://localhost:3000");
}

export const auth = betterAuth({
  database: pool,
  baseURL: appURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});

export default auth;
