import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ProductSkeleton() {
    return _jsxs("div", { className: "product-card skeleton-card", children: [_jsx("div", { className: "skeleton skeleton-visual" }), _jsx("div", { className: "skeleton skeleton-line" }), _jsx("div", { className: "skeleton skeleton-line short" }), _jsx("div", { className: "skeleton skeleton-price" })] });
}
export function ProductGridSkeleton() { return _jsx("div", { className: "product-grid", children: Array.from({ length: 6 }).map((_, i) => _jsx(ProductSkeleton, {}, i)) }); }
