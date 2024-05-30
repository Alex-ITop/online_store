import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "../../styles/Sidebar.module.css";

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>КАТЕГОРИИ</div>
      <nav>
        <ul className={styles.menu}>
          {list.map(({ id, name }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active :""}`
                }
                to={`/categories/${id}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/help" target="_blank" className={styles.link}>
          Помощь
        </a>
        <a
          href="/terms"
          target="_blank"
          className={styles.link}
          style={{ textDecoration: "underline" }}
        >
          Правила & Условия
        </a>
      </div>
    </section>
  );
};

export default Sidebar;