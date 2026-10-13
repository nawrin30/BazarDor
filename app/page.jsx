import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Hero } from "@/components/hero";
import { ProductSection } from "@/components/home-sections";
import { getProducts } from "@/lib/bazar-api";
export default async function Home() {
    const products = await getProducts();
    const risers = [...products].sort((a, b) => b.change - a.change).slice(0, 6);
    const fallers = [...products].sort((a, b) => a.change - b.change).slice(0, 6);
    return _jsxs("main", { children: [_jsx(Hero, {}), _jsxs("div", { className: "container", children: [_jsx(ProductSection, { title: _jsxs(_Fragment, { children: [_jsx("span", { className: "trend-arrow trend-up", children: "\u25B2" }), " \u0986\u099C \u09A6\u09BE\u09AE \u09AC\u09C7\u09A1\u09BC\u09C7\u099B\u09C7"] }), subtitle: "\u0986\u099C\u0995\u09C7\u09B0 \u09AC\u09BE\u099C\u09BE\u09B0\u09C7 \u09A4\u09C1\u09B2\u09A8\u09BE\u09AE\u09C2\u09B2\u0995 \u09AC\u09C7\u09B6\u09BF \u09AC\u09C7\u09DC\u09C7\u099B\u09C7 \u098F\u09AE\u09A8 \u09AA\u09A3\u09CD\u09AF", products: risers }), _jsx(ProductSection, { title: _jsxs(_Fragment, { children: [_jsx("span", { className: "trend-arrow trend-down", children: "\u25BC" }), " \u0986\u099C \u09A6\u09BE\u09AE \u0995\u09AE\u09C7\u099B\u09C7"] }), subtitle: "\u0986\u099C\u0995\u09C7\u09B0 \u09AC\u09BE\u099C\u09BE\u09B0\u09C7 \u09A4\u09C1\u09B2\u09A8\u09BE\u09AE\u09C2\u09B2\u0995 \u0995\u09AE\u09C7\u099B\u09C7 \u098F\u09AE\u09A8 \u09AA\u09A3\u09CD\u09AF", products: fallers }), _jsx("div", { id: "\u09B8\u09AC-\u09AA\u09A3\u09CD\u09AF", children: _jsx(ProductSection, { title: "\u09B8\u09AC \u09AA\u09A3\u09CD\u09AF", subtitle: "\u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8\u09C0\u09DF \u09AA\u09A3\u09CD\u09AF\u09C7\u09B0 \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u09B8\u09AE\u09CD\u09AD\u09BE\u09AC\u09CD\u09AF \u09A6\u09BE\u09AE \u098F\u0995 \u09A8\u099C\u09B0\u09C7", products: products }) })] })] });
}
