import LoginForm from "@/components/Users/LoginForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginProviders from "@/components/Users/LoginProviders";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <LoginForm />
      <LoginProviders />
    </div>
  );
}
