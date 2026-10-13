import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductGridSkeleton } from "@/components/skeletons";
export default function Loading() {
    return _jsxs("main", { className: "container category-wrap", children: [_jsx("div", { className: "skeleton skeleton-line", style: { width: 180, height: 30, marginBottom: 25 } }), _jsx(ProductGridSkeleton, {})] });
}
