import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";
import { Fragment } from "react";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();
  const showCounter = useSelector((state) => state.counter.showCounter);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const IncrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const IncreaseHandler = () => {
    dispatch(counterActions.increase(10));
  };

  const DecrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };
  return (
    <Fragment>
      {isAuthenticated && (
        <main className={classes.counter}>
          <h1>Redux Counter</h1>
          {showCounter && <div className={classes.value}>{counter}</div>}
          <button onClick={IncrementHandler}>Increment Counter</button>
          <button onClick={IncreaseHandler}>Increase Counter</button>
          <button onClick={DecrementHandler}>Decrement Counter</button>
          <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
      )}
    </Fragment>
  );
};

export default Counter;
