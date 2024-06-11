"use client";

import { useEffect, useState } from "react";
import MyPhotos from "@/components/icons/feed-icon";
import Stats from "@/components/icons/estatisticas-icon";
import NewPhoto from "@/components/icons/adicionar-icon";
import Logout from "@/components/icons/sair-icon";
import styles from "./menu-account.module.css";
import useMedia from "@/hooks/use-media";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logout from "@/actions/logout";
import { useUserContext } from "@/contexts/userContext";

function getTitle(pathname: string) {
  switch (pathname) {
    case "/conta/postar":
      return "Poste Sua Foto";
    case "/conta/estatisticas":
      return "Estatísticas";
    default:
      return "Minha Conta";
  }
}

export default function MenuAccount() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const mobile = useMedia("(max-width: 40rem)");
  const pathname = usePathname();
  const { setUser } = useUserContext();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <header className={styles.header}>
      <h1 className="title">{getTitle(pathname)}</h1>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.menuMobile} ${mobileMenu && styles.menuActive}`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <Link href="/conta" className={pathname === "/conta" ? "active" : ""}>
          <MyPhotos />
          {mobile && "Minhas Fotos"}
        </Link>
        <Link
          href="/conta/estatisticas"
          className={pathname === "/conta/estatisticas" ? "active" : ""}
        >
          <Stats />
          {mobile && "Estatísticas"}
        </Link>
        <Link
          href="/conta/postar"
          className={pathname === "/conta/postar" ? "active" : ""}
        >
          <NewPhoto />
          {mobile && "Adicionar Foto"}
        </Link>
        <button onClick={handleLogout}>
          <Logout />
          {mobile && "Sair"}
        </button>
      </nav>
    </header>
  );
}
