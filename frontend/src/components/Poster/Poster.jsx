import React from "react";

import styles from "../../styles/Home.module.css";

import BG from "../../images/computer.png";

const Poster = () => (
  <section className={styles.home}>
    <div className={styles.title}>СКИДКА 20%</div>
    <div className={styles.product}>
      <div className={styles.text}>
        <div className={styles.subtitle}>Бестселлер 2022</div>
        <h1 className={styles.head}>LENNON r2d2 И NVIDIA 5090 TI</h1>
        <button className={styles.button}>Купить сейчас</button>
      </div>
      <div className={styles.image}>
        <img src={BG} alt="" />
      </div>
    </div>
  </section>
);

export default Poster;
