"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export function DateLine() {
    const [date, setDate] = useState("");
    useEffect(() => {
        const format = () => setDate(new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date()));
        format();
        const id = setInterval(format, 60000);
        return () => clearInterval(id);
    }, []);
    return _jsx("span", { className: "brand-date", children: date || "আজকের বাজার তথ্য" });
}
