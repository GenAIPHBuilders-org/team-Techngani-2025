"use client";

import { useCallback } from "react";
import Link from "next/link";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";

export function UserMenuContent() {
  const handleSignOut = useCallback(() => {
    // Handle sign out logic here
    console.log("Sign out");
  }, []);

  return (
    <DropdownMenuContent align="end" className="w-56">
      <div className="flex items-center justify-start gap-2 p-2">
        <div className="flex flex-col space-y-1 leading-none">
          <p className="font-medium">User Name</p>
          <p className="text-sm text-muted-foreground">user@example.com</p>
        </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 cursor-pointer w-full"
        >
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link
          href="/settings"
          className="flex items-center gap-2 cursor-pointer w-full"
        >
          <Settings className="h-4 w-4" /> Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4" /> Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default UserMenuContent;
