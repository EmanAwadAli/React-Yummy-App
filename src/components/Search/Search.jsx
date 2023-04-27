import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Card from "./../Card/Card";
import style from "./Search.module.css";

export default function Search() {
  const [meals, setMeals] = useState(null);

  async function getMeals(type, term) {
    let { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${term}`
    );
    term && data.meals ? setMeals(data.meals) : setMeals(null);
  }

  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className={`${style.search_form} py-5`}>
        <form>
          <input
            type="search"
            placeholder="Search By Meal Name"
            name="searchByName"
            id="searchByName"
            className="form-control"
            onChange={(e) => {
              if (/^[a-zA-Z]+/.test(e.target.value) || e.target.value === "") {
                getMeals("s", e.target.value);
              }
            }}
          />
          <input
            type="search"
            placeholder="Search By First Letter"
            name="searchByFirstLetter"
            id="searchByFirstLetter"
            className="form-control"
            onChange={(e) => {
              if (/^[a-zA-Z]+/.test(e.target.value) || e.target.value === "") {
                getMeals("f", e.target.value);
              }
            }}
          />
        </form>
      </div>
      {meals ? (
        <div className="search_results pb-5">
          <div className="row g-3">
            {meals.map((meal) => (
              <Card meal={meal} key={meal.idMeal} />
            ))}
          </div>
        </div>
      ) : (
        <h2 className={style.not_found}>
          <i class="fa-solid fa-magnifying-glass"></i> No Meals Found
        </h2>
      )}
    </>
  );
}
