import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionDataCheck from "@/components/SessionDataCheck";
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Next Auth Setup</h1>
      <Link prefetch={false} href={"login"}>
        Login Now
      </Link>

      <Link prefetch={false} href={"register"}>
        Register Now
      </Link>
      <h1> Server side Render </h1>
      <pre>{JSON.stringify(session)}</pre>

      <h1> Client side Render </h1>
      <SessionDataCheck />
    </div>
  );
}
