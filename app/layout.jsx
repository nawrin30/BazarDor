import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { headers } from "next/headers";
import "./globals.css";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/navbar";
import { AppToaster } from "@/components/toaster";
import { PriceTicker } from "@/components/ticker";
import { getProducts } from "@/lib/bazar-api";
export const metadata = { title: "বাজার দর — আজকের বাজারদর", description: "প্রয়োজনীয় পণ্যের আজকের সম্ভাব্য বাজারদর এক নজরে।" };
export default async function RootLayout({ children }) {
    const [session, products] = await Promise.all([
        auth.api.getSession({ headers: await headers() }).catch(() => null),
        getProducts(),
    ]);
    return _jsx("html", { lang: "bn", children: _jsxs("body", { children: [_jsx(Navbar, { session: session }), _jsx(PriceTicker, { products: products }), children, _jsx("footer", { children: _jsxs("div", { className: "container footer-inner", children: [_jsxs("div", { children: [_jsx("div", { className: "footer-brand", children: "\u09AC\u09BE\u099C\u09BE\u09B0 \u09A6\u09B0" }), _jsx("p", { style: { textAlign: "left" }, children: "\u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8\u09C0\u09DF \u09AA\u09A3\u09CD\u09AF\u09C7\u09B0 \u09A6\u09BE\u09AE \u098F\u0995 \u09A8\u099C\u09B0\u09C7\u0964" })] }), _jsx("p", { children: "\u09B8\u0995\u09B2 \u09A6\u09BE\u09AE \u09B8\u09AE\u09CD\u09AD\u09BE\u09AC\u09CD\u09AF; \u09AC\u09BE\u099C\u09BE\u09B0 \u0985\u09AC\u09B8\u09CD\u09A5\u09BE\u09B0 \u0993\u09AA\u09B0 \u09A8\u09BF\u09B0\u09CD\u09AD\u09B0 \u0995\u09B0\u09C7 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09BF\u09A4 \u09B9\u09AF\u09BC\u0964" })] }) }), _jsx(AppToaster, {})] }) });
}
