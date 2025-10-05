import LoginForm from "@/components/loginPage/LoginForm";
import Logo from "@/components/shared/Logo";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col py-[80px] gap-y-[32px] justify-center items-center">
      <Logo />
      <LoginForm />
    </div>
  );
}
