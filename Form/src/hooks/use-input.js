import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasErr = !valueIsValid && isTouched;

  const InputHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const InputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const resetValue = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasErr: hasErr,
    InputHandler,
    InputBlurHandler,
    resetValue,
  };
};

export default useInput;
