import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

export default function CommonMeals() {
  const [commonMeals, setCommonMeals] = useState(null);

  async function getCommonMeals() {
    let { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=
      `
    );
    setCommonMeals(data.meals);
  }

  useEffect(() => {
    getCommonMeals();
  }, []);

  return (
    <>
      <div className="heading">
        <h2 className="title">
          <i className="fa-solid fa-seedling"></i>
          Common
          <span> Meals </span>
        </h2>
      </div>
      {commonMeals ? (
        <div className="row g-4">
          {commonMeals.map((meal) => (
            <Card meal={meal} key={meal.idMeal} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
