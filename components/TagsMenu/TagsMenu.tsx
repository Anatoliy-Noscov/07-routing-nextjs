"use client";
import css from "./TagsMenu.module.css";
import { useState } from "react";
import Link from "next/link";

const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"] as const;

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={css.menuButton}
        aria-expanded={isOpen}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href="/notes/filter" className={css.menuLink}>
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
