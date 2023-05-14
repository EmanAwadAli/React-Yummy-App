import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import FilterMeals from "./components/FilterMeals/FilterMeals";
import CommonMeals from "./components/CommonMeals/CommonMeals";
import AreaMeals from "./components/AreaMeals/AreaMeals";
import IngredientMeals from "./components/IngredientMeals/IngredientMeals";
import MealDetails from "./components/MealDetails/MealDetails";
import Categories from "./components/Categories/Categories";
import CategoryMeals from "./components/CategoryMeals/CategoryMeals";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";

export default function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "/search", element: <Search /> },
        {
          path: "/filtermeals",
          element: <FilterMeals />,
          children: [
            { index: true, element: <CommonMeals /> },
            { path: "category/:category", element: <CategoryMeals /> },
            { path: "area/:area", element: <AreaMeals /> },
            { path: "ingredient/:ingredient", element: <IngredientMeals /> },
          ],
        },
        { path: "/meals/:id", element: <MealDetails /> },
        { path: "/categories", element: <Categories /> },
        { path: "/filtermeals/category/:category", element: <CategoryMeals /> },
        { path: "/contact", element: <Contact /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
