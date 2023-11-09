"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: IProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
