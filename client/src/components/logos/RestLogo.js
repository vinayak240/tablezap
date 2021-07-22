import React, { Fragment } from "react";
import logo from "./restaurant.png";
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
