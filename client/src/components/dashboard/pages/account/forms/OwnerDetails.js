import React from "react";
import Typography from "@material-ui/core/Typography";
import { Collapse, Grid, Button } from "@material-ui/core";
import useStyles, { useFirebaseBtnStyles } from "../styles/main";

const OwnerDetails = (props) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();

  const [state, setState] = React.useState({
    show_form: true,
    is_edit: false,
    owner_name: props.data.owner_name || "",
    owner_email: props.data.owner_email || "",
    owner_no: props.data.owner_no || "",
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
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      is_edit: false,
      owner_name: props.data.owner_name || "",
      owner_email: props.data.owner_email || "",
      owner_no: props.data.owner_no || "",
    });
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value,
    });
  };

  const updateInfo = () => {
    const { owner_name, owner_email, owner_no } = state;
    const obj = {
      owner_name,
      owner_email,
      owner_no,
    };
    setState({
      ...state,
      is_edit: false,
    });

    if (
      state.owner_name !== "" &&
      state.owner_email !== "" &&
      state.owner_no !== ""
    )
      props.updateInfo(obj);
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
          Owner Details
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
            <label htmlFor="owner_name" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Owner Name: </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="owner_name"
              value={state.owner_name}
              onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              placeholder="Enter the onwer name"
            />
          </Grid>

          <Grid container item xs={12} sm={3} justify="flex-start">
            <label htmlFor="owner_email" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Owner Email: </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="owner_email"
              value={state.owner_email}
              type="email"
              onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              placeholder="Enter the owner email"
            />
          </Grid>

          <Grid container item xs={12} sm={3} justify="flex-start">
            <label htmlFor="owner_no" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Phone No. : </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="owner_no"
              value={state.owner_no}
              onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              placeholder="Enter the owner contact number"
            />
          </Grid>
          {state.is_edit && (
            <Grid item xs={12}>
              <span style={{ float: "right" }}>
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
                  onClick={updateInfo}
                >
                  <i style={{ margin: "6px" }} className="fas fa-save"></i>
                  Save Changes
                </Button>
              </span>
            </Grid>
          )}
        </Grid>
      </Collapse>
    </div>
  );
};

export default OwnerDetails;
