import React, { Fragment } from "react";
import logo from "./2x.png";
function Logo({ width, height }) {
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

export default Logo;
