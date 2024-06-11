import LoginForm from "@/components/login/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Dogs",
  description: "Faça Login na sua conta.",
};

export default function LoginPage() {
  return (
    <section className="fadeLeft">
      <h1 className="title">Login</h1>
      <LoginForm />
    </section>
  );
}
