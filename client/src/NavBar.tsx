import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Users</Link>
        </li>
        <li className={location.pathname === "/add-new-user" ? "active" : ""}>
          <Link to="/add-new-user">New User</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
