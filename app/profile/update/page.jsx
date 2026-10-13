"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function UpdateProfile() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => { if (session?.user?.name)
        setName(session.user.name); }, [session]);
    if (isPending)
        return _jsx("main", { className: "container profile-wrap", children: _jsx("div", { className: "skeleton", style: { width: 450, height: 220 } }) });
    if (!session) {
        router.replace("/signin");
        return null;
    }
    async function update() {
        if (name.trim().length < 2) {
            toast.error("সঠিক নাম দিন");
            return;
        }
        setLoading(true);
        const { error } = await authClient.updateUser({ name: name.trim() });
        setLoading(false);
        if (error) {
            toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
            return;
        }
        toast.success("তথ্য আপডেট হয়েছে");
        router.push("/profile");
        router.refresh();
    }
    return _jsxs("main", { className: "container profile-wrap", children: [_jsx("span", { className: "page-kicker", children: "\u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2" }), _jsx("h1", { className: "page-title", children: "\u09A4\u09A5\u09CD\u09AF \u0986\u09AA\u09A1\u09C7\u099F" }), _jsxs("div", { className: "profile-card", children: [_jsxs("div", { className: "form-field", children: [_jsx("label", { children: "\u09A8\u09BE\u09AE" }), _jsx("input", { value: name, onChange: e => setName(e.target.value) })] }), _jsx("button", { className: "btn btn-primary", onClick: update, disabled: loading, children: loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন" })] })] });
}
