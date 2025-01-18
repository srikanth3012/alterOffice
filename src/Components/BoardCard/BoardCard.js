import React, { useEffect, useState } from "react";
import "./BoardCard.scss";
import Options from "../Options/Options";

const BoardCard = ({ title, data }) => {
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleDragStart = (id) => {
    setDraggedItemId(id);
  };

  // const addTaskHandler = () => setAddTask(!addTask);
  const handleDrop = (id) => {
    const draggedIndex = items.findIndex((item) => item.id === draggedItemId);
    const droppedIndex = items.findIndex((item) => item.id === id);

    // Perform a reordering of items
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(droppedIndex, 0, draggedItem);

    setItems(updatedItems);
    setDraggedItemId(null);
  };
  return (
    <div className="boardCard">
      <h4 className={` titleBox ${title} `}>{title}</h4>
      <div className="items">
        {items?.map((item) => (
          <div
            key={item.id}
            className="item"
            draggable
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(item.id)}
          >
            <div className="topDetails">
              <span className={`${title === "COMPLETED" && "cross"} taskTitle`}>
                {item.taskTitle}
              </span>
              <Options section={"boardOption"} item={item} />
            </div>
            <div className="bottomDetails">
              <span className="taskCategory">
                {item.taskCategory.toUpperCase()}
              </span>
              <span className="time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardCard;
