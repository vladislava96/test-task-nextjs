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
        Step 1
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/step-2" ? styles.active : ""
        }`}
        href="/step-2"
      >
        Step 2
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/step-3" ? styles.active : ""
        }`}
        href="/step-3"
      >
        Step 3
      </Link>
    </nav>
  );
};
