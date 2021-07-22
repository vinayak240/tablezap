import React, { Fragment } from "react";
import loading from "../../img/loading.gif";

function Loading(props) {
  return (
    <Fragment>
      <img
        src={loading}
        style={{
          margin: "auto",
          display: "block",
          width: props.width,
          height: props.height
        }}
        alt="Loading"
      />
    </Fragment>
  );
}

export default Loading;
