import React, { useState } from "react";
import Login from "../auth/Login";
import { Paper, Dialog } from "@material-ui/core";

function PaperComponent(props) {
  return <Paper style={{ borderRadius: "12px", padding: "12px" }} {...props} />;
}

const Landing = () => {
  const [state, setState] = useState({
    login_open: false
  });

  const handleDialogClose = content => {
    setState({
      ...state,
      [content]: false
    });
  };

  const handleDialogOpen = content => {
    setState({
      ...state,
      [content]: true
    });
  };

  return (
    <div>
      <Dialog
        // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
        open={state.login_open}
        fullWidth={true}
        maxWidth={"xs"}
        scroll="body"
        onClose={() => handleDialogClose("login_open")}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <Login handleDialogClose={() => handleDialogClose("login_open")} />
      </Dialog>

      <button onClick={() => handleDialogOpen("login_open")}>Login</button>
    </div>
  );
};

export default Landing;
