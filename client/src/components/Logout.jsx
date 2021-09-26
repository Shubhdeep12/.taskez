import React from "react";
import "./Logout.css";

function Logout() {
  return (
    <div className="logoutComponent">
      <span className="logoutText">Are you sure?</span>
      <input className="logoutButton" type="button" value="Yes" />
    </div>
  );
}

export default Logout;
