import React, { Fragment } from "react";
function Completed(props) {
  return (
    <Fragment>
      <iframe
        src="https://giphy.com/embed/hvMz6f9pEqCMFHYqGg"
        width={props.width}
        height={props.height}
        frameBorder="0"
        className="giphy-embed"
        title="Completed!!"
        style={{
          margin: "10px auto 10px auto",
          display: "block"
        }}
        allowFullScreen
      ></iframe>
    </Fragment>
  );
}

export default Completed;
