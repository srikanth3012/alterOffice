import React from "react";
import "./logInPage.scss";

function LogInPage() {
  return (
    <>
      {" "}
      <din className="logInPageContainer">
        <div className="left">
          <div className="mobBg">
            <img src="./mobile_bg_onboard.png" alt="mobBg" className="mobBg" />
          </div>
          <div className="Content">
            <div className="wrapper">
              <div className="titleContainer">
                <img alt="task" src="./task.png" />
                <h1 className="title">TaskBuddy</h1>
              </div>
              <p>
                Streamline your workflow and track progress effortlessly with
                our all-in-one task management app.
              </p>
              <button>
                <img alt="google" src="./google.png" />
                <span>Continue With Google</span>
              </button>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="bidScreenBg">
            <img
              alt="circles_bg.png"
              src="./circles_bg.png"
              className="taskImg circle"
            />
            <img
              alt="table"
              src="./Task list view 3.png"
              className="taskImg table"
            />
          </div>
        </div>
      </din>
    </>
  );
}

export default LogInPage;
