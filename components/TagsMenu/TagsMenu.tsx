"use client";

import css from "./TagsMenu.module.css";
import { useState } from "react";
import Link from "next/link";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          <li className={css.menuItem}>
            <Link href={`/notes/filter/Work`} className={css.menuLink}>
              Назва тегу
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;

{
  /* <ul className={css.menu}>
  <li className={css.menuItem}>
    <Link href={`/notes/filter/all`} onClick={toggle}>
      All notes
    </Link>
  </li>
  {categories.map((category) => (
    <li key={category.id} className={css.menuItem}>
      <Link href={`/notes/filter/${category.id}`} onClick={toggle}>
        {category.name}
      </Link>
    </li>
  ))}
</ul>; */
}
