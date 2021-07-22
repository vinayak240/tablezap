import React, { Fragment } from "react";
import logo from "./user_login.png";
function RestLogo(props) {
  return (
    <Fragment>
      <img
        src={logo}
        style={{
          margin: "auto",
          display: "block",
          width: props.width,
          height: props.height
        }}
        alt="Logo"
      />
    </Fragment>
  );
}

export default RestLogo;
