"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { UserMenuProps } from "../../types/types";
import { useAuth } from "@/hooks/useAuth";
import { deleteSession } from "@/lib/session";
import { useRouter } from "next/navigation";

// Guest buttons component
export function GuestButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/auth/signin">Sign In</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/signup">Sign Up</Link>
      </Button>
    </div>
  );
}

export function UserMenu() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  }, [router]);

  if (loading) {
    return <div className="h-10 w-20 animate-pulse bg-muted rounded"></div>;
  }

  if (!isAuthenticated || !user) {
    return <GuestButtons />;
  }

  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
          aria-label="Open user menu"
        >
          <Avatar>
            <AvatarImage
              src={user.avatar || "/avatar-placeholder.png"}
              alt={`${user.name}'s avatar`}
            />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
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
    </DropdownMenu>
  );
}

export default UserMenu;
