import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "../auth/Login";
import { Paper, Dialog, Grow, makeStyles, Typography } from "@material-ui/core";
import Register from "../auth/Register";
import AppBar from "@material-ui/core/AppBar";
// import phone_img from "../../img/phone_qr.png";
// import qr_img from "../../img/qr.png";
// import burger_img from "../../img/burger.png";
import LandingImg from "../../img/landing.jpg";

import Logo from "../layout/logos/Logo";
import { deepPurple } from "@material-ui/core/colors";
const useStyles = makeStyles(theme => ({
  root: {
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
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    display: "inline",
    float: "left",
    marginLeft: "20px"
  },
  textField: {
    display: "block",
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "84%",
    margin: "12px auto",
    padding: "13px",
    fontWeight: "bold"
  },
  cardTitle: {
    fontSize: "1.5rem",
    color: "#756e6e",
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bolder",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px"
    }
  },
  header: {
    width: "100vw",
    height: "100vh",
    // backgroundColor: "#f0cd03",
    // backgroundColor: "#fbb034",
    // background-color: #fbb034;
    // backgroundImage: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)"
    backgroundImage: `url(${LandingImg})`,
    backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
    backgroundSize: "100vw 100vh",
    // background: `rgba(251, 176, 52, 0.4)", url(${LandingImg})`
    boxShadow: "inset 0 0 0 100vh rgba(251, 176, 52, 0.2)"
  },
  appbar: {
    boxShadow: "none",
    backgroundColor: "#282c34",
    height: "80px",
    color: "white"
  },
  loginBtn: {
    fontFamily: "'Nunito', sans-serif",
    padding: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "inherit",
    border: "none",
    marginRight: "20px"
  },
  signUpBtn: {
    fontFamily: "'Nunito', sans-serif",
    padding: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "inherit",
    // border: "none",
    border: "2px solid #f0cd03",
    borderRadius: "5px"
  },
  iconGrp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20vh"
  },
  icon: {
    margin: "10px"
  },
  searchInput: {
    display: "block",
    width: "40vw",
    margin: "auto",
    marginTop: "18px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid lightgray",
    borderWidth: "0px",
    padding: "13px",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    boxShadow: "rgba(28, 28, 28, 0.08) 0px 2px 8px",
    textAlign: "center",
    animation: `$yourAnimation 0.5s 1 0s ${theme.transitions.easing.easeInOut}`,
    "&:focus": {
      border: "none"
    },
    [theme.breakpoints.down("sm")]: {
      width: "80vw"
    }
  },
  chkIn: {
    backgroundColor: "#282c34",
    color: "white",
    borderRadius: "5px",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    padding: "7px"
  },
  "@keyframes yourAnimation": {
    "0%": {
      transform: "rotate(-8deg)"
    },
    "31%": {
      transform: "rotate(8deg)"
    },
    "60%": {
      transform: "rotate(-5deg)"
    },
    "90%": {
      transform: "rotate(+5deg)"
    },
    "100%": {
      transform: "rotate(0)"
    }
  },
  features: {
    background: "#282c34",
    width: "100vw",
    height: "300px",
    marginBottom: "20%"
  }
}));

function PaperComponent(props) {
  return <Paper style={{ borderRadius: "12px", padding: "12px" }} {...props} />;
}

const Landing = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    dialog_open: false,
    login_reg: "login",
    table_code: "",
    isAuthenticated: false
  });

  useEffect(() => {
    if (props.isAuthenticated) {
      setState(prevState => ({
        ...prevState,
        isAuthenticated: true,
        dialog_open: false
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        isAuthenticated: false
      }));
    }
    // eslint-disable-next-line
  }, [props.isAuthenticated]);

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

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className={classes.root}>
      <div className="all_partials">
        <Dialog
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
      </div>

      <div className="content">
        <div className={classes.header}>
          <AppBar
            className={classes.appbar}
            // classes={{ colorDefault: classes.appbar }}
            color="default"
            position="static"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px"
              }}
            >
              <div>
                <div className={classes.logo}>
                  <Logo width={130} height={60} />
                </div>
              </div>
              <div style={{ paddingRight: "20px" }}>
                <button
                  className={classes.loginBtn}
                  onClick={() => handleLoginRegister("login")}
                >
                  Login
                </button>
                <button
                  className={classes.signUpBtn}
                  onClick={() => handleLoginRegister("register")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </AppBar>
          {/* <div className={classes.iconGrp}>
            <div className={classes.icon}>
              <img alt="qr img" src={qr_img} />
            </div>
            <div className={classes.icon}>
              <img alt="phone img" src={phone_img} />
            </div>
            <div className={classes.icon}>
              <img alt="burger img" src={burger_img} />
            </div>
          </div> */}
          <div style={{ marginTop: "20vh" }}>
            <Typography
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                fontFamily: "'Staatliches', cursive",
                textShadow: "3px 2px #f0cd03",
                color: "#423f39"
              }}
              variant="h3"
            >
              Enter Table Code
            </Typography>
            <input
              id="table_code"
              className={classes.searchInput}
              value={state.table_code}
              onChange={handleChange}
              type="text"
              placeholder="##-###-###-##"
            />
            <div style={{ textAlign: "center" }}>
              <button
                className={classes.chkIn}
                onClick={
                  props.isAuthenticated
                    ? () => alert("checked in!!")
                    : () => handleLoginRegister("login")
                }
              >
                <i
                  style={{ margin: "8px" }}
                  className="fas fa-external-link-alt"
                ></i>
                Check In
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.features}></div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
