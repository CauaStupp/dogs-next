import LoginResetForm from "@/components/login/login-reset";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resete sua senha | Dogs",
  description: "Resete sua senha",
};

interface ResetPageProps {
  searchParams: {
    key: string;
    login: string;
  };
}

export default function ResetAccountPage({ searchParams }: ResetPageProps) {
  return (
    <div className="fadeLeft">
      <h1>Resete a Senha</h1>
      <LoginResetForm keyToken={searchParams.key} login={searchParams.login} />
    </div>
  );
}
