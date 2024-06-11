import LoginLostForm from "@/components/login/login-lost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perdeu sua senha | Dogs",
  description: "Recupere a sua senha.",
};

export const dynamic = "force-dynamic";

export default function LostAccountPage() {
  return (
    <div className="fadeLeft">
      <h1 className="title">Perdeu a senha?</h1>
      <LoginLostForm />
    </div>
  );
}
