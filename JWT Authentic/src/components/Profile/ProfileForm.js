import classes from "./ProfileForm.module.css";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPassWordInputRef = useRef();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsFirstLoad(false);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkKL5dldk66yoQ-vveEdspAvV5UydSl5k",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassWordInputRef.current.value,
          returnSecureToken: false,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          //success
          setIsSuccess(true);
          return res.json();
        } else {
          setIsSuccess(false);
        }
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassWordInputRef} />
      </div>
      {isSuccess && <p>Password changed successfully!</p>}
      {!isSuccess && !isFirstLoad && <p>Password changed failed!</p>}
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
