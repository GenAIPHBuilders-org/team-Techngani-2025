"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLinkProps } from "../../types/types";

export function NavLink({ item, isMobile = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "transition-colors duration-200",
        isActive
          ? "text-primary font-medium"
          : "text-muted-foreground hover:text-foreground",
        isMobile && "block w-full py-2"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export default NavLink;
