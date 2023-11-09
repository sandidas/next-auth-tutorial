import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";
import NavigationMenubar from "@/components/Navigation/NavigationMenubar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="bg-slate-200">
        <SessionProvider>
          <NavigationMenubar />
          {children}

          {/* <main className="max-w-screen-2xl px-7 md:px-10 mx-auto"></main> */}
          {/* React Hot Toast */}
          <ToasterContext />
        </SessionProvider>
      </body>
    </html>
  );
}
