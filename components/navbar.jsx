
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  UserRound,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { DateLine } from "./date-line";

const navItems = [
  ["সব", "/", "🛒"],
  ["চাল", "/category/chal", "🍚"],
  ["ডাল", "/category/dal", "🫘"],
  ["তেল", "/category/tel", "🛢️"],
  ["সবজি", "/category/sobji", "🥬"],
  ["মাছ", "/category/mach", "🐟"],
  ["মাংস", "/category/mangsho", "🍗"],
  ["ডিম-দুধ", "/category/dim-dui", "🥛"],
  ["মসলা", "/category/mosla", "🌶️"],
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef(null);

  useEffect(() => {
    function closeOutside(event) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOutside);

    return () => {
      document.removeEventListener("mousedown", closeOutside);
    };
  }, []);

  async function logout() {
    setAccountOpen(false);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে", {
        duration: 3500,
        id: "signout-success",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  const isLoggedIn = Boolean(session?.user);

  return (
    <header className="site-header">
      <div className="container nav-top">
        <Link
          href="/"
          className="brand"
          aria-label="বাজার দর হোম"
        >
          <span className="brand-logo">
            <Image
              src="/logo.png"
              alt="বাজার দর লোগো"
              width={50}
              height={50}
              priority
            />
          </span>

          <span>
            <b>বাজার দর</b>
            <DateLine />
          </span>
        </Link>

        <button
          className="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          aria-label="মেনু"
          aria-expanded={open}
          type="button"
        >
          <Menu size={22} />
        </button>

        <div className="auth-actions">
          {isPending ? (
            <span className="profile-link" aria-live="polite">
              অপেক্ষা করুন...
            </span>
          ) : isLoggedIn ? (
            <div className="account-menu-wrap" ref={accountRef}>
              <button
                className="profile-link account-trigger"
                aria-expanded={accountOpen}
                aria-haspopup="true"
                onClick={() =>
                  setAccountOpen((value) => !value)
                }
                type="button"
              >
                <UserRound size={16} />

                <span>
                  {session.user.name || "আমার অ্যাকাউন্ট"}
                </span>

                {accountOpen ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>

              {accountOpen && (
                <div className="account-dropdown">
                  <Link
                    href="/profile"
                    onClick={() => setAccountOpen(false)}
                  >
                    <UserRound size={15} />
                    আমার প্রোফাইল
                  </Link>

                  <button
                    onClick={logout}
                    type="button"
                  >
                    <LogOut size={15} />
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                className="signin-link"
                href="/signin"
              >
                সাইন ইন
              </Link>

              <Link
                className="btn btn-primary btn-sm"
                href="/signup"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav
        className={`category-nav ${open ? "open" : ""}`}
      >
        <div className="container category-inner">
          {navItems.map(([label, href, icon]) => (
            <Link
              key={href}
              className={pathname === href ? "active" : ""}
              href={href}
              onClick={() => setOpen(false)}
            >
              <span
                className="category-icon"
                aria-hidden="true"
              >
                {icon}
              </span>

              <span>{label}</span>
            </Link>
          ))}

          <Link
            className={
              pathname.startsWith("/category/") &&
              !navItems.some(([, href]) => href === pathname)
                ? "active"
                : ""
            }
            href="/category/sobji"
            onClick={() => setOpen(false)}
          >
            আরও <ChevronDown size={14} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
