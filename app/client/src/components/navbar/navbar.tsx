"use client";
import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { NavLinkProps, NavbarProps } from "../../types/types";
import NavLink from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

// Dynamically import MobileNav for code splitting
const MobileNav = dynamic(() => import("./MobileNav"), { ssr: false });

// Default navigation items
const defaultNavItems = [
  { label: "Docs", href: "/Docs" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar({ navItems = defaultNavItems }: NavbarProps) {
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center max-w-7xl mx-auto">
        <div className="flex gap-6 md:gap-10 items-center ">
          {/* Logo */}
          <Link href="/" className="hidden items-center space-x-2 md:flex ">
            <span className="text-2xl font-bold">Sikatly.AI</span>
          </Link>

          {/* Mobile Logo (smaller) */}
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Image
              src="/next.svg"
              alt="Logo"
              width={24}
              height={24}
              className="h-6 w-auto ml-10 md:ml-0"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        </div>

        {/* Right side items */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden md:block">
              <UserMenu />
            </div>
          </nav>

          {/* Mobile menu button */}
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
