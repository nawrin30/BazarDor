import { sampleProducts } from "./sample-data";
export const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
export const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";
const CATEGORY_LABELS = {
    chal: "চাল", dal: "ডাল", tel: "তেল", sobji: "সবজি", mach: "মাছ",
    mangsho: "মাংস", "dim-dui": "ডিম-দুধ", mosla: "মসলা", fol: "ফল",
};
const CATEGORY_ICONS = {
    chal: "🍚", dal: "🫘", tel: "🛢️", sobji: "🥬", mach: "🐟",
    mangsho: "🍗", "dim-dui": "🥛", mosla: "🌶️", fol: "🍎",
};
const PRODUCT_ICONS = {
    "sorno-machi-chal": "🍚", "miniket-chal": "🍚", "nazir-chal": "🍚", "batam-size-chal": "🍚",
    "mosur-dal": "🫘", "mug-dal": "🫘", "chola-dal": "🫘", "aman-dal-khosasila": "🫘",
    "sorishar-tel": "🫙", "pam-tel": "🛢️", "ghani-banga-sorishar-tel": "🫙",
    alu: "🥔", peyaj: "🧅", "kaccha-moric": "🌶️", begun: "🍆", dhenders: "🟢",
    "rui-mach": "🐟", "telapiya-mach": "🐟", "ilish-mach": "🐠", "katla-mach": "🐠", "chingri-mach": "🦐",
    "murgi-r-mangsho": "🍗", "goru-r-mangsho": "🥩", "khasir-mangsho": "🍖", "hanser-mangsho": "🦆",
    dim: "🥚", "dui-dudh": "🥛", doi: "🥣", mokhhan: "🧈", ada: "🫚", roshun: "🧄",
    "morich-gunda": "🌶️", "dhanepata-gunda": "🍃",
};
function parsePrice(value, fallback = 0) {
    if (typeof value === "number" && Number.isFinite(value))
        return value;
    const digits = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "٬": ",", "٫": "." };
    const normalized = String(value ?? "").replace(/[০-৯٬٫]/g, (char) => digits[char] ?? char).replace(/[৳,\s]/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : fallback;
}
function slugify(value) {
    return value.trim().toLowerCase().replace(/[^\u0980-\u09ff\w\s-]/g, "").replace(/\s+/g, "-") || "product";
}
function unitLabel(unit) {
    const u = unit.trim().toLowerCase();
    if (u.includes("litre") || u.includes("liter") || u.includes("লিটার") || u === "l")
        return "প্রতি লিটার";
    if (u.includes("dozen") || u.includes("ডজন") || u === "dz")
        return "প্রতি ডজন";
    if (u.includes("piece") || u.includes("পিস") || u.includes("pcs") || u === "pc")
        return "প্রতি পিস";
    if (u.includes("gram") || u.includes("গ্রাম") || u === "g")
        return "প্রতি ১০০ গ্রাম";
    if (u.includes("half-kg") || u.includes("500g") || u.includes("৫০০ গ্রাম"))
        return "প্রতি ৫০০ গ্রাম";
    if (u.includes("kg") || u.includes("কেজি") || u.includes("kilogram"))
        return "প্রতি কেজি";
    return "প্রতি কেজি";
}
function normalizeMarket(x) {
    const min = parsePrice(x?.min ?? x?.price ?? 0);
    const max = parsePrice(x?.max ?? x?.price ?? min, min);
    return { bazar: String(x?.market ?? x?.bazar ?? x?.name ?? "স্থানীয় বাজার"), division: x?.division ? String(x.division) : undefined, min, max, price: Math.round((min + max) / 2) };
}
function normalize(raw) {
    const name = String(raw?.nameBn ?? raw?.name ?? raw?.productName ?? raw?.title ?? "পণ্য");
    const slug = String(raw?.slug ?? slugify(name));
    const change = parsePrice(typeof raw?.change === "object" ? raw.change?.pct ?? 0 : raw?.change ?? raw?.percentageChange ?? 0);
    const markets = Array.isArray(raw?.markets) ? raw.markets.map(normalizeMarket) : [];
    const price = parsePrice(raw?.today ?? raw?.price ?? raw?.todayPrice ?? 0);
    const category = String(raw?.category ?? "sobji");
    return {
        id: Number(raw?.id ?? 0), name, slug, category, categoryLabel: CATEGORY_LABELS[category] ?? String(raw?.categoryNameBn ?? category),
        unit: unitLabel(String(raw?.unit ?? "kg")), price, change, icon: String(raw?.image ?? raw?.categoryIcon ?? PRODUCT_ICONS[slug] ?? CATEGORY_ICONS[category] ?? "🛒"),
        emoji: String(raw?.image ?? raw?.categoryIcon ?? PRODUCT_ICONS[slug] ?? CATEGORY_ICONS[category] ?? "🛒"),
        image: String(raw?.image ?? raw?.categoryIcon ?? PRODUCT_ICONS[slug] ?? CATEGORY_ICONS[category] ?? "🛒"), description: `${CATEGORY_LABELS[category] ?? "বাজার"} বিভাগের ${name}-এর আজকের সম্ভাব্য বাজারদর।`,
        bazarPrices: markets.length ? markets : [{ bazar: "আজকের বাজার", min: price, max: price, price }],
    };
}
async function getJson(path) {
    for (const base of [BASE_URL_1, BASE_URL_2]) {
        try {
            const res = await fetch(`${base}${path}`, { cache: "no-store" });
            if (res.ok)
                return await res.json();
        }
        catch { }
    }
    return null;
}
export async function getProducts() {
    const data = await getJson("/products");
    const list = Array.isArray(data) ? data : data?.data ?? data?.products ?? [];
    return Array.isArray(list) && list.length ? list.map(normalize) : sampleProducts;
}
export async function getCategories() {
    const data = await getJson("/categories");
    const list = Array.isArray(data) ? data : data?.data ?? data?.categories ?? [];
    return Array.isArray(list) && list.length ? list.map((x) => typeof x === "string" ? x : String(x?.slug ?? x?.id ?? "")).filter(Boolean) : Object.keys(CATEGORY_LABELS);
}
export async function getProductBySlug(slug) { return (await getProducts()).find((p) => p.slug === slug || String(p.id) === slug) ?? null; }
