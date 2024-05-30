import React from "react";

import styles from "../../styles/Home.module.css";

import bannerImg from "../../images/banner.png";

const Banner = () => (
  <section className={styles.banner}>
    <div className={styles.left}>
      <p className={styles.content}>
        ЛЕТНИЙ СЕЗОН
        <span>СКИДКИ</span>
      </p>
      <button className={styles.more}>Показать ещё</button>
    </div>

    <div
      className={styles.right}
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <p className={styles.discount}>
        Экономия до <span>50%</span>
      </p>
    </div>
  </section>
);

export default Banner;
