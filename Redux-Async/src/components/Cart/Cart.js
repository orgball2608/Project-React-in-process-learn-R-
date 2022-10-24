import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartVisable = useSelector((state) => state.ui.isVisable);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Fragment>
      {cartVisable && (
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          {totalQuantity === 0 && <p>No items in cart</p>}
          {totalQuantity > 0 && (
            <ul>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={{
                    id: item.id,
                    title: item.name,
                    quantity: item.quantity,
                    total: item.total,
                    price: item.price,
                  }}
                />
              ))}
            </ul>
          )}
        </Card>
      )}
    </Fragment>
  );
};

export default Cart;
