import React from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/Slicers/taskBuddySlicer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.taskBuddySlicer?.user);
  const handleLogout = () => {
    dispatch(addUser(""));
  };

  return (
    <div className="header">
      <div className="leftContainer">
        <h1 className="title">TaskBuddy</h1>
      </div>
      <div className="rightContainer">
        <div className="profile">
          <img alt="Profile" src={`${user?.photoURL || "./Ellipse 326.png"}`} />
          <span>{user?.displayName || "Aravind"}</span>
        </div>
        <div className="logout" onClick={handleLogout}>
          <img alt="logOut" src="./logout_icon.png" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
