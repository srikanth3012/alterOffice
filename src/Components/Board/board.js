import React from "react";
import "./Board.scss";
import BoardCard from "../BoardCard/BoardCard";

const Board = ({ todoData, inProgressData, completedData }) => {
  return (
    <div className="board">
      <BoardCard title={"TO-DO"} data={todoData} />
      <BoardCard title={"IN-PROGRESS"} data={inProgressData} />
      <BoardCard title={"COMPLETED"} data={completedData} />
    </div>
  );
};

export default Board;
