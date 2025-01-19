import React from "react";
import "./MultiTaskHandler.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemtoCompleted,
  addItemtoInProgress,
  addItemtoTodo,
  updateItemtoTodo,
  updateItemInProgress,
  updateItemtoCompleted,
  updateItemtoMultiHandler,
} from "../../Redux/Slicers/taskBuddySlicer";

const MultiTaskHandler = () => {
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (store) => store?.taskBuddySlicer?.multiHandler
  );

  let toDoDataItems = useSelector((store) => store?.taskBuddySlicer?.todo);

  let inProgressDataItems = useSelector(
    (store) => store?.taskBuddySlicer?.inProgess
  );

  let completeDataItems = useSelector(
    (store) => store?.taskBuddySlicer?.completed
  );

  const editTaskHandler = (sendItem, status) => {
    selectedItems.forEach((element) => {
      const updatesItem = { ...element, taskStatus: status };
      dispatch(sendItem(updatesItem));
    });
  };

  const filterOrDelete = (updateSlicer, arr, id) => {
    const updateList = arr.filter((item) => item?.id !== id);
    dispatch(updateSlicer(updateList));

    return updateList;
  };

  const taskhandler = (e) => {
    const value = e.target.textContent;
    selectedItems.forEach((element) => {
      if (element?.section.toLowerCase() === "todo") {
        toDoDataItems = filterOrDelete(
          updateItemtoTodo,
          toDoDataItems,
          element?.id
        );
      } else if (element?.section.toLowerCase() === "progress") {
        inProgressDataItems = filterOrDelete(
          updateItemInProgress,
          inProgressDataItems,
          element?.id
        );
      } else {
        completeDataItems = filterOrDelete(
          updateItemtoCompleted,
          completeDataItems,
          element?.id
        );
      }
    });

    if (value === "Delete") {
    } else {
      if (value.toLowerCase() === "to_do") {
        editTaskHandler(addItemtoTodo, "to_do");
      } else if (value.toLowerCase() === "in_progress") {
        editTaskHandler(addItemtoInProgress, "in_progress");
      } else {
        editTaskHandler(addItemtoCompleted, "completed");
      }
    }

    dispatch(updateItemtoMultiHandler());
  };

  return (
    <div className="multiTaskHandler">
      <div className="wrapper">
        <span>
          {selectedItems?.length} Tasks Selected{" "}
          <button onClick={() => dispatch(updateItemtoMultiHandler())}>
            X
          </button>
        </span>
        <div className="handletasksBtn">
          <div className="statusOptions" onClick={taskhandler}>
            <span className="">TO_DO</span>
            <span className="">IN_PROGRESS</span>
            <span className="">COMPLETED</span>
          </div>
          <span className="btn">status</span>

          <span className="btn delete" onClick={taskhandler}>
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default MultiTaskHandler;
