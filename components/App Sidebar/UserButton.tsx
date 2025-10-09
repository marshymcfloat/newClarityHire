"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import AuthDialog from "./auth/AuthDialog";
import Image from "next/image";

const UserButton = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const session = useSession();

  return (
    <>
      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />

      <div className="">
        {session.status === "unauthenticated" ||
        session.status === "loading" ? (
          <Button
            disabled={session.status === "loading"}
            className="w-full"
            onClick={() => setIsAuthDialogOpen(true)}
          >
            <LogIn />
            Login
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {session.data?.user.image ? (
                <Image
                  width={40}
                  height={40}
                  alt="user profile image"
                  src={session.data.user.image}
                  className="rounded-full"
                />
              ) : (
                <div className="size-[40px] font-bold text-2xl rounded-full flex items-center justify-center bg-amber-200 shadow-md cursor-pointer">
                  <span>{session.data?.user.name![0]}</span>
                </div>
              )}

              <div className="flex flex-col gap-1 text-sm">
                <h1 className="font-medium">{session.data?.user.email}</h1>
                <p className="text-xs">{session.data?.user.name}</p>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => signOut({ redirect: false })}
            >
              <LogOut /> Logout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserButton;
