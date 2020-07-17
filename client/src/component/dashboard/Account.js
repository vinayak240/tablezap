import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { clone } from "ramda";
import { Collapse, Grid, Button } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

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

const Credentials = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();

  const [state, setState] = React.useState({
    show_form: false,
    is_edit: false
  });

  const toggleShow = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content],
      is_edit:
        content === "show_form"
          ? state.is_edit
            ? false
            : state.is_edit
          : state.is_edit
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
      is_edit: false
    });
  };
  return (
    <div className={classes.card} style={{ background: "white", width: "95%" }}>
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
              <span style={{ fontWeight: "bold" }}>Reataurant ID : </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="rest_id"
              value={props.rest_id}
              //   onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              placeholder="Both first name and last name"
            />
          </Grid>

          <Grid container item xs={12} sm={3} justify="flex-start">
            <label htmlFor="rest_psswd" className={classes.paper}>
              <span style={{ fontWeight: "bold" }}>Password : </span>
            </label>
          </Grid>

          <Grid item xs={12} sm={9}>
            <input
              id="rest_psswd"
              value={"1234567"}
              type="password"
              //   onChange={handleChange}
              className={classes.textField}
              disabled={state.is_edit ? false : true}
              placeholder="Both first name and last name"
            />
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
                //   onClick={updatePack}
              >
                <i style={{ margin: "6px" }} className="fas fa-save"></i>
                Save Changes
              </Button>
            </span>
          </Grid>
        )}
      </Collapse>
    </div>
  );
};

const Account = props => {
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
      </Typography>

      <Credentials rest_id={props.restaurant.rest_id} />
    </div>
  );
};

export default Account;
