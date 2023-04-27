import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import style from "./MealDetails.module.css";

export default function MealDetails() {
  const [meal, setMeal] = useState(null);
  const { id } = useParams();
  async function getMealDetails() {
    let { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return data.meals[0];
  }

  async function getRecipeReady() {
    let mealDetails = await getMealDetails();
    mealDetails.ingredients = [];
    let recipeDetails = new Map(Object.entries(mealDetails));
    for (let i = 1; i < recipeDetails.size; i++) {
      if (recipeDetails.get(`strIngredient${i}`)) {
        mealDetails.ingredients.push(
          `${recipeDetails.get(`strMeasure${i}`)} ${recipeDetails.get(
            `strIngredient${i}`
          )}`
        );
      }
    }
    setMeal(mealDetails);
  }

  useEffect(() => {
    getRecipeReady();
  }, []);

  return (
    <>
      <Helmet>
        <title>Meal Details</title>
      </Helmet>
      {meal ? (
        <div className="meal_details py-5">
          <div className="heading heading_lg">
            <h2 className="title title-large">
              <i className="fa-solid fa-seedling"></i>
              {meal.strMeal}
            </h2>
            <ul className={`${style.info} list-unstyled d-flex`}>
              {meal.strArea && (
                <li>
                  <label>Area : </label>
                  <span>{meal.strArea}</span>
                </li>
              )}
              {meal.strCategory && (
                <li>
                  <label>Category : </label>
                  <span>{meal.strCategory}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="row">
            <div className="col-xl-4">
              <div className={style.image}>
                <img
                  src={`${meal.strMealThumb}`}
                  alt={meal.strMeal}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-xl-8">
              <div className={style.details}>
                <div className={style.instructions}>
                  <h3 className={style.sub_title}>
                    <i class="fa-regular fa-rectangle-list"></i> Instructions
                  </h3>
                  <p>{meal.strInstructions}</p>
                </div>
                {meal.ingredients && (
                  <div className={style.ingradients}>
                    <h3 className={style.sub_title}>
                      <i class="fa-solid fa-whiskey-glass"></i> Ingradients :{" "}
                    </h3>
                    {meal.ingredients?.map((ing) => (
                      <span key={ing} className="rounded-2">
                        {ing}
                      </span>
                    ))}
                  </div>
                )}
                {meal.strTags && (
                  <div className={style.tags}>
                    <h3 className={style.sub_title}>
                      <i class="fa-solid fa-tags fa-flip-horizontal"></i> Tags :{" "}
                    </h3>
                    {meal.strTags?.split(",").map((tag) => (
                      <span key={tag} className="rounded-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {meal.strSource || meal.strYoutube ? (
                  <>
                    <h3 className={style.sub_title}>Sources : </h3>
                    <ul className={`${style.links} list-unstyled d-flex`}>
                      {meal.strSource ? (
                        <li>
                          <Link to={meal.strSource} className="rounded-2">
                            <i class="fa-solid fa-link"></i>
                            Source
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}
                      {meal.strYoutube ? (
                        <li>
                          <Link
                            to={meal.strYoutube}
                            className={`${style.youtube} rounded-2`}
                          >
                            <i class="fa-brands fa-youtube"></i>
                            Youtube
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
