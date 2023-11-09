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
    <CardContent className="grid grid-cols-2 gap-6">
      {providers.map(({ providerName, Icon }) => (
        <Button variant={"outline"} key={providerName} onClick={handleOAuthSignIn(providerName)}>
          <strong className="capitalize">{providerName}</strong>
        </Button>

        //   <Button variant="default" component="a" leftIcon={<Icon className="h-5 w-5 fill-white" />} key={name} onClick={async () => signIn(`${name}, undefined`, { prompt: "select_account" })} size="xl" className="my-1">
        //   Sign in with {name}
        // </Button>
      ))}
    </CardContent>
  );
}
