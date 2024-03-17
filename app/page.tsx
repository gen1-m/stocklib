import AuthButton from "@/components/AuthButton"
import MyParticles from "@/components/MyParticles";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";
import Link from "next/link";

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
      <div className="flex flex-col gap-2">
        <Button className="text-lg bg-orange-700" size="lg">
          <AuthButton />
        </Button>
        <p className="text-md text-white text-center">
          or
        </p>
        <Button className="text-lg" size="lg">
          <Link href="/news">
            Go straight to <span className="text-orange-500 italic">news</span> 
          </Link>
        </Button>
        
      </div>
    </main>
  )
}

