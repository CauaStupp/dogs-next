import MenuAccount from "@/components/account/menu-account";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <MenuAccount />
      {children}
    </div>
  );
}
