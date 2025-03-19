import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default function ProfileLink() {
  const supabase = createClient();

  const user = supabase.auth.getUser();

  return (user !== null) ? (
    <Link href="/profile" color="foreground">
      Profile
    </Link>
  ) : 
  (<></>)
}
