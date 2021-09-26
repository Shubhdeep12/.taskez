import React, { useState, useEffect } from "react";
import "./Login.css";
import LoginSvg from "../svg/login-page-image.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../actions";
import { useHistory } from "react-router-dom";
function Login() {
  const isLoggedIn = useSelector((state) => state.authDetails.isLoggedIn);
  const dispatch = useDispatch();

  const history = useHistory();
  const [refresh, setRefresh] = useState(false);

  const [emailValue_signin, setEmailValue_signin] = useState("");
  const [passwordValue_signin, setPasswordValue_signin] = useState("");
  const [signInRemember, setSignInRemember] = useState(false);

  const [emailValue_signup, setEmailValue_signup] = useState("");
  const [passwordValue_signup, setPasswordValue_signup] = useState("");
  const [usernameValue_signup, setUsernameValue_signup] = useState("");
  const [signUpRemember, setSignUpRemember] = useState(false);

  const [loginForm, setLoginForm] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [signInErrorDisplay, setSignInErrorDisplay] = useState({
    message: "",
    state: false,
  });

  const [signUpErrorDisplay, setSignUpErrorDisplay] = useState({
    message: "",
    state: false,
  });
  const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const passwordPattern = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const usernamePattern = new RegExp(/^[A-Za-z\s]{1,}[.]{0,1}[A-Za-z\s]{0,}$/);

  const handlePassword = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    setEmailValue_signin("");
    setEmailValue_signup("");
    setPasswordValue_signin("");
    setPasswordValue_signup("");
    setUsernameValue_signup("");
    setSignInRemember(false);
    setSignUpRemember(false);
    setSignInErrorDisplay({
      state: false,
      message: "",
    });
    setSignUpErrorDisplay({
      state: false,
      message: "",
    });
  }, [refresh]);

  const responseTable_signin = async (e) => {
    e.preventDefault();

    try {
      if (!emailPattern.test(emailValue_signin)) {
        throw new Error("Please enter a valid Email");
      }
      if (!passwordPattern.test(passwordValue_signin)) {
        throw new Error("Please enter a valid Password");
      }
      setSignInErrorDisplay({
        state: false,
        message: "",
      });
    } catch (err) {
      setSignInErrorDisplay({
        state: true,
        message: err.message,
      });

      return;
    }
    try {
      const userSignInData = {
        email: emailValue_signin,
        password: passwordValue_signin,
      };

      const signInResponse = await axios.post("/Login/signin", userSignInData);
      console.log(signInResponse);
      dispatch(signIn(signInResponse.data.values.id));
      if (signInRemember) {
        localStorage.setItem("userId", signInResponse.data.values.id);
      } else {
        sessionStorage.setItem("userId", signInResponse.data.values.id);
      }
      history.push("/Main");
    } catch (err) {
      console.log(err.response);
      setSignUpErrorDisplay({
        state: true,
        message: "Invalid Details",
      });
    }
  };

  const responseTable_signup = async (e) => {
    e.preventDefault();
    try {
      if (!usernamePattern.test(usernameValue_signup)) {
        throw Error("Please enter a valid Username");
      }
      if (!emailPattern.test(emailValue_signup)) {
        throw Error("Please enter a valid Email");
      }
      if (!passwordPattern.test(passwordValue_signup)) {
        throw Error("Please enter a valid Password");
      }

      setSignUpErrorDisplay({
        state: false,
        message: "",
      });
    } catch (err) {
      setSignUpErrorDisplay({
        state: true,
        message: err.message,
      });
      return;
    }
    try {
      const userSignUpData = {
        email: emailValue_signup,
        name: usernameValue_signup,
        password: passwordValue_signup,
      };

      const signUpResponse = await axios.post("/Login/signup", userSignUpData);
      console.log(signUpResponse);
      dispatch(signIn(signUpResponse.data.values.id));
      if (signInRemember) {
        localStorage.setItem("userId", signUpResponse.data.values.id);
      } else {
        sessionStorage.setItem("userId", signUpResponse.data.values.id);
      }
      history.push("/Main");
    } catch (err) {
      console.log(err.response);
      setSignUpErrorDisplay({
        state: true,
        message: "Invalid Details",
      });
    }
  };
  return (
    <div className="login">
      <section className="image">
        <img src={LoginSvg} alt="no img" />
      </section>
      <section className="signinup">
        <div className="headings">
          <h3
            className={"signInHeading" + (loginForm ? "_active" : "")}
            onClick={(e) => {
              e.preventDefault();
              setLoginForm(true);
            }}
          >
            Log In
          </h3>
          <h3
            className={"signUpHeading" + (loginForm ? "" : "_active")}
            onClick={(e) => {
              e.preventDefault();
              setLoginForm(false);
            }}
          >
            Sign Up
          </h3>
        </div>

        <div className="formContainer">
          <div className="line"></div>
          {loginForm ? (
            <div className="signinForm">
              <form className="form" action="/" onSubmit={responseTable_signin}>
                <label className="label1Signin">To Continue</label>
                <label className="label2Signin">
                  {`we need your Name & email`}
                </label>
                <input
                  type="text"
                  className="signinEmail"
                  value={emailValue_signin}
                  onChange={(e) => {
                    setEmailValue_signin(e.target.value);
                  }}
                  placeholder="Email"
                  required
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="signinPassword"
                  placeholder="Password"
                  value={passwordValue_signin}
                  onChange={(e) => {
                    setPasswordValue_signin(e.target.value);
                  }}
                  required
                />
                <i className="eye" onClick={handlePassword}>
                  {passwordVisible ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </i>
                <div
                  className={
                    "Error" + (signInErrorDisplay.state ? "_display" : "")
                  }
                >
                  {signInErrorDisplay.message}
                </div>

                <input type="submit" className="signinButton" value="Log In" />
                <div className="remember">
                  <input
                    type="checkbox"
                    value={signInRemember}
                    onClick={(e) => {
                      setSignInRemember(!signInRemember);
                    }}
                  />{" "}
                  Remember Me
                </div>
              </form>
            </div>
          ) : (
            <div className="signupForm">
              <form className="form" action="/" onSubmit={responseTable_signup}>
                <input
                  type="text"
                  className="signupName"
                  placeholder="Full Name"
                  value={usernameValue_signup}
                  onChange={(e) => {
                    setUsernameValue_signup(e.target.value);
                  }}
                  required
                />
                <input
                  type="text"
                  className="signupEmail"
                  placeholder="Email"
                  value={emailValue_signup}
                  onChange={(e) => {
                    setEmailValue_signup(e.target.value);
                  }}
                  required
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="signupPassword"
                  placeholder="Password"
                  value={passwordValue_signup}
                  onChange={(e) => {
                    setPasswordValue_signup(e.target.value);
                  }}
                  required
                />
                <i className="eye" onClick={handlePassword}>
                  {passwordVisible ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </i>
                <div
                  className={
                    "Error" + (signUpErrorDisplay.state ? "_display" : "")
                  }
                >
                  {signUpErrorDisplay.message}
                </div>
                <input type="submit" className="signupButton" value="Sign Up" />
                <div className="remember">
                  <input
                    type="checkbox"
                    value={signUpRemember}
                    onClick={(e) => {
                      setSignUpRemember(!signUpRemember);
                    }}
                  />{" "}
                  Remember Me
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Login;
