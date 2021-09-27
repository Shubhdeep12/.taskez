import React from "react";
import "./Logout.css";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { signout } from "../actions";
import { useHistory } from "react-router-dom";

function Logout(refresh, setRefresh) {
  const dispatch = useDispatch();

  const history = useHistory();
  return (
    <div className="logoutComponent">
      <span className="logoutText">Are you sure?</span>
      <input
        className="logoutButton"
        type="button"
        value="Yes"
        onClick={async () => {
          await axios.get("/logout");
          dispatch(signout());
          localStorage.setItem("userId", "");
          sessionStorage.setItem("userId", "");
          setRefresh(!refresh);
        }}
      />
    </div>
  );
}

export default Logout;
