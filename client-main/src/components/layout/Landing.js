import React, { useState } from "react";
import Login from "../auth/Login";
import { Paper, Dialog, Grow } from "@material-ui/core";
import Register from "../auth/Register";

function PaperComponent(props) {
  return <Paper style={{ borderRadius: "12px", padding: "12px" }} {...props} />;
}

const Landing = () => {
  const [state, setState] = useState({
    dialog_open: false,
    login_reg: "login"
  });

  const loginRegMap = {
    login: (
      <Login
        openRegister={() => handleLoginRegister("register")}
        handleDialogClose={() => handleDialogClose("dialog_open")}
      />
    ),
    register: (
      <Register
        openLogin={() => handleLoginRegister("login")}
        handleDialogClose={() => handleDialogClose("dialog_open")}
      />
    )
  };

  const handleDialogClose = content => {
    setState({
      ...state,
      [content]: false
    });
  };

  // const handleDialogOpen = content => {
  //   setState({
  //     ...state,
  //     [content]: true
  //   });
  // };

  const handleLoginRegister = content => {
    setState({
      ...state,
      login_reg: content,
      dialog_open: true
    });
  };
  return (
    <div>
      <Dialog
        // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
        open={state.dialog_open}
        fullWidth={true}
        maxWidth={"xs"}
        scroll="body"
        onClose={() => handleDialogClose("dialog_open")}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <Grow>{loginRegMap[state.login_reg]}</Grow>
      </Dialog>

      <button onClick={() => handleLoginRegister("login")}>Login</button>
      <button onClick={() => handleLoginRegister("register")}>Register</button>
    </div>
  );
};

export default Landing;
