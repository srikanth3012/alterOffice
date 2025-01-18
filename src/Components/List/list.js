import React from "react";
import "./List.scss";
import ListCard from "../ListCard/ListCard";
import { useSelector } from "react-redux";
import MultiTaskHandler from "../MultiTaskhandler/MultiTaskHandler";

const List = ({ todoData, inProgressData, completedData }) => {
  const selectedItems = useSelector(
    (store) => store?.taskBuddySlicer?.multiHandler
  );
  return (
    <div className="list">
      <table>
        {" "}
        <thead>
          <tr className="head">
            <th className="task">Task Name</th>
            <th className="taskName">Date</th>
            <th className="taskName">Track Status</th>
            <th className="taskName"> TrackCategory</th>
            <th className="taskName"></th>
          </tr>
        </thead>
        <div className="todo item">
          <ListCard title="Todo" data={todoData} />
        </div>
        <div className="progress item">
          <ListCard title="Progress" data={inProgressData} />
        </div>
        <div className="complete item">
          <ListCard title="Complete" data={completedData} />
        </div>
      </table>

      {selectedItems.length > 0 && (
        <div>
          <MultiTaskHandler />
        </div>
      )}
    </div>
  );
};

export default List;
