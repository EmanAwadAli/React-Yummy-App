import React from "react";

import "./NotFound.css";

export default function NotFound({ title }) {
  return (
    <div className="not_found">
      <h2>
        <i class="fa-solid fa-drumstick-bite fa-fade"></i>
        <span>Page</span> Not Found
      </h2>
    </div>
  );
}
