import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
export default async function Profile() {
    const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
    if (!session)
        redirect("/signin");
    return _jsxs("main", { className: "container profile-wrap", children: [_jsx("span", { className: "page-kicker", children: "\u0986\u09AE\u09BE\u09B0 \u0985\u09CD\u09AF\u09BE\u0995\u09BE\u0989\u09A8\u09CD\u099F" }), _jsx("h1", { className: "page-title", children: "\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2" }), _jsxs("div", { className: "profile-card", children: [_jsx("div", { className: "profile-avatar", children: "\uD83D\uDC64" }), _jsx("h2", { children: session.user.name }), _jsx("p", { className: "profile-email", children: session.user.email }), _jsx(Link, { href: "/profile/update", className: "btn btn-primary", style: { marginTop: 15 }, children: "\u09A4\u09A5\u09CD\u09AF \u0986\u09AA\u09A1\u09C7\u099F \u0995\u09B0\u09C1\u09A8" })] })] });
}
