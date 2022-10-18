import React, { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import CartButton from "./HeaderCartButton";

function Header() {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <CartButton />
      </header>
      <div>
        <img src={mealsImage} alt="meals" className={classes["main-image"]} />
      </div>
    </Fragment>
  );
}

export default Header;
