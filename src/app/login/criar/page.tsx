import LoginCreateForm from "@/components/login/login-create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie sua conta",
  description: "Crie sua conta no site Dogs.",
};

export default function CreateAccountPage() {
  return (
    <div className="fadeLeft">
      <h1 className="title">Cadastre-se</h1>
      <LoginCreateForm />
    </div>
  );
}
