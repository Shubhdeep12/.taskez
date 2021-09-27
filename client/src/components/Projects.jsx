import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { BsFilter } from "react-icons/bs";
import { Note } from "./";
import svg1 from "../svg/svg1.svg";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";
import { signout } from "../actions";

import "./Projects.css";
function Projects() {
  const [todoCount, setTodoCount] = useState([]);
  const [progressCount, setProgressCount] = useState([]);
  const [completedCount, setCompletedCount] = useState([]);
  const [notes, setNotes] = useState([]);
  const [showEditBar, setShowEditBar] = useState({
    show: false,
    note: {
      _id: "",
      user: { name: "", img: null },
      heading: "",
      data: "",
      type: "",
    },
  });

  const [showEditHeading, setShowEditHeading] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);

  const [viewSearch, setViewSearch] = useState(false);
  const [totalUsers, setTotalUsers] = useState([]);

  const [userName, setUserName] = useState("");
  const history = useHistory();
  const userId = useSelector((state) => state.authDetails.userId);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(async () => {
    try {
      const status = await axios.get("/status", { userId });
      const p = await axios.get("/Projects/");
      const allUsers = await axios.get("/Projects/users");
      const User = await axios.get("/Projects/user", { userId });
      setUserName(User.data);
      setTotalUsers(allUsers.data);
      setNotes(p.data);
    } catch (err) {
      console.log(err.response);
      await axios.get("/logout");
      dispatch(signout());
      localStorage.setItem("userId", "");
      sessionStorage.setItem("userId", "");
    }
  }, [refresh]);

  useEffect(() => {
    let pcount = 0;
    let tcount = 0;
    let ccount = 0;
    if (notes.length > 0) {
      notes.forEach((note) => {
        if (note.type === "todo") {
          tcount++;
        } else if (note.type === "progress") {
          pcount++;
        } else if (note.type === "completed") {
          ccount++;
        }
      });
    }
    setTodoCount(tcount);
    setProgressCount(pcount);
    setCompletedCount(ccount);
  }, [notes]);

  const handleSetNotes = (data) => {
    setNotes(data);
  };
  const handleSetShowEditBar = (val) => {
    setShowEditBar(val);
  };
  const handleSetShowEditDescription = (val) => {
    setShowEditDescription(val);
  };
  const handleSetShowEditHeading = (val) => {
    setShowEditHeading(val);
  };

  return (
    <div className="projects">
      <section className="topSection">
        <div className="searchSection">
          {viewSearch ? (
            <>
              <input
                className="searchBar"
                type="text"
                placeholder="Enter Something"
              />
              <ImCancelCircle
                className="crossIcon_active"
                onClick={() => {
                  setViewSearch(!viewSearch);
                }}
              />
              <FiSearch
                className="searchIcon_active"
                onClick={() => {
                  setViewSearch(!viewSearch);
                }}
              />
            </>
          ) : (
            <>
              <FiSearch
                className="searchIcon"
                onClick={() => {
                  setViewSearch(!viewSearch);
                }}
              />
              <span
                className="searchText"
                onClick={() => {
                  setViewSearch(!viewSearch);
                }}
              >
                Search
              </span>
            </>
          )}
        </div>
        <div className="avatars">
          <div className="usersAvatars">
            {totalUsers.length > 0 &&
              totalUsers.map((m, ind) => {
                return ind < 4 ? (
                  <img
                    key={ind}
                    src={svg1}
                    className="avatarSvg"
                    alt="no img"
                  />
                ) : (
                  ""
                );
              })}

            {totalUsers.length > 0 && totalUsers.length > 4 ? (
              <span className="extraAvatar">{totalUsers.length - 4}</span>
            ) : (
              ""
            )}
          </div>
        </div>
        {userName.length > 0 && (
          <div className="usernameIcon">
            <span id="username">{userName}</span>

            <img src={svg1} className="userAvatar" alt="no img" />
          </div>
        )}
      </section>
      <section className="mainSection">
        <div className="mainHeadings">
          <span>Projects</span>
          <span className="filter">
            <BsFilter /> Filter
          </span>
        </div>
        <div className="mainContent">
          <Note
            typeOfContainer="To Do"
            typeOfNote="todo"
            count={todoCount}
            notes={notes}
            setNotes={handleSetNotes}
            setShowEditBar={handleSetShowEditBar}
            setShowEditDescription={handleSetShowEditDescription}
            setShowEditHeading={handleSetShowEditHeading}
            refreshValue={refresh}
            change={setRefresh}
          />
          <Note
            typeOfContainer="In Progress"
            typeOfNote="progress"
            count={progressCount}
            notes={notes}
            setNotes={handleSetNotes}
            setShowEditBar={handleSetShowEditBar}
            setShowEditDescription={handleSetShowEditDescription}
            setShowEditHeading={handleSetShowEditHeading}
            refreshValue={refresh}
            change={setRefresh}
          />
          <Note
            typeOfContainer="Completed"
            typeOfNote="completed"
            count={completedCount}
            notes={notes}
            setNotes={handleSetNotes}
            setShowEditBar={handleSetShowEditBar}
            setShowEditDescription={handleSetShowEditDescription}
            setShowEditHeading={handleSetShowEditHeading}
            refreshValue={refresh}
            change={setRefresh}
          />
        </div>
      </section>
      {showEditBar.show && (
        <div
          className="rightbar"
          onClick={(ev) => {
            ev.preventDefault();
          }}
        >
          <div className="editHeading">
            {showEditHeading ? (
              <input
                type="text"
                className="editHeadingTextInput"
                value={showEditBar.note.heading}
                onChange={(e) => {
                  setShowEditBar({
                    show: true,
                    note: {
                      _id: showEditBar.note._id,
                      user: { name: showEditBar.note.user.name, img: null },
                      heading: e.target.value,
                      data: showEditBar.note.data,
                    },
                  });
                }}
                minLength="1"
              />
            ) : (
              <span
                className="editHeadingText"
                onClick={(ev) => {
                  ev.preventDefault();

                  setShowEditHeading(true);
                }}
              >
                {showEditBar.note.heading.length > 45
                  ? showEditBar.note.heading.substring(0, 45)
                  : showEditBar.note.heading}
              </span>
            )}
            <div
              className="cross"
              onClick={(ev) => {
                ev.preventDefault();
                setShowEditBar(false);
              }}
            ></div>
          </div>

          <div className="rightbarName">
            <div className="editName">
              Created By
              <img src={svg1} className="editNameAvatar" alt="no img" />
              <span className="editNameText">{showEditBar.note.user.name}</span>
            </div>
          </div>
          <div className="rightbarDescription">
            <div className="editDescription">
              Description
              {showEditDescription ? (
                <textarea
                  className="editDescriptionTextInput"
                  cols="30"
                  rows="10"
                  value={showEditBar.note.data}
                  onChange={(e) => {
                    setShowEditBar({
                      show: true,
                      note: {
                        _id: showEditBar.note._id,
                        user: { name: showEditBar.note.user.name, img: null },
                        heading: showEditBar.note.heading,
                        data: e.target.value,
                        type: showEditBar.note.type,
                      },
                    });
                  }}
                />
              ) : (
                <span
                  onClick={(ev) => {
                    ev.preventDefault();
                    setShowEditDescription(true);
                  }}
                  className="editDescriptionText"
                >
                  {showEditBar.note.data.length > 60
                    ? showEditBar.note.data.substring(0, 60)
                    : showEditBar.note.data}
                </span>
              )}
            </div>
          </div>
          <div className="rightbarButton">
            {(showEditDescription || showEditHeading) && (
              <input
                className="newButton save"
                type="button"
                value="Save"
                onClick={async () => {
                  try {
                    const result = await axios.put("/Projects/update", {
                      heading: showEditBar.note.heading,
                      data: showEditBar.note.data,
                      noteId: showEditBar.note._id,
                      type: showEditBar.note.type,
                    });
                    setRefresh(!refresh);
                    setShowEditDescription(false);
                    setShowEditHeading(false);
                  } catch (error) {}
                }}
              />
            )}

            <input
              className="newButton delete"
              type="button"
              value="Delete"
              onClick={async () => {
                try {
                  let delData = {
                    noteId: showEditBar.note._id,
                    userId: userId,
                  };

                  const result = await axios.post("/Projects/delete", delData);

                  setRefresh(!refresh);
                  setShowEditBar(false);
                } catch (error) {}
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
