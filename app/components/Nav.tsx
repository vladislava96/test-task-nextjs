"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/layout.module.css";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/step-2" ? styles.active : ""
        }`}
        href="/step-2"
      >
        Editing
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/step-3" ? styles.active : ""
        }`}
        href="/step-3"
      >
        Creating
      </Link>
    </nav>
  );
};
