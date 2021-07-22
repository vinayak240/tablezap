import React, { Fragment } from "react";
import logo from "./app_logo2.png";
function Logo2({ width, height }) {
  return (
    <Fragment>
      <img
        src={logo}
        style={{
          margin: "auto",
          display: "block",
          width: width,
          height: height
        }}
        alt="Logo"
      />
    </Fragment>
  );
}

export default Logo2;
