import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="leftContainer">
        <h1 className="title">TaskBuddy</h1>
      </div>
      <div className="rightContainer">
        <div className="profile">
          <img alt="Profile" src="./Ellipse 326.png" />
          <span>Aravind</span>
        </div>
        <div className="logout">
          <img alt="logOut" src="./logout_icon.png" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
