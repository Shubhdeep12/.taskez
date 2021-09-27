import React, { useState, useEffect } from "react";
import { Projects, Overview, Setting, Logout } from "./";
import { AiOutlineHome, AiOutlineFolderOpen } from "react-icons/ai";
import { IoStatsChartOutline } from "react-icons/io5";
import { BsChatSquareDots, BsCalendar } from "react-icons/bs";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import "./MainPage.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";
import { useHistory } from "react-router-dom";

import { signout } from "../actions";
function MainPage() {
  const history = useHistory();
  const [current, setCurrent] = useState("project");
  const userId = useSelector((state) => state.authDetails.userId);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authDetails.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);
  useEffect(async () => {
    try {
      const status = await axios.get("/status", { userId });
    } catch (err) {
      console.log(err.response);
      await axios.get("/logout");
      dispatch(signout());
      localStorage.setItem("userId", "");
      sessionStorage.setItem("userId", "");
      history.push("/");
    }
  }, [refresh]);

  return (
    <div className="mainPage">
      <div className="sidebar">
        <div className="logo">.taskez</div>

        <div className="upper tabs">
          <nav>
            <ul>
              <li
                className={
                  "overview tab" + (current === "overview" ? "_active" : "")
                }
                onClick={(e) => {
                  setRefresh(!refresh);
                  setCurrent("overview");
                }}
              >
                <AiOutlineHome className="icons" />
                Overview
              </li>
              <li
                className={"stats tab" + (current === "stats" ? "_active" : "")}
                onClick={(e) => {
                  setRefresh(!refresh);
                  setCurrent("stats");
                }}
              >
                <IoStatsChartOutline className="icons" />
                Stats
              </li>
              <li
                className={
                  "project tab" + (current === "project" ? "_active" : "")
                }
                onClick={(e) => {
                  setRefresh(!refresh);
                  setCurrent("project");
                }}
              >
                <AiOutlineFolderOpen className="icons" />
                Projects
              </li>
              <li
                className={"chat tab" + (current === "chat" ? "_active" : "")}
                onClick={(e) => {
                  setRefresh(!refresh);
                  setCurrent("chat");
                }}
              >
                <BsChatSquareDots className="icons" /> Chat
              </li>
              <li
                className={
                  "calendar tab" + (current === "calendar" ? "_active" : "")
                }
                onClick={(e) => {
                  setRefresh(!refresh);
                  setCurrent("calendar");
                }}
              >
                <BsCalendar className="icons" />
                Calendar
              </li>
            </ul>
          </nav>
        </div>

        <div className="lower tabs">
          <nav>
            <ul>
              <li
                className={
                  "setting tab" + (current === "setting" ? "_active" : "")
                }
                onClick={(e) => {
                  setRefresh(!refresh);
                  setCurrent("setting");
                }}
              >
                <FiSettings className="icons" />
                Setting
              </li>
              <li
                className={
                  "logout tab" + (current === "logout" ? "_active" : "")
                }
                onClick={(e) => {
                  setRefresh(!refresh);
                  setCurrent("logout");
                }}
              >
                <FiLogOut className="icons" /> Log Out
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="mainbar">
        <AnimatePresence exitBeforeEnter>
          {
            {
              project: <Projects />,
              overview: <Overview />,
              setting: <Setting />,
              logout: <Logout refresh={refresh} setRefresh={setRefresh} />,
            }[current]
          }
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MainPage;
