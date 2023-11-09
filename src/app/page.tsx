import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionDataCheck from "@/components/SessionDataCheck";
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <main className="max-w-screen-2xl px-7 md:px-10 mx-auto">
        <h1 className="text-center text-4xl xl:text-5xl uppercase font-bold">Next Auth Setup</h1>


        <h1> Server side Render </h1>
        <pre>{JSON.stringify(session)}</pre>

        <h1> Client side Render </h1>
        <SessionDataCheck />
      </main>
    </>
  );
}
