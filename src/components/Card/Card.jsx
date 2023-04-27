import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import style from "./Card.module.css";

export default function Card({ meal }) {
  const { strMeal, strMealThumb, idMeal } = meal;
  return (
    <>
      <div className={`${style.col} col-6 col-sm-4 col-md-3 col-xl-2`}>
        <Link className="text-dark" to={`/meals/${idMeal}`}>
          <div
            className={`${style.inner} position-relative rounded-3 overflow-hidden`}
          >
            {strMealThumb ? (
              <img
                src={strMealThumb}
                className="w-100 img-fluid"
                alt={strMeal}
              />
            ) : (
              <img
                src={logo}
                className="w-100 img-fluid opacity-50"
                alt={strMeal}
              />
            )}

            <div className="layer w-100 h-100 position-absolute start-0 d-flex align-items-center p-3">
              <h2 className={`${style.title} meal-title`}>
                {strMeal.split(" ").slice(0, 3).join(" ")}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
