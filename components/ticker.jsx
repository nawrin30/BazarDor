import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { bnNumber, money } from "@/lib/utils";
export function PriceTicker({ products }) {
    const items = products.slice(0, 16);
    return _jsx("div", { className: "ticker", "aria-label": "\u0986\u099C\u0995\u09C7\u09B0 \u09A6\u09BE\u09AE", children: _jsx("div", { className: "ticker-track", children: [...items, ...items].map((p, i) => _jsxs("span", { className: "ticker-item", children: [p.emoji, " ", p.name, " ", _jsxs("b", { children: [money(p.price), " \u099F\u09BE\u0995\u09BE/", p.unit.replace("প্রতি ", "")] }), " ", _jsxs("em", { className: `ticker-change ${p.change > 0 ? "up" : p.change < 0 ? "down" : "flat"}`, children: [p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—", " ", bnNumber(Math.abs(p.change).toFixed(1)), "%"] })] }, `${p.id}-${i}`)) }) });
}
