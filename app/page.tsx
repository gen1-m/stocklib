import AuthButton from "@/components/AuthButton"
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
    <>
      <h1 className="text-3xl text-center p-2">
        Welcome to StockLib
      </h1>
      <br />
      <AuthButton />
    </>
  )
}
