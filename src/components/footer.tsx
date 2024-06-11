import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src="/assets/dogs-footer.svg" alt="dogs" width={28} height={22} />
      <p className={styles.copy}>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
}
