import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };


  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <button>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <a
      href="/login"
    >
      Login
    </a>
  );
}
