import React from "react";
import LogInPage from "./routes/LogIn/logInPage";
import TaskBudddy from "./routes/taskBuddy/taskBuddy";
import { useSelector } from "react-redux";
import Header from "./Components/Header/header";
import "./Layout.scss";

const Layout = () => {
  const user = useSelector((store) => store?.taskBuddySlicer?.user);

  return (
    <div className="layout">
      {" "}
      <div className="wrapper">
        {!user ? (
          <div className="logInContainer">
            <LogInPage />
          </div>
        ) : (
          <>
            <div className="mainContainer">
              <Header /> <TaskBudddy />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
