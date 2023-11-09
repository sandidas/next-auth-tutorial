"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    icon: "",
    title: "Login",
    linkUrl: "/login",
    description: "",
  },
  {
    icon: "",
    title: "Register",
    linkUrl: "/register",
    description: "",
  },
];

export default function NavigationMenubar() {
  const { data: session } = useSession();

  // console.log("session", session);

  return (
    <div className="bg-slate-800 w-full">
      <div className="flex items-center gap-5 justify-between  max-w-screen-2xl px-7 md:px-10 mx-auto">
        <Link href={"/"} className="uppercase font-bold text-xl text-white">
          Your Logo
        </Link>
        <div className="flex gap-2 items-center uppercase">
          {!session ? (
            menuItems.map((menuItem, index) => (
              <Link key={index} href={menuItem?.linkUrl} className="hover:bg-black text-white px-5 py-4">
                {menuItem.title}
              </Link>
            ))
          ) : (
            <button
              onClick={() => {
                signOut();
              }}
              className="hover:bg-black text-white px-5 py-4 uppercase"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
