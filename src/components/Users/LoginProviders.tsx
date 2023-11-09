"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CardContent } from "../ui/card";

const providers = [
  {
    providerName: "github",
    Icon: "",
  },
  {
    providerName: "google",
    Icon: "",
  },
];
export default function LoginProviders() {
  const router = useRouter();

  const handleOAuthSignIn = (provider: string) => () => {
    // Your custom logic here
    // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
    // Then call signIn with custom options
    signIn(provider);
  };

  return (
    <CardContent className="grid gap-4">
      <div className="grid grid-cols-2 gap-6">
        {providers.map(({ providerName, Icon }) => (
          <Button variant={"outline"} key={providerName} onClick={handleOAuthSignIn(providerName)}>
            <strong className="capitalize">{providerName}</strong>
          </Button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
    </CardContent>
  );
}
