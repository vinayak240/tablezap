import React from "react";
import Typography from "@material-ui/core/Typography";
import bcrypt from "bcryptjs";
import { Collapse, Grid, Button } from "@material-ui/core";
import useStyles, { useFirebaseBtnStyles } from "../styles/main";

const Credentials = (props) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();

  const [state, setState] = React.useState({
    show_form: true,
    is_edit: false,
    rest_id: props.rest_id || "",
    rest_psswd: "1234567",
    re_rest_psswd: "",
    show_psswd: [false, false],
    is_pass_err: false,
  });

  const toggleShow = (content) => {
    setState((prevState) => ({
      ...prevState,
      [content]: !prevState[content],
      // is_edit:
      //   content === "show_form"
      //     ? state.is_edit
      //       ? false
      //       : state.is_edit
      //     : state.is_edit
    }));
  };

  const handleEdit = (evt) => {
    evt.stopPropagation();
    setState({
      ...state,
      is_edit: true,
      show_form: true,
      rest_psswd: "",
      re_rest_psswd: "",
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      is_edit: false,
      rest_id: props.rest_id || "",
      rest_psswd: "1234567",
      show_psswd: [false, false],
    });
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value,
    });
  };

  const toggleShowPsswd = (id) => {
    setState({
      ...state,
      show_psswd: state.show_psswd.map((b, idx) =>
        Number(id) === idx ? !b : b
      ),
    });
  };

  const resetPsswd = async () => {
    const isMatch = await bcrypt.compare(state.rest_psswd, props.rest_psswd);

    if (Boolean(state.rest_psswd) && isMatch) {
      setState({
        ...state,
        is_edit: false,
        show_psswd: [false, false],
        is_pass_err: false,
      });

      let salt = await bcrypt.genSalt(10);

      let newPsswd = await bcrypt.hash(state.re_rest_psswd, salt);
      // console.log(newPsswd);
      props.resetPsswd(newPsswd);
    } else {
      setState({
        ...state,
        is_pass_err: true,
      });
      setTimeout(() => {
        setState({
          ...state,
          is_pass_err: false,
        });
      }, 3000);
    }
  };

  return (
    <div
      className={classes.card}
      style={{ background: "white", width: "100%" }}
    >
      <Typography
        className={classes.cardTitle}
        onClick={() => toggleShow("show_form")}
      >
        <span>
          Credentials
          {state.is_edit && (
            <i
              style={{ margin: "8px", fontSize: "19px" }}
              className="fas fa-edit"
            ></i>
          )}
        </span>
        <i
          style={{
            margin: "8px",
            fontSize: "22px",
            float: "right",
          }}
          className={`fas fa-sort-${state.show_form ? "up" : "down"}`}
        ></i>
        {!state.is_edit && (
          <button
            style={{
              margin: "0px 16px 0px 8px",
              width: "40px",
              border: "none",
              textAlign: "center",
              borderRadius: "4px",
              backgroundColor: "#c4dff2",
              padding: "4px",
              float: "right",
            }}
            onClick={handleEdit}
          >
            <i
              style={{ margin: "4px", fontSize: "16px" }}
              className="fas fa-edit"
            ></i>
          </button>
        )}
      </Typography>
      <Collapse in={state.show_form}>
        <Grid
          container
          spacing={2}
          style={{ marginTop: "15px" }}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid container item xs={12} sm={3} justify="flex-start">
            <label htmlFor="rest_id" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Restaurant ID : </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="rest_id"
              value={props.rest_id}
              // onChange={handleChange}
              className={classes.textField}
              disabled={true} //Because RESTAURANT ID can oly be changed by the TZ Support!!
              placeholder="Enter unique restaurant ID"
            />
          </Grid>

          <Grid container item xs={12} sm={3} justify="flex-start">
            <label htmlFor="rest_psswd" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {state.is_edit && "Change "}Password :{" "}
              </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            {!state.is_edit && (
              <input
                id="rest_psswd"
                value={state.rest_psswd}
                type="password"
                onChange={handleChange}
                className={classes.textField}
                disabled={state.is_edit ? false : true}
                placeholder="Enter restaurant password"
              />
            )}
            {state.is_edit && (
              <Grid
                container
                spacing={2}
                style={{ marginTop: "15px" }}
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item xs={12} sm={8}>
                  <input
                    id="rest_psswd"
                    value={state.rest_psswd}
                    style={{ width: "94%" }}
                    type={state.show_psswd[0] ? "text" : "password"}
                    onChange={handleChange}
                    className={classes.textField}
                    // disabled={state.is_edit ? false : true}
                    placeholder="Enter current password"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <button
                    onClick={() => toggleShowPsswd(0)}
                    style={{
                      float: "left",
                      fontWeight: "bold",
                      backgroundColor: "white",
                      border: "none",
                      color: "#0388ca",
                    }}
                  >
                    {state.show_psswd[0] ? "hide" : "show"}
                  </button>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <input
                    id="re_rest_psswd"
                    value={state.re_rest_psswd}
                    style={{ width: "94%" }}
                    type={state.show_psswd[1] ? "text" : "password"}
                    onChange={handleChange}
                    className={classes.textField}
                    // disabled={state.is_edit ? false : true}
                    placeholder="Type new password"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <button
                    onClick={() => toggleShowPsswd(1)}
                    style={{
                      float: "left",
                      fontWeight: "bold",
                      backgroundColor: "white",
                      border: "none",
                      color: "#0388ca",
                    }}
                  >
                    {state.show_psswd[1] ? "hide" : "show"}
                  </button>
                </Grid>
                {state.is_pass_err && (
                  <Grid item xs={12}>
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      Entered password did not match current password
                    </span>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
        {state.is_edit && (
          <Grid item xs={12}>
            <span style={{ float: "right", marginTop: "12px" }}>
              <Button
                //   style={{ float: "right" }}
                variant="default"
                color="primary"
                onClick={handleCancel}
              >
                <span style={{ fontWeight: "bold" }}>Cancel</span>
              </Button>
              <Button
                //   style={{ float: "right" }}
                style={{ margin: "10px", fontWeight: "bold" }}
                classes={styles}
                variant={"contained"}
                color={"primary"}
                disabled={!Boolean(state.re_rest_psswd)}
                onClick={resetPsswd}
              >
                <i style={{ margin: "6px" }} className="fas fa-save"></i>
                Reset Password
              </Button>
            </span>
          </Grid>
        )}
      </Collapse>
    </div>
  );
};

export default Credentials;
