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
    <div>
      <NavigationMenu className="bg-green-600">
        <NavigationMenuList>
          {
            menuItems.map()
          }
          <Link href="/home">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
