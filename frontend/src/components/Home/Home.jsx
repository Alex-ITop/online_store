import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterByPrice } from "../../features/products/productsSlice";

import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";

const Home = () => {
  const dispatch = useDispatch();
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);

  useEffect(() => {
    if (!list.length) return;

    dispatch(filterByPrice(10000));
  }, [dispatch, list.length]);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Популярное" />
      <Categories products={categories.list} amount={5} title="Стоит посмотреть" />
      <Banner />
      <Products products={filtered} amount={5} title="Дешевле 10000₽" />
    </>
  );
};

export default Home;
