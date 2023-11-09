import RegisterForm from "@/components/Users/RegisterForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
