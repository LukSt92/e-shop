import LoginForm from "@/components/loginPage/LoginForm";
import Logo from "@/components/shared/Logo";

export default async function LoginPage() {
  return (
    <div className="flex flex-col py-[80px] gap-y-[32px] justify-center items-center">
      <Logo />
      <LoginForm />
    </div>
  );
}
