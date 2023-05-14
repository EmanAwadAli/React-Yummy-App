import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

export default function AreaMeals() {
  const [areaMeals, setAreaMeals] = useState(null);
  let { area } = useParams();

  async function getAreaMeals() {
    let { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );

    setAreaMeals(data.meals);
  }

  useEffect(() => {
    getAreaMeals();
  }, [areaMeals]);

  return (
    <>
      <div className="heading">
        <h2 className="title">
          <i className="fa-solid fa-seedling"></i>
          {area}
          <span> Meals</span>
        </h2>
      </div>
      {areaMeals ? (
        <div className="row g-4">
          {areaMeals.map((meal) => (
            <Card meal={meal} key={meal.idMeal} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
