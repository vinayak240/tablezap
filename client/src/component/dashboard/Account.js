import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import bcrypt from "bcryptjs";
// import { clone } from "ramda";
import { Collapse, Grid, Button } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import FbSpinner from "../layout/FbSpinner";

const useFirebaseBtnStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    borderRadius: 8
  },
  text: {
    paddingLeft: 16,
    paddingRight: 16
  },
  contained: {
    boxShadow: "none",
    "&:active": {
      boxShadow: shadows[0]
    }
  },
  containedPrimary: {
    backgroundColor: "#039be5",
    color: palette.common.white,
    "&:hover": {
      backgroundColor: "#0388ca",
      boxShadow: "none",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "#0388ca"
      }
    }
  },
  label: {
    textTransform: "none",
    letterSpacing: "0.5px",
    fontWeight: "bold"
  }
}));

const useStyles = makeStyles(() => ({
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "10px",
    margin: "auto",
    marginTop: "24px",
    marginBottom: "20px",
    backgroundColor: "white"
  },
  select: {
    minWidth: 200,
    background: "white",
    color: deepPurple[500],
    fontWeight: 600,
    borderStyle: "none",
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 24,
    paddingTop: 14,
    paddingBottom: 15,
    textAlign: "center",
    // boxShadow: "5px 5px 5px lightgray",
    // boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.54)",
    // boxShadow: "0px 2px 12px 0px rgba(0,0,0,0.35)",
    // boxShadow: "0px 2px 12px -3px rgba(0,0,0,0.35)",
    boxShadow: "0px 2px 11px -5px rgba(0,0,0,0.45)",
    // wordBreak: "break-all",
    // zIndex: 1,
    wordWrap: "break-word",
    "&:focus": {
      borderRadius: 12,
      background: "white",
      borderColor: deepPurple[100]
    }
  },
  card: {
    border: "2px solid",
    borderColor: "#E7EDF3",
    width: "90%",
    margin: "auto",
    marginTop: "10px",
    padding: "22px",
    borderRadius: 16,
    transition: "0.4s",
    minWidth: "200px",

    "&:hover": {
      borderColor: "#7CB2F1"
    }
  },
  cardTitle: {
    fontSize: "1.17rem",
    color: "#122740",
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bolder"
  },
  cardSub: {
    fontSize: "0.975rem",
    color: "#75b583",
    // color: "#756e6e",
    borderRadius: "5px",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  itemImage: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "20px",
    "&:hover": {
      boxShadow: `1px 1px 5px ${deepPurple[400]}`
    }
  },
  cardDesc: {
    color: "#756e6e",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  itemList: {
    margin: "auto",
    marginTop: "17px",
    padding: "20px",
    width: "90%",
    // overflowY: "auto",
    // overflowX: "auto",
    // height: "400px",

    "&::-webkit-scrollbar": {
      width: "16px",
      backgroundColor: "#ffffff"
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#ffffff",
      paddingTop: "10px",
      paddingBottom: "20px",

      "&:hover": {
        backgroundColor: "#F4F7FA"
      }
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: deepPurple[300],
      borderRadius: "16px",
      border: "5px solid white",
      "&:hover": {
        backgroundColor: deepPurple[400],
        border: "5px solid #F4F7FA"
      }
    },
    "&::-webkit-scrollbar-button": {
      display: "none"
    }
  },
  tag: {
    color: "gray",
    padding: "10px",
    border: "1px solid lightgray",
    borderRadius: "5px",
    margin: "5px",
    marginTop: "8px",
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "80%"
  },
  menuItem: {
    width: "150px",
    padding: "6px 16px",
    fontWeight: "bold",
    textAlign: "left"
  },
  pageTitle: {
    fontSize: "1.8rem",
    color: "#122740",
    textAlign: "center",
    marginBottom: "5px",
    fontWeight: "bolder"
  },
  breadCrumb: {
    backgroundColor: "#e8eff4",
    border: "1px solid #90caf9",
    fontWeight: "bold",
    padding: "12px",
    borderRadius: 12
  },
  textField: {
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "80%",
    margin: "auto",
    padding: "10px",
    fontWeight: "bold"
  },
  paper: {
    textAlign: "center",
    color: "black",
    // backgroundColor: '#5A6268',
    borderRadius: "5px",
    // trbl
    padding: "6px 12px 6px 12px",
    fontFamily: "'Nunito', sans-serif",
    // fontWeight:'bold',
    fontSize: "14px"
  }
}));

const OwnerDetails = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();

  const [state, setState] = React.useState({
    show_form: true,
    is_edit: false,
    owner_name: props.data.owner_name || "",
    owner_email: props.data.owner_email || "",
    owner_no: props.data.owner_no || ""
  });

  const toggleShow = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
      // is_edit:
      //   content === "show_form"
      //     ? state.is_edit
      //       ? false
      //       : state.is_edit
      //     : state.is_edit
    }));
  };

  const handleEdit = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      is_edit: true,
      show_form: true
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      is_edit: false,
      owner_name: props.data.owner_name || "",
      owner_email: props.data.owner_email || "",
      owner_no: props.data.owner_no || ""
    });
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const updateInfo = () => {
    const { owner_name, owner_email, owner_no } = state;
    const obj = {
      owner_name,
      owner_email,
      owner_no
    };
    setState({
      ...state,
      is_edit: false
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
            float: "right"
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
              float: "right"
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

const RestaurantDetails = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();

  const [state, setState] = React.useState({
    show_form: true,
    is_edit: false,
    rest_name: props.data.rest_name || "",
    rest_email: props.data.rest_email || "",
    rest_addr: props.data.rest_addr || "",
    rest_no: props.data.rest_no || ""
  });

  const toggleShow = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
      // is_edit:
      //   content === "show_form"
      //     ? state.is_edit
      //       ? false
      //       : state.is_edit
      //     : state.is_edit
    }));
  };

  const handleEdit = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      is_edit: true,
      show_form: true
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      is_edit: false,
      rest_name: props.data.rest_name || "",
      rest_email: props.data.rest_email || "",
      rest_addr: props.data.rest_addr || "",
      rest_no: props.data.rest_no || ""
    });
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const updateInfo = () => {
    const { rest_name, rest_email, rest_addr, rest_no } = state;
    const obj = {
      rest_name,
      rest_email,
      rest_addr,
      rest_no
    };
    setState({
      ...state,
      is_edit: false
    });

    if (
      state.rest_name !== "" &&
      state.rest_addr !== "" &&
      state.rest_email !== "" &&
      state.rest_no !== ""
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
          Restaurant Details
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
            float: "right"
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
              float: "right"
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
            <label htmlFor="rest_name" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Restaurant Name: </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="rest_name"
              value={state.rest_name}
              onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              placeholder="Enter the restaurant name"
            />
          </Grid>

          <Grid container item xs={12} sm={3} justify="flex-start">
            <label htmlFor="rest_email" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Restaurant Email: </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="rest_email"
              value={state.rest_email}
              type="email"
              onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              placeholder="Enter the restaurant email"
            />
          </Grid>

          <Grid container item xs={12} sm={3} justify="flex-start">
            <label htmlFor="rest_no" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Phone No. : </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="rest_no"
              value={state.rest_no}
              onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              placeholder="Enter the restaurant contact number"
            />
          </Grid>
          <Grid container item xs={12} sm={3} justify="flex-start">
            <label htmlFor="rest_addr" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Reataurant Address: </span>
            </label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <textarea
              id="rest_addr"
              value={state.rest_addr}
              onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              rows={3}
              placeholder="Enter the restaurant address"
            ></textarea>
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

const Credentials = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();

  const [state, setState] = React.useState({
    show_form: true,
    is_edit: false,
    rest_id: props.rest_id || "",
    rest_psswd: "1234567",
    re_rest_psswd: "",
    show_psswd: [false, false],
    is_pass_err: false
  });

  const toggleShow = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
      // is_edit:
      //   content === "show_form"
      //     ? state.is_edit
      //       ? false
      //       : state.is_edit
      //     : state.is_edit
    }));
  };

  const handleEdit = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      is_edit: true,
      show_form: true,
      rest_psswd: "",
      re_rest_psswd: ""
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      is_edit: false,
      rest_id: props.rest_id || "",
      rest_psswd: "1234567",
      show_psswd: [false, false]
    });
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const toggleShowPsswd = id => {
    setState({
      ...state,
      show_psswd: state.show_psswd.map((b, idx) =>
        Number(id) === idx ? !b : b
      )
    });
  };

  const resetPsswd = async () => {
    const isMatch = await bcrypt.compare(state.rest_psswd, props.rest_psswd);

    if (Boolean(state.rest_psswd) && isMatch) {
      setState({
        ...state,
        is_edit: false,
        show_psswd: [false, false],
        is_pass_err: false
      });

      let salt = await bcrypt.genSalt(10);

      let newPsswd = await bcrypt.hash(state.re_rest_psswd, salt);
      // console.log(newPsswd);
      props.resetPsswd(newPsswd);
    } else {
      setState({
        ...state,
        is_pass_err: true
      });
      setTimeout(() => {
        setState({
          ...state,
          is_pass_err: false
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
            float: "right"
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
              float: "right"
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
                      color: "#0388ca"
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
                      color: "#0388ca"
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

const Account = props => {
  // const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  const [state, setState] = React.useState({
    loading: false
  });

  useEffect(() => {
    if (props.isUpdated) {
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          loading: false
        }));
      }, 500);
    }
  }, [props.isUpdated]);

  const {
    rest_id,
    rest_name,
    rest_email,
    rest_addr,
    rest_no,
    rest_type,
    rest_timing_start,
    rest_timing_end,
    rest_tags,
    dine_type,
    is_alcohol,
    owner_name,
    owner_email,
    owner_no
  } = props.restaurant;
  const data = {
    rest_id,
    rest_name,
    rest_email,
    rest_addr,
    rest_no,
    rest_type,
    rest_timing_start,
    rest_timing_end,
    rest_tags,
    dine_type,
    is_alcohol,
    owner_name,
    owner_email,
    owner_no
  };

  const upload = () => {
    setState({
      ...state,
      loading: true
    });
    props.upload("main");
  };

  return (
    <div>
      <Typography
        // className={classes.breadCrumb}
        style={{ marginBottom: "23px" }}
        paragraph
      >
        <span
          style={{
            padding: "5px 10px ",
            // backgroundColor: "#fce76f",
            color: "#282C34",
            borderRadius: "5px",
            fontWeight: "bold"
            // border: "1px solid lightgray"
          }}
        >
          Dashboard
        </span>

        <b>/</b>
        <span
          style={{
            padding: "5px 10px ",
            // backgroundColor: "#fce76f",
            color: "#282C34",
            borderRadius: "5px",
            fontWeight: "bold",
            textDecoration: "underline"
            // border: "1px solid lightgray"
          }}
        >
          Account
        </span>
        {!state.loading ? (
          <span
            style={{
              display: "inline-block",
              float: "right",
              marginBottom: "10px"
            }}
            className={gutterStyles.parent}
          >
            <Button
              style={{ fontWeight: "bold", marginLeft: "10px" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              disabled={!props.isEdited}
              onClick={upload}
            >
              <i style={{ margin: "6px" }} className="fas fa-upload"></i>
              Upload
            </Button>
            <Button
              variant="default"
              color="primary"
              onClick={props.clearChanges}
              disabled={!props.isEdited}
            >
              <span style={{ fontWeight: "bold" }}>Clear</span>
            </Button>
          </span>
        ) : (
          <span
            style={{
              fontWeight: "bold",
              color: "#0388CA",
              float: "right",
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center"
            }}
          >
            {" "}
            <FbSpinner /> <span style={{ margin: "5px" }}>
              Uploading...
            </span>{" "}
          </span>
        )}
      </Typography>

      {props.restaurant && (
        <div className="content">
          <Credentials
            rest_id={props.restaurant.rest_id}
            rest_psswd={props.restaurant.rest_psswd}
            // updateInfo={props.updateInfo}
            resetPsswd={props.resetPsswd}
          />
          <RestaurantDetails data={data} updateInfo={props.updateInfo} />
          <OwnerDetails data={data} updateInfo={props.updateInfo} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  // isAuthenticated: state.rest_auth.isAuthenticated,
  isUpdated: state.rest_auth.isUpdated
});

export default connect(mapStateToProps)(Account);

// export default Account;
