import React from "react";
import { toggle } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import "./Setting.css";

function Setting() {
  let currentTheme = useSelector((state) => state.themeDetails.theme);
  const dispatch = useDispatch();
  return (
    <div className="settingComponent">
      <span className="settingText">Change Theme</span>
      <label className="switch">
        <input
          className="themeToggleCheckbox"
          checked={currentTheme === "Light" ? false : true}
          onClick={() => {
            if (currentTheme === "Light") {
              dispatch(toggle("Dark"));
              localStorage.setItem("theme", "Dark");
            } else {
              dispatch(toggle("Light"));
              localStorage.setItem("theme", "Light");
            }
          }}
          type="checkbox"
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default Setting;
