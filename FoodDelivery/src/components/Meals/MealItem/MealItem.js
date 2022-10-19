import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const Mealtem = (props) => {
  const Ctx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const AddToCartHandler = (amount) => {
    Ctx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={AddToCartHandler} />
      </div>
    </li>
  );
};

export default Mealtem;
