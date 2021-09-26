import React from "react";
import "./Note.css";
import { GoComment } from "react-icons/go";
import svg1 from "../svg/svg1.svg";
import svg3 from "../svg/svg1.svg";
import axios from "../axios";
import { useSelector } from "react-redux";
function Note({
  typeOfContainer,
  typeOfNote,
  count,
  notes,
  setShowEditBar,
  setShowEditDescription,
  setShowEditHeading,
  refreshValue,
  change,
}) {
  const userId = useSelector((state) => state.authDetails.userId);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDrop = async (e, _type) => {
    let id = e.dataTransfer.getData("id");

    let updated = notes.filter(async (task) => {
      if (task._id === id) {
        const result = await axios.put("/Projects/update", {
          heading: task.heading,
          data: task.data,
          noteId: task._id,
          type: _type,
        });
        change(!refreshValue);
      }
      return task;
    });
  };
  return (
    <div className="notes">
      <div className="notesHeading">
        <span className="notesName">{typeOfContainer}</span>
        <span className="notesCount">{count}</span>
      </div>
      <div
        className="addButton"
        onClick={async () => {
          try {
            await axios.post("/Projects/add", {
              userId: userId,
              type: typeOfNote,
            });
            change(!refreshValue);
          } catch (err) {}
        }}
      >
        +
      </div>
      <div
        onDragOver={(event) => handleDragOver(event)}
        onDrop={(event) => handleDrop(event, typeOfNote)}
        className="notesContainer"
      >
        {count > 0 &&
          notes.map((e, ind) => {
            if (e.type === typeOfNote) {
              return (
                <div
                  key={ind}
                  draggable
                  onDragStart={(event) => {
                    handleDragStart(event, e._id);
                  }}
                  className="note"
                >
                  <div
                    onClick={(ev) => {
                      ev.preventDefault();

                      setShowEditDescription(false);
                      setShowEditHeading(false);
                      setShowEditBar({
                        show: true,
                        note: e,
                      });
                    }}
                    className={
                      "noteHeading" +
                      (e.heading !== "Give your task a title" ? "" : " initial")
                    }
                  >
                    {e.heading.length > 30
                      ? e.heading.substring(0, 30)
                      : e.heading + "..."}
                  </div>
                  <div
                    onClick={(ev) => {
                      ev.preventDefault();
                      setShowEditDescription(false);
                      setShowEditHeading(false);
                      setShowEditBar({
                        show: true,
                        note: e,
                      });
                    }}
                    className={
                      "data" + (e.data !== "Description.." ? "" : " initial")
                    }
                  >
                    {e.data.length > 55
                      ? e.data.substring(0, 55) + "..."
                      : e.data}
                  </div>
                  <div className="noteBottom">
                    <div className="noteCreator">
                      {e.user.img ? (
                        <img
                          src={e.user.img}
                          className="noteCreatorAvatar"
                          alt="no img"
                        />
                      ) : (
                        <img
                          src={svg1}
                          className="noteCreatorAvatar"
                          alt="no img"
                        />
                      )}
                    </div>
                    <div className="noteComments">
                      {e.comments.length > 0 && (
                        <>
                          {e.comments.length} <GoComment id="commentIcon" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return "";
          })}
      </div>
    </div>
  );
}

export default Note;
