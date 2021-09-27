import "./App.css";
import React from "react";
import { Login, MainPage } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signout } from "./actions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.authDetails.isLoggedIn);
  const currentTheme = useSelector((state) => state.themeDetails.theme);
  const dispatch = useDispatch();
  if (localStorage.getItem("userId") && localStorage.getItem("userId") !== "") {
    dispatch(signIn(localStorage.getItem("userId")));
  } else if (
    sessionStorage.getItem("userId") &&
    sessionStorage.getItem("userId") !== ""
  ) {
    dispatch(signIn(sessionStorage.getItem("userId")));
  }
  return (
    <div className={currentTheme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/Main" exact>
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
