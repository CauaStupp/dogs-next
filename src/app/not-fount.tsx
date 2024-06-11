import Link from "next/link";

export default function NotFount() {
  return (
    <section>
      <h1 className="title">Página não encontrada</h1>
      <Link
        href="/"
        className="button"
        style={{ marginTop: "1rem", display: "inline-block" }}
      >
        Volte para Home
      </Link>
    </section>
  );
}
