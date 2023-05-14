import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

export default function IngredientMeals() {
  const [ingredientMeals, setIngredientMeals] = useState(null);
  let { ingredient } = useParams();

  async function getIngredientMeals() {
    let { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    setIngredientMeals(data.meals);
  }

  useEffect(() => {
    getIngredientMeals();
  }, [ingredientMeals]);

  return (
    <>
      <div className="heading">
        <h2 className="title">
          <i className="fa-solid fa-seedling"></i>
          {ingredient}
          <span> Meals</span>
        </h2>
      </div>
      {ingredientMeals ? (
        <div className="row g-4">
          {ingredientMeals.map((meal) => (
            <Card meal={meal} key={meal.idMeal} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
