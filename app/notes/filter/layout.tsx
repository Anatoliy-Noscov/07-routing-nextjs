import css from "./layout.module.css";

export default function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <section className={css.section}>
      <aside className={css.aside}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </section>
  );
}
