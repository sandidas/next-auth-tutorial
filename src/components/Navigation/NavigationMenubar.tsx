"use client";
import React from "react";
import Link from "next/link";

import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const menuItems = [
  {
    icon: "",
    title: "Home",
    linkUrl: "/",
    description: "",
  },
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
  return (
    <div className="flex items-center gap-5 justify-between bg-slate-800 max-w-screen-2xl px-7 md:px-10 mx-auto">
      <div className="uppercase font-bold text-xl text-white">Your Logo</div>
      <div className="flex gap-2 items-center uppercase">
        {menuItems.map((menuItem, index) => (
          <Link key={index} href={menuItem?.linkUrl} className="hover:bg-black text-white px-5 py-4">
            {menuItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
