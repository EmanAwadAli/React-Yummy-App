import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import style from "./FilterMeals.module.css";

export default function FilterMeals() {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  async function getFilterdList(key, setList) {
    let { data } = await axios
      .get(`https://www.themealdb.com/api/json/v1/1/list.php?${key}=list`)
      .catch((err) => console.log(err.message));
    setList(data.meals);
  }

  useEffect(() => {
    getFilterdList("c", setCategories);
    getFilterdList("a", setAreas);
    getFilterdList("i", setIngredients);
  }, []);

  return (
    <>
      <Helmet>
        <title>Meals</title>
      </Helmet>
      <div className={`${style.filter_meals} d-flex py-5`}>
        <div className={style.filter}>
          <div>
            <h3 className={style.title}>
              <i className="fa-solid fa-list"></i>Categories
            </h3>
            <ul className={`${style.filter_list} list-unstyled`}>
              {categories.map((category, index) => (
                <li key={index}>
                  <NavLink
                    to={`category/${category.strCategory}`}
                    className="nav-link"
                  >
                    <i className="fa-solid fa-circle"></i>
                    {category.strCategory}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={style.title}>
              <i className="fa-solid fa-earth-americas"></i>Areas
            </h3>
            <ul className={`${style.filter_list} list-unstyled`}>
              {areas.slice(0, 10).map((area, index) => (
                <li key={index}>
                  <NavLink to={`area/${area.strArea}`} className="nav-link">
                    <i className="fa-solid fa-circle"></i>
                    {area.strArea}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={style.title}>
              <i className="fa-solid fa-utensils"></i>Ingredients
            </h3>
            <ul className={`${style.filter_list} list-unstyled`}>
              {ingredients.slice(0, 10).map((ingredient, index) => (
                <li key={index}>
                  <NavLink
                    to={`ingredient/${ingredient.strIngredient}`}
                    className="nav-link"
                  >
                    <i className="fa-solid fa-circle"></i>
                    {ingredient.strIngredient}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${style.meals} filtered-meals`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
