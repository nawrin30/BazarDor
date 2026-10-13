"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, UserRound, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { DateLine } from "./date-line";
const navItems = [
    ["সব", "/", "🛒"], ["চাল", "/category/chal", "🍚"], ["ডাল", "/category/dal", "🫘"], ["তেল", "/category/tel", "🛢️"], ["সবজি", "/category/sobji", "🥬"], ["মাছ", "/category/mach", "🐟"], ["মাংস", "/category/mangsho", "🍗"], ["ডিম-দুধ", "/category/dim-dui", "🥛"], ["মসলা", "/category/mosla", "🌶️"],
];
export function Navbar({ session }) {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef(null);
    useEffect(() => {
        function closeOutside(event) {
            if (accountRef.current && !accountRef.current.contains(event.target))
                setAccountOpen(false);
        }
        document.addEventListener("mousedown", closeOutside);
        return () => document.removeEventListener("mousedown", closeOutside);
    }, []);
    async function logout() {
        setAccountOpen(false);
        const { error } = await authClient.signOut();
        if (error) {
            toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
            return;
        }
        toast.success("সফলভাবে সাইন আউট হয়েছে", { duration: 3500, id: "signout-success" });
        router.push("/");
        router.refresh();
    }
    return (_jsxs("header", { className: "site-header", children: [_jsxs("div", { className: "container nav-top", children: [_jsxs(Link, { href: "/", className: "brand", children: [_jsx("span", { className: "brand-logo", children: _jsx("img", { src: "/logo.png", alt: "\u09AC\u09BE\u099C\u09BE\u09B0 \u09A6\u09B0 \u09B2\u09CB\u0997\u09CB" }) }), _jsxs("span", { children: [_jsx("b", { children: "\u09AC\u09BE\u099C\u09BE\u09B0 \u09A6\u09B0" }), _jsx(DateLine, {})] })] }), _jsx("button", { className: "mobile-menu", onClick: () => setOpen(!open), "aria-label": "\u09AE\u09C7\u09A8\u09C1", children: _jsx(Menu, { size: 22 }) }), _jsx("div", { className: "auth-actions", children: session ? (_jsxs("div", { className: "account-menu-wrap", ref: accountRef, children: [_jsxs("button", { className: "profile-link account-trigger", "aria-expanded": accountOpen, onClick: () => setAccountOpen(v => !v), children: [_jsx(UserRound, { size: 16 }), " ", _jsx("span", { children: session.user?.name || "আমার অ্যাকাউন্ট" }), accountOpen ? _jsx(ChevronUp, { size: 14 }) : _jsx(ChevronDown, { size: 14 })] }), accountOpen && _jsxs("div", { className: "account-dropdown", children: [_jsxs(Link, { href: "/profile", onClick: () => setAccountOpen(false), children: [_jsx(UserRound, { size: 15 }), " \u0986\u09AE\u09BE\u09B0 \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2"] }), _jsxs("button", { onClick: logout, children: [_jsx(LogOut, { size: 15 }), " \u09B8\u09BE\u0987\u09A8 \u0986\u0989\u099F"] })] })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { className: "signin-link", href: "/signin", children: "\u09B8\u09BE\u0987\u09A8 \u0987\u09A8" }), _jsx(Link, { className: "btn btn-primary btn-sm", href: "/signup", children: "\u09B8\u09BE\u0987\u09A8 \u0986\u09AA" })] })) })] }), _jsx("nav", { className: `category-nav ${open ? "open" : ""}`, children: _jsxs("div", { className: "container category-inner", children: [navItems.map(([label, href, icon]) => _jsxs(Link, { className: pathname === href ? "active" : "", href: href, children: [_jsx("span", { className: "category-icon", "aria-hidden": "true", children: icon }), _jsx("span", { children: label })] }, href)), _jsxs(Link, { className: pathname.startsWith("/category/") && !navItems.some(([, href]) => href === pathname) ? "active" : "", href: "/category/sobji", children: ["\u0986\u09B0\u0993 ", _jsx(ChevronDown, { size: 14 })] })] }) })] }));
}
