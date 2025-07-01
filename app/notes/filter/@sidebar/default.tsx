import css from "./SidebarNotes.module.css";

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <a href={`/notes/filter/{tag}`} className={css.menuLink}>
          Назва тегу
        </a>
      </li>
    </ul>
  );
};

export default SidebarNotes;
