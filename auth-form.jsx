"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Github } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function getErrorMessage(error, fallback) {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  return error.message || error.statusText || fallback;
}

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callback = params.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (callback !== "/") toast("সাইন ইন করলে আপনি চাওয়া পেজে যেতে পারবেন");
  }, [callback]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দিন।");
      return;
    }
    setLoading(true);
    try {
      const result = await authClient.signIn.email({ email: email.trim(), password });
      if (result?.error) {
        const message = getErrorMessage(result.error, "লগইন ব্যর্থ হয়েছে। ইমেইল ও পাসওয়ার্ড পরীক্ষা করুন।");
        setError(message);
        toast.error(message);
        return;
      }
      toast.success("লগইন সফল হয়েছে");
      router.push(callback);
      router.refresh();
    } catch (err) {
      console.error("BazarDor sign-in error:", err);
      const message = getErrorMessage(err, "সার্ভারের সঙ্গে যোগাযোগ করা যাচ্ছে না। Terminal-এর error দেখুন।");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function social(provider) {
    try {
      const result = await authClient.signIn.social({ provider, callbackURL: callback });
      if (result?.error) toast.error(getErrorMessage(result.error, "Social login সেটআপ করা হয়নি বা ব্যর্থ হয়েছে"));
    } catch (err) {
      console.error("BazarDor social sign-in error:", err);
      toast.error(getErrorMessage(err, "Social login ব্যর্থ হয়েছে"));
    }
  }

  return (
    <form onSubmit={submit}>
      {error && <div className="error" role="alert">{error}</div>}
      <div className="form-field">
        <label htmlFor="signin-email">ইমেইল</label>
        <input id="signin-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <div className="form-field">
        <label htmlFor="signin-password">পাসওয়ার্ড</label>
        <input id="signin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="আপনার পাসওয়ার্ড" />
      </div>
      <button disabled={loading} className="btn btn-primary form-submit">{loading ? "লগইন হচ্ছে..." : "লগইন করুন"}</button>
      <div className="divider">অথবা</div>
      <div className="social-row">
        <button type="button" className="social-btn" onClick={() => social("google")}>
          <svg className="google-icon" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.26 13.76 17.52 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.12 7.13-10.2 7.13-17.58z" />
            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.56 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.87l-7.64-5.93c-2.12 1.42-4.84 2.27-8.26 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          <span>Google দিয়ে সাইন ইন</span>
        </button>
        <button type="button" className="social-btn" onClick={() => social("github")}><Github size={18} strokeWidth={2.2} /><span>GitHub দিয়ে সাইন ইন</span></button>
      </div>
    </form>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2 || !email.trim() || password.length < 8) {
      setError("নাম, সঠিক ইমেইল এবং কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন।");
      return;
    }
    setLoading(true);
    try {
      const result = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password });
      if (result?.error) {
        const message = getErrorMessage(result.error, "রেজিস্ট্রেশন ব্যর্থ হয়েছে। তথ্যগুলো পরীক্ষা করুন।");
        setError(message);
        toast.error(message);
        return;
      }
      toast.success("রেজিস্ট্রেশন সফল হয়েছে। এখন সাইন ইন করুন।");
      router.push("/signin");
      router.refresh();
    } catch (err) {
      console.error("BazarDor sign-up error:", err);
      const message = getErrorMessage(err, "রেজিস্ট্রেশন করা যায়নি। সার্ভার Terminal-এর error দেখুন।");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function social(provider) {
    try {
      const result = await authClient.signIn.social({ provider, callbackURL: "/" });
      if (result?.error) toast.error(getErrorMessage(result.error, "Social login সেটআপ করা হয়নি বা ব্যর্থ হয়েছে"));
    } catch (err) {
      console.error("BazarDor social sign-in error:", err);
      toast.error(getErrorMessage(err, "Social login ব্যর্থ হয়েছে"));
    }
  }

  return (
    <form onSubmit={submit}>
      {error && <div className="error" role="alert">{error}</div>}
      <div className="form-field">
        <label htmlFor="signup-name">নাম</label>
        <input id="signup-name" autoComplete="name" required minLength={2} value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" />
      </div>
      <div className="form-field">
        <label htmlFor="signup-email">ইমেইল</label>
        <input id="signup-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <div className="form-field">
        <label htmlFor="signup-password">পাসওয়ার্ড</label>
        <input id="signup-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" />
      </div>
      <button disabled={loading} className="btn btn-primary form-submit">{loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "রেজিস্টার করুন"}</button>
      <div className="divider">অথবা</div>
      <div className="social-row">
        <button type="button" className="social-btn" onClick={() => social("google")}>
          <svg className="google-icon" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.26 13.76 17.52 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.12 7.13-10.2 7.13-17.58z" />
            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.56 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.87l-7.64-5.93c-2.12 1.42-4.84 2.27-8.26 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          <span>Google দিয়ে সাইন ইন</span>
        </button>
        <button type="button" className="social-btn" onClick={() => social("github")}><Github size={18} strokeWidth={2.2} /><span>GitHub দিয়ে সাইন ইন</span></button>
      </div>
    </form>
  );
}
