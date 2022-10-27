import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPassWordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

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
          return res.json();
        } else {
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
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
