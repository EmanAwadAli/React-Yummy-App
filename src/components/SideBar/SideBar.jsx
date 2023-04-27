import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import style from "./SideBar.module.css";

export default function SideBar({
  sideBar,
  innerSidebar,
  sideBarIcon,
  closeSideBar,
  checkSideBarStatus,
}) {
  return (
    <nav ref={sideBar} className={style.sidebar}>
      <div ref={innerSidebar} className={style.inner_sidebar}>
        <ul className="navbar-nav m-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" onClick={closeSideBar}>
              <i class="fa-solid fa-house"></i> Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/search" onClick={closeSideBar}>
              <i class="fa-solid fa-magnifying-glass"></i> Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/filtermeals"
              onClick={closeSideBar}
            >
              <i class="fa-solid fa-utensils"></i> Meals
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/categories"
              onClick={closeSideBar}
            >
              <i class="fa-solid fa-list"></i> Categories
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact" onClick={closeSideBar}>
              <i class="fa-solid fa-paper-plane"></i> Contact Us
            </NavLink>
          </li>
        </ul>
        <div className={style.copyright}>
          <div className={style.social_icons}>
            <a href="https://facebook.com">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://youtube.com">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
          <p>Copyright &copy; 2023 All Rights Reserved.</p>
        </div>
      </div>
      <div className={style.control_bar}>
        <Link to="/" className={style.logo}>
          <img src={logo} alt="logo" className="img-fluid" />
        </Link>
        <i
          ref={sideBarIcon}
          className={`${style.icon} fa-solid fa-bars pointer`}
          onClick={checkSideBarStatus}
        ></i>
        <ul className={`${style.icons} list-unstyled`}>
          <li>
            <i className="fa-solid fa-earth-americas pointer"></i>
          </li>
          <li>
            <i className="fa-solid fa-share-nodes pointer"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}
