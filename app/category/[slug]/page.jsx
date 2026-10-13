import { jsx as _jsx } from "react/jsx-runtime";
import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/lib/bazar-api";
import { CategoryClient } from "@/components/category-client";
export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const [products, categories] = await Promise.all([getProducts(), getCategories()]);
    const filtered = products.filter((p) => p.category === slug || p.categoryLabel === slug);
    if (!filtered.length && !categories.includes(slug))
        notFound();
    return _jsx(CategoryClient, { slug: slug, products: filtered });
}
