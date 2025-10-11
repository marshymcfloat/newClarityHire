// components/AppSidebar/UserButton.tsx

"use client";

import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import AuthDialog from "./auth/AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserButton = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <UserButtonSkeleton />;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <AuthDialog
          open={isAuthDialogOpen}
          onClose={() => setIsAuthDialogOpen(false)}
          onOpenChange={setIsAuthDialogOpen}
        />
        <Button className="w-full" onClick={() => setIsAuthDialogOpen(true)}>
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-left h-auto py-2"
        >
          <div className="flex items-center gap-3">
            {session!.user.image ? (
              <Image
                width={40}
                height={40}
                alt="user profile image"
                src={session!.user.image}
                className="rounded-full"
              />
            ) : (
              <div className="size-10 font-bold text-lg rounded-full flex items-center justify-center bg-primary/10 text-primary border">
                <span>{session!.user.name?.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-sm truncate">
                {session!.user.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {session!.user.email}
              </span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mb-2" align="end" side="top">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserButtonSkeleton = () => {
  return (
    <div className="flex items-center gap-3 w-full p-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
};

export default UserButton;
