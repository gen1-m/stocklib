import AuthButton from "@/components/AuthButton"
import MyParticles from "@/components/MyParticles";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/protected");
  }

  return (
    <main className="flex flex-col items-center justify-center gap-y-10 my-auto">
      <MyParticles />
      <h1 className="text-5xl text-center p-2 max-w-2xl font-semibold">
        Choose your stocks to invest, then reap the success
      </h1>
      <AuthButton />
    </main>
  )
}

