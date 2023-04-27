import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./../SideBar/SideBar";

export default function Layout() {
  const sideBar = useRef(null);
  const innerSidebar = useRef(null);
  const sideBarIcon = useRef(null);
  const mainContent = useRef(null);

  function checkSideBarStatus() {
    let left = window
      .getComputedStyle(sideBar.current)
      .getPropertyValue("left");
    if (left === "0px") {
      closeSideBar();
    } else {
      openSideBar();
    }
  }

  function closeSideBar() {
    let innerSidebarWidth = innerSidebar.current.offsetWidth;
    sideBar.current.style.left = `-${innerSidebarWidth}px`;
    mainContent.current.style.marginLeft = "0";
    sideBarIcon.current.classList.replace("fa-xmark", "fa-bars");
  }

  function openSideBar() {
    let innerSidebarWidth = innerSidebar.current.offsetWidth;
    sideBar.current.style.left = "0";
    mainContent.current.style.marginLeft = `${innerSidebarWidth}px`;
    sideBarIcon.current.classList.replace("fa-bars", "fa-xmark");
  }
  return (
    <>
      <SideBar
        sideBar={sideBar}
        innerSidebar={innerSidebar}
        sideBarIcon={sideBarIcon}
        checkSideBarStatus={checkSideBarStatus}
        closeSideBar={closeSideBar}
      />
      <main ref={mainContent} className="main">
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
    </>
  );
}
