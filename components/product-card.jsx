"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { bnNumber, money } from "@/lib/utils";
export function ProductCard({ product }) {
    const badge = product.change > 0 ? "up" : product.change < 0 ? "down" : "flat";
    return _jsxs(Link, { href: `/product/${product.slug}`, className: "product-card", children: [_jsx("div", { className: "product-visual", "aria-hidden": "true", children: product.icon || product.emoji }), _jsxs("div", { className: "product-copy", children: [_jsx("span", { className: "category-chip", children: product.categoryLabel }), _jsx("h3", { children: product.name }), _jsx("p", { children: product.unit })] }), _jsxs("div", { className: "price-row", children: [_jsxs("div", { children: [_jsx("small", { children: "\u0986\u099C\u0995\u09C7\u09B0 \u09A6\u09BE\u09AE" }), _jsxs("strong", { children: [money(product.price), " \u099F\u09BE\u0995\u09BE"] })] }), _jsxs("span", { className: `change-badge ${badge}`, children: [product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—", " ", bnNumber(Math.abs(product.change).toFixed(1)), "%"] })] })] });
}
