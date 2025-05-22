import { ReactNode } from "react";

export interface NavItemType {
  label: string;
  href: string;
}

export interface NavLinkProps {
  item: NavItemType;
  isMobile?: boolean;
}

export interface UserMenuProps {}

export interface MobileNavProps {
  navItems: NavItemType[];
}

export interface NavbarProps {
  navItems?: NavItemType[];
}

export interface ThemeToggleProps {
  className?: string;
}
