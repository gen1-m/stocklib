import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CustomModal from "@/components/EmailChangeModal";
import { passChange } from "./buttons_logic";

export const emailChange = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  const newEmail = formData.get("email") as string;

  const { error } = await supabase.auth.updateUser({
    email: newEmail,
  });

  if (error) {
    return redirect("/profile?message=Could not change the user email");
  }

  return redirect(
    "/profile?message=Congrats! Please confirm this change by opening the email in your previous inbox."
  );
};

export default async function Profile({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div className="flex flex-col bg-black w-full h-screen justify-center items-center place-self-center py-32">
        {/* title */}
        <div className="text-3xl pb-32 ">Profile page</div>
        {/* settings */}
        <div className="flex flex-col justify-between gap-5">
          <div className="flex text-xl justify-between gap-unit-8xl items-center">
            <span>change email address</span>
            <CustomModal
              type="email"
              action={emailChange}
              label="Email"
              name="Email"
              htmlFor="email"
              placeholder="you@mail.com"
            />
          </div>
          <div className="flex text-xl justify-between gap-unit-8xl items-center">
            <span>change password</span>
            <CustomModal
              type="password"
              action={passChange}
              label="Password"
              name="Password"
              htmlFor="password"
              placeholder="********"
            />
          </div>
          {/* <div className="flex text-xl justify-between gap-unit-8xl items-center">
            <span className="">change profile picture</span>
            <Button className="bg-zinc-800 text-base">Change</Button>
          </div>
          <div className="flex text-xl justify-between gap-unit-8xl items-center">
            <span className="text-danger-300">logout</span>
            <Button className="text-base text-danger-50" color="danger">
              Change
            </Button>
          </div>
          <div className="flex text-xl justify-between gap-unit-8xl items-center">
            <span className="text-danger-300">delete my account</span>
            <Button className=" text-base text-danger-50" color="danger">
              Change
            </Button>
          </div> */}
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 rounded-md text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
