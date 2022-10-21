import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasErr: nameInputHasErr,
    InputHandler: nameInputHandler,
    InputBlurHandler: nameInputBlurHandler,
    resetValue: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  // regex check for email
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasErr: emailInputHasErr,
    InputHandler: emailInputHandler,
    InputBlurHandler: emailInputBlurHandler,
    resetValue: resetEmailInput,
  } = useInput((value) => value.match(validRegex));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    resetEmailInput();
    resetNameInput();
  };

  const nameInputClasses = nameInputHasErr
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasErr
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasErr && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailInputHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasErr && (
          <p className="error-text">Email must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
