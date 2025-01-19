import React, { useState } from "react";
import "./addTaskHoc.scss";

const AddTaskHOC = ({ TaskHandle, item }) => {
  const [fileStatus, setFileStatus] = useState(false);

  const [category, setCategory] = useState(
    item?.taskCategory?.toLowerCase() || null
  );

  return (
    <div className="addTaskHoc">
      <input
        name="taskTitle"
        type="text"
        placeholder="Task Title"
        value={item?.taskTitle}
        onChange={TaskHandle}
      />
      <textarea
        name="description"
        placeholder="Description"
        className="description"
        onChange={TaskHandle}
      />

      <div className="details">
        <div className="taskDetails">
          <label>Task Category*</label>
          <div
            className={`taskCategory`}
            name="taskCategory"
            onClick={(e) => setCategory(e.target.textContent)}
          >
            <span
              name="taskCategory"
              value="work"
              className={`taskCategoryItem ${category === "Work" && category}`}
              onClick={TaskHandle}
            >
              Work
            </span>
            <span
              name="taskCategory"
              className={`taskCategoryItem ${
                category === "Personal" && category
              }`}
              onClick={TaskHandle}
            >
              Personal
            </span>
          </div>
        </div>

        <div className="dueOn">
          <label>Due on*</label>
          <input
            name="time"
            type="date"
            placeholder="Date"
            value={item?.time}
            onChange={TaskHandle}
            className="time"
          />
        </div>

        <div className="taskStatus">
          <label className="taskTitle">Task Status</label>
          <select name="taskStatus" onClick={TaskHandle} className="dropDown">
            <option value="" disabled>
              {item?.taskStatus || "Select an option"}
            </option>

            <option value="TO_DO">TO_DO</option>
            <option value="In_Progress">In_Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="attachement">
        <span className="attachTitle">Attachment</span>
        <label className="file">
          Drop your Files here or{" "}
          <button
            className="uploadBtn"
            onClick={() => setFileStatus(!fileStatus)}
          >
            Upload
          </button>
        </label>
        {fileStatus && (
          <div className="uploadContainer">
            <input
              name="file"
              type="file"
              className="uploadFile"
              onChange={TaskHandle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTaskHOC;
