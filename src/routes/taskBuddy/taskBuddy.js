import React, { useEffect, useState } from "react";
import AddTask from "../../Components/AddTask/AddTask";
import Header from "../../Components/Header/header";
import List from "../../Components/List/list";
import Board from "../../Components/Board/board";
import "./taskBuddy.scss";
import { useSelector } from "react-redux";

const TaskBuddy = () => {
  const [section, setSection] = useState("List");
  const [addTask, setAddTask] = useState(false);
  const [category, setCategory] = useState("Category");
  const [time, setTime] = useState();
  const [todoData, setTodoData] = useState([]);
  const [inProgressData, setinProgressData] = useState([]);
  const [completeData, setcompleteData] = useState([]);

  const toDoDataItems = useSelector((store) => store?.taskBuddySlicer?.todo);
  const inProgressDataItems = useSelector(
    (store) => store?.taskBuddySlicer?.inProgess
  );
  const completeDataItems = useSelector(
    (store) => store?.taskBuddySlicer?.completed
  );

  useEffect(() => {
    setTodoData(toDoDataItems);
    setinProgressData(inProgressDataItems);
    setcompleteData(completeDataItems);
  }, [toDoDataItems, completeDataItems, inProgressDataItems]);

  const sectionHandler = (e) => setSection(e.target.textContent);

  const addTaskHandler = () => setAddTask(!addTask);

  const handleCategoryFilter = (e) => {
    const value = e.target.dataset.value?.toLowerCase();
    if (!value) return;

    setCategory(value === "reset" ? "Category" : value);

    setTodoData(
      value === "reset"
        ? toDoDataItems
        : toDoDataItems.filter(
            (item) => item?.taskCategory?.toLowerCase() === value
          )
    );

    setinProgressData(
      value === "reset"
        ? inProgressDataItems
        : inProgressDataItems.filter(
            (item) => item?.taskCategory?.toLowerCase() === value
          )
    );

    setcompleteData(
      value === "reset"
        ? completeDataItems
        : completeDataItems.filter(
            (item) => item?.taskCategory?.toLowerCase() === value
          )
    );
  };

  const handledateFilter = (e) => {
    let value = e.target.value;
    setTime(value);

    const date = new Date(); // Get the current date
    const todyDate = date.toISOString().split("T")[0];

    console.log(todyDate, value);
    value = value == todyDate ? "Today" : value;

    setTodoData(
      value === ""
        ? toDoDataItems
        : toDoDataItems.filter((item) => item?.time == value)
    );

    setinProgressData(
      value === ""
        ? inProgressDataItems
        : inProgressDataItems.filter((item) => item?.time == value)
    );

    setcompleteData(
      value === ""
        ? completeDataItems
        : completeDataItems.filter((item) => item?.time == value)
    );
  };

  const resetHandler = () => {
    setTodoData(toDoDataItems);
    setinProgressData(inProgressDataItems);
    setcompleteData(completeDataItems);
    setCategory("Category");
    setTime("dd/mm/yyyy");
  };
  const handleSearchText = (e) => {
    const searchText = e.target.value.toLowerCase();
    setTodoData(
      searchText
        ? toDoDataItems.filter(
            (item) =>
              item?.taskCategory?.toLowerCase().includes(searchText) ||
              item?.taskStatus?.toLowerCase().includes(searchText) ||
              item?.taskTitle.toLowerCase().includes(searchText)
          )
        : toDoDataItems
    );
    setinProgressData(
      searchText
        ? inProgressDataItems.filter(
            (item) =>
              item?.taskCategory?.toLowerCase().includes(searchText) ||
              item?.taskStatus?.toLowerCase().includes(searchText) ||
              item?.taskTitle.toLowerCase().includes(searchText)
          )
        : inProgressDataItems
    );

    setcompleteData(
      searchText
        ? completeDataItems.filter(
            (item) =>
              item?.taskCategory?.toLowerCase().includes(searchText) ||
              item?.taskStatus?.toLowerCase().includes(searchText) ||
              item?.taskTitle.toLowerCase().includes(searchText)
          )
        : completeDataItems
    );
  };

  return todoData !== undefined ? (
    <div className="taskBuddy">
      <Header />
      <div className="section" onClick={sectionHandler}>
        <span className={`${section === "List" && "active"} btn`}>
          <img alt="list" src="./List.png" />
          List
        </span>
        <span className={`${section === "Board" && "active"} btn`}>
          <img alt="list" src="./view-board.png" />
          Board
        </span>
      </div>
      <div className="bigScreenfeatures">
        <div className="filter">
          <label htmlFor=""> Filter by:</label>{" "}
          <span className="filteritem" onClick={() => setCategory("")}>
            {category || "Category"}
            <img alt="down" src="./chevron-down.svg" />
          </span>
          <input
            name="time"
            type="date"
            value={time}
            className="filteritem"
            onChange={handledateFilter}
          />
          <span className="filteritem" onClick={resetHandler}>
            Reset
          </span>
          {!category && (
            <div className="filterOptions" onClick={handleCategoryFilter}>
              <span data-value="work">Work</span>
              <span data-value="personal">Personal</span>
              <span data-value="reset">Reset</span>
            </div>
          )}
        </div>
        <div className="searchAndAdd">
          <div className="search">
            <img src="./search_icon.svg" alt="Search" />
            <input
              className="input"
              type="text"
              placeholder="Search"
              onChange={handleSearchText}
            />
          </div>
          <button className="addTaskBtn" onClick={addTaskHandler}>
            ADD Task
          </button>
        </div>
      </div>

      {/* mobile */}

      <div className="mobileScreenfeatures">
        <div className="filter">
          <div className="top">
            <button className="addTaskBtn" onClick={addTaskHandler}>
              ADD Task
            </button>
          </div>
          <label htmlFor="" className="filterLabel">
            {" "}
            Filter by:
          </label>
          <div className="middle">
            {" "}
            <span className="filteritem" onClick={() => setCategory("")}>
              {category || "Category"}
              <img alt="down" src="./chevron-down.svg" />
            </span>
            <input
              name="time"
              type="date"
              value={time}
              className="filteritem"
              onChange={handledateFilter}
            />
            <span className="filteritem" onClick={resetHandler}>
              Reset
            </span>
            {!category && (
              <div className="filterOptions" onClick={handleCategoryFilter}>
                <span data-value="work">Work</span>
                <span data-value="personal">Personal</span>
                <span data-value="reset">Reset</span>
              </div>
            )}
          </div>
          <div className="bottom">
            <div className="search">
              <img src="./search_icon.svg" alt="Search" />
              <input
                className="input"
                type="text"
                placeholder="Search"
                onChange={handleSearchText}
              />
            </div>
          </div>
        </div>
      </div>

      {addTask && <AddTask text="text" addTaskHandler={addTaskHandler} />}
      {section !== "Board" ? (
        <List
          todoData={todoData}
          inProgressData={inProgressData}
          completedData={completeData}
        />
      ) : (
        <Board
          todoData={todoData}
          inProgressData={inProgressData}
          completedData={completeData}
        />
      )}
    </div>
  ) : null;
};

export default TaskBuddy;
