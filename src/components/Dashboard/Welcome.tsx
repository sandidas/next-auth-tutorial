"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function Welcome() {
    const session = useSession();
    console.log("session", session?.data?.user);
  return (
    <div>
      <h1 className="text-7xl font-black">Welcome to Dashboard</h1>
    </div>
  );
}
