import RegisterForm from "@/components/registerPage/RegisterForm";
import Logo from "@/components/shared/Logo";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col py-[77px] gap-y-[32px] justify-center items-center">
      <Logo />
      <RegisterForm />
    </div>
  );
}
