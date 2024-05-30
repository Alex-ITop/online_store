import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../features/user/userSlice";

import styles from "../../styles/Profile.module.css";
// import styles from "../../styles/Sidebar.module.css";

const Admin = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
         <h1>Приветствую, Администратор!</h1>
         <br></br>
         <br></br>
         <span>Произвести генерацию отчётов:</span>
         <br></br>
         <br></br>

         <a download className={styles.menu} href="http://localhost:3001/api/data/" target="_blank">Сгенерировать отчёт о Клиентах</a>
         <a className={styles.menu} href="http://localhost:3001/api/data/payment?date_length=year" target="_blank">Сгенерировать отчёт о Продажах за период</a>
         <a className={styles.menu} href="http://localhost:3001/api/data/user/?date_length=year" target="_blank">Сгенерировать отчёт о Запасах товаров</a>
         <a className={styles.menu} href="http://localhost:3001/api//data/article/?less_than=4" target="_blank">Сгенерировать отчёт о Последних заказах</a>
         <a className={styles.menu} href="http://localhost:3001/api/data/article-income?article_id=3" target="_blank">Сгенерировать отчёт об Общей финансовой отчётности</a>

         <a className={styles.menu} href="http://localhost:3001/api/data/payment?date_length=year" target="_blank">Сгенерировать отчёт о Возврате товаров</a>
         <a className={styles.menu} href="http://localhost:3001/api/data/" target="_blank">Сгенерировать отчёт о Доходности товаров</a>
         
      {/* {!currentUser ? (
        <span>Вам нужно авторизоваться</span>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Ваш email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <input
              type="name"
              placeholder="Ваше имя"
              name="name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <input
              type="password"
              placeholder="Ваш пароль"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.group}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Продолжить
          </button>
        </form>
      )} */}
    </section>
  );
};

export default Admin;
