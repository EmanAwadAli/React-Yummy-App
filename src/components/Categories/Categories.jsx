import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./../Loading/Loading";
import style from "./Categories.module.css";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    let { data } = await axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .catch((err) => console.log(err));
    setCategories(data.categories);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {categories ? (
        <div className="categories py-5">
          <div className="heading heading_lg">
            <h2 className="title">
              <i class="fa-solid fa-list"></i> Categories
            </h2>
          </div>
          <div className="row">
            {categories.slice(0, 12).map((category) => (
              <div
                className="col-sm-6 col-lg-4 col-xl-3 mb-4"
                key={category.idCategory}
              >
                <Link
                  className={`${style.category_item} rounded-5`}
                  to={`/filtermeals/category/${category.strCategory}`}
                >
                  <div className={style.image}>
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="img-fluid"
                    />
                  </div>
                  <div className={style.details}>
                    <h2 className={style.title}>{category.strCategory}</h2>
                    <p>
                      {category.strCategoryDescription
                        .split(" ")
                        .slice(0, 25)
                        .join(" ")}
                    </p>
                    <span className="rounded-3">
                      Meals <i class="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      ;
    </>
  );
}
