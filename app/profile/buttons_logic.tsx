import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const emailChange = async (formData: FormData) => {
  const supabase = createClient();
  const newEmail = formData.get('email') as string;

  const { error } = await supabase.auth.updateUser({
    email: newEmail,
  })

  if (error) {
    return redirect("/profile?message=Could not change the user email")
  }

  return redirect("/profile?message=Congrats! Please confirm this change by opening the email in your previous inbox.")
}

export const passChange = async (formData: FormData) => {
  "use server"
  const supabase = createClient();
  const newPassword = formData.get('password') as string;

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) return redirect('/profile?message=Could not change the users password')

  return redirect("profile?message=Congrats! Please confirm the password change by opening the email sent to your address.")
}