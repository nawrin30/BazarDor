import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductCard } from "./product-card";
export function ProductSection({ title, subtitle, products }) {
    return _jsxs("section", { className: "section", children: [_jsx("div", { className: "section-heading", children: _jsxs("div", { children: [_jsx("h2", { children: title }), subtitle && _jsx("p", { children: subtitle })] }) }), _jsx("div", { className: "product-grid", children: products.map((p) => _jsx(ProductCard, { product: p }, p.id)) })] });
}
