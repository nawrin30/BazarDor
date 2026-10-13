import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { SignUpForm } from "@/components/auth-form";
export default function SignUp() {
    return _jsx("main", { className: "auth-page container", children: _jsxs("div", { className: "auth-card", children: [_jsx("span", { className: "page-kicker", children: "\u09A8\u09A4\u09C1\u09A8 \u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F" }), _jsx("h1", { children: "\u09B8\u09BE\u0987\u09A8 \u0986\u09AA \u0995\u09B0\u09C1\u09A8" }), _jsx("p", { children: "\u0995\u09DF\u09C7\u0995\u099F\u09BF \u09A4\u09A5\u09CD\u09AF \u09A6\u09BF\u09DF\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C1\u09A8\u0964" }), _jsx(SignUpForm, {}), _jsxs("div", { className: "auth-switch", children: ["\u0986\u0997\u09C7\u0987 \u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F \u0986\u099B\u09C7? ", _jsx(Link, { href: "/signin", children: "\u09B8\u09BE\u0987\u09A8 \u0987\u09A8 \u0995\u09B0\u09C1\u09A8" })] })] }) });
}
