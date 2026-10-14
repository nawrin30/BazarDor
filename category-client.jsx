"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ProductCard } from "./product-card";
function numericPrice(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const normalized = String(value ?? "").replace(/[০-৯]/g, (digit) => "০১২৩৪৫৬৭৮৯".indexOf(digit)).replace(/[৳,٬\s]/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
}
const labels = { chal: "চাল", sobji: "সবজি", mosla: "মসলা", mach: "মাছ", mangsho: "মাংস", "dim-dui": "ডিম-দুধ", dal: "ডাল", tel: "তেল", fol: "ফল" };
export function CategoryClient({ slug, products }) {
    const [sort, setSort] = useState("default");
    const sorted = useMemo(() => [...products].sort((a, b) => {
        const priceA = numericPrice(a.price);
        const priceB = numericPrice(b.price);
        if (sort === "asc")
            return priceA - priceB || a.name.localeCompare(b.name, "bn");
        if (sort === "desc")
            return priceB - priceA || a.name.localeCompare(b.name, "bn");
        return a.id - b.id;
    }), [products, sort]);
    return _jsxs("main", { className: "container category-wrap", children: [_jsxs("div", { className: "category-top", children: [_jsxs("div", { children: [_jsx("span", { className: "page-kicker", children: "\u09AA\u09A3\u09CD\u09AF\u09C7\u09B0 \u09AC\u09BF\u09AD\u09BE\u0997" }), _jsx("h1", { className: "page-title", children: labels[slug] ?? products[0]?.categoryLabel ?? slug }), _jsx("p", { className: "category-subtitle", children: "\u098F\u0987 \u09AC\u09BF\u09AD\u09BE\u0997\u09C7\u09B0 \u0986\u099C\u0995\u09C7\u09B0 \u09B8\u09AE\u09CD\u09AD\u09BE\u09AC\u09CD\u09AF \u09AC\u09BE\u099C\u09BE\u09B0\u09A6\u09B0\u0964" })] }), _jsxs("label", { className: "sort-wrap", children: ["\u09B8\u09BE\u099C\u09BE\u09A8 ", _jsxs("span", { className: "sort-control", children: [_jsxs("select", { className: "sort-select", value: sort, onChange: e => setSort(e.target.value), children: [_jsx("option", { value: "default", children: "\u09A1\u09BF\u09AB\u09B2\u09CD\u099F" }), _jsx("option", { value: "asc", children: "\u09A6\u09BE\u09AE: \u0995\u09AE \u09A5\u09C7\u0995\u09C7 \u09AC\u09C7\u09B6\u09BF" }), _jsx("option", { value: "desc", children: "\u09A6\u09BE\u09AE: \u09AC\u09C7\u09B6\u09BF \u09A5\u09C7\u0995\u09C7 \u0995\u09AE" })] }), _jsx(ChevronDown, { size: 15 })] })] })] }), sorted.length ? _jsx("div", { className: "product-grid", children: sorted.map(p => _jsx(ProductCard, { product: p }, p.id)) }) : _jsxs("div", { className: "empty-state", children: [_jsx("h2", { children: "\u098F\u0987 \u09AC\u09BF\u09AD\u09BE\u0997\u09C7 \u0995\u09CB\u09A8\u09CB \u09AA\u09A3\u09CD\u09AF \u09A8\u09C7\u0987" }), _jsx("p", { children: "\u09A6\u09C1\u0983\u0996\u09BF\u09A4, \u098F\u0987 \u09AC\u09BF\u09AD\u09BE\u0997\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0995\u09CB\u09A8\u09CB \u09AA\u09A3\u09CD\u09AF \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF\u0964" }), _jsx(Link, { href: "/", className: "btn btn-primary", children: "\u09B9\u09CB\u09AE \u09AA\u09C7\u099C\u09C7 \u09AB\u09BF\u09B0\u09C7 \u09AF\u09BE\u09A8" })] })] });
}
