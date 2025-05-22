"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import NavLink from "./NavLink";
import { MobileNavProps } from "../../types/types";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="h-10 w-10"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm animate-in fade-in-0">
          <div className="flex flex-col gap-6 p-6">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} isMobile />
              ))}
            </nav>
            <div className="flex flex-col gap-4">
              <hr className="border-muted" />
              <ThemeToggle className="w-full justify-start" />
              <hr className="border-muted" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
