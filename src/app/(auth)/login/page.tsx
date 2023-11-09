import LoginForm from "@/components/Users/LoginForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginProviders from "@/components/Users/LoginProviders";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <main className="bg-zinc-900 bg-[url('/auth-bg.jpg')] bg-fixed bg-cover">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-2xl px-7 md:px-10 mx-auto">
        <div className=""></div>
        <div className="flex flex-col min-h-screen justify-center">
          <Card className="bg-white p-5 rounded-xl flex flex-col">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Login your account</CardTitle>
              <CardDescription>Enter your email below to login your account</CardDescription>
            </CardHeader>

            <LoginProviders />

            <LoginForm />
          </Card>
        </div>
      </div>
    </main>
  );
}
