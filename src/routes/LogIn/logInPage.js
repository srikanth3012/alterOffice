import React from "react";
import "./logInPage.scss";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/Slicers/taskBuddySlicer";

function LogInPage() {
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = {
        displayName: result?.user?.displayName,
        email: result?.user?.email,
        photoURL: result?.user?.photoURL,
      };
      dispatch(addUser(user));
    } catch (error) {
      console.error("Error during sign-in: ", error.message);
    }
  };

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
              <button onClick={handleGoogleSignIn}>
                <img alt="google" src="./google.png" />
                <span>Continue With Google</span>
              </button>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="bigScreenBg">
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
