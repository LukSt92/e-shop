import RegisterForm from "@/components/registerPage/RegisterForm";
import Logo from "@/components/shared/Logo";

export default async function RegisterPage() {
  return (
    <div className="flex flex-col py-[77px] gap-y-[32px] justify-center items-center">
      <Logo />
      <RegisterForm />
    </div>
  );
}
