import React, { useState } from "react";
import "./Options.scss";
import useModifyTask from "../../Utills/useModifyTask";
import Updatetask from "../UpdateTask/Updatetask";

const Options = ({ section, item }) => {
  const [options, setOptions] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const modifyTask = useModifyTask();

  const addTaskHandler = () => setAddTask(!addTask);

  const handleBtn = (e) => {
    const type = e.target.textContent;
    modifyTask(type, item);
  };

  return (
    <>
      {" "}
      <button className="taskBtn" onClick={() => setOptions(!options)}>
        ...
      </button>
      {item?.id && options && (
        <div className={`${section} options`}>
          <button className="optionBtn">
            <img alt="edit" src="./edit_icon.svg" />
            <label onClick={() => setAddTask(!addTask)}>Edit</label>
          </button>

          <button className="optionBtn delete">
            <img alt="delete" src="./delete_icon.svg" />
            <label onClick={handleBtn}>Delete</label>
          </button>
        </div>
      )}
      {addTask && (
        <Updatetask text="text" addTaskHandler={addTaskHandler} item={item} />
      )}
    </>
  );
};

export default Options;
