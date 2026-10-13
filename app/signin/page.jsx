import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { SignInForm } from "@/components/auth-form";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
export default function SignIn() {
    return _jsx("main", { className: "auth-page container", children: _jsxs("div", { className: "auth-card", children: [_jsx("span", { className: "page-kicker", children: "\u09B8\u09CD\u09AC\u09BE\u0997\u09A4\u09AE" }), _jsx("h1", { children: "\u09B8\u09BE\u0987\u09A8 \u0987\u09A8" }), _jsx("p", { children: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AC\u09BE\u099C\u09BE\u09B0\u09A6\u09B0 \u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F\u09C7 \u09AA\u09CD\u09B0\u09AC\u09C7\u09B6 \u0995\u09B0\u09C1\u09A8\u0964" }), _jsx(Suspense, { fallback: _jsx("div", { className: "skeleton", style: { height: 210 } }), children: _jsx(SignInForm, {}) }), _jsxs("div", { className: "auth-switch", children: ["\u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u09A8\u09C7\u0987? ", _jsx(Link, { href: "/signup", children: "\u09B8\u09BE\u0987\u09A8 \u0986\u09AA \u0995\u09B0\u09C1\u09A8" })] }), _jsxs(Link, { className: "auth-home-link", href: "/", children: [_jsx(ArrowLeft, { size: 15 }), " \u09B9\u09CB\u09AE \u09AA\u09C7\u099C\u09C7 \u09AB\u09BF\u09B0\u09C7 \u09AF\u09BE\u09A8"] })] }) });
}
