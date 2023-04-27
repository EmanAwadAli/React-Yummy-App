import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

export default function CategoryMeals() {
  const [categoryMeals, setCategoryMeals] = useState(null);
  let { category } = useParams();

  async function getCategoryMeals() {
    let { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    setCategoryMeals(data.meals);
  }

  useEffect(() => {
    getCategoryMeals();
  }, [categoryMeals]);

  return (
    <>
      <div className="heading heading_small">
        <h2 className="title">
          <i className="fa-solid fa-seedling"></i>
          {category}
          <span> Meals</span>
        </h2>
      </div>
      {categoryMeals ? (
        <div className="row g-4">
          {categoryMeals.map((meal) => (
            <Card meal={meal} key={meal.idMeal} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
