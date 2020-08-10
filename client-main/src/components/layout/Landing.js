import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "../auth/Login";
import {
  Paper,
  Dialog,
  Grow,
  makeStyles,
  Typography,
  Grid
} from "@material-ui/core";
import Register from "../auth/Register";
import AppBar from "@material-ui/core/AppBar";
// import phone_img from "../../img/phone_qr.png";
// import qr_img from "../../img/qr.png";
// import burger_img from "../../img/burger.png";
import LandingImg from "../../img/landing.jpg";
import shield_img from "../../img/shield.png";
import qr_landing_img from "../../img/qr_landing.png";
import time_img from "../../img/time.png";
// import online_payment_img from "../../img/online_payment.png";

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
    // backgroundImage: `url(${LandingImg})`,
    backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
    backgroundSize: "100vw 100vh",
    // zIndex: "0",
    background: `url(${LandingImg}), rgba(251, 176, 52, 0.23)`,
    backgroundBlendMode: "overlay"
    // boxShadow: "inset 0 0 0 100vh rgba(251, 176, 52, 0.2)"
    // boxShadow: "inset 0 0 0 100vh rgba(0, 0, 0, 0.4)"
    // "&::before": {
    //   content: "''",
    //   position: "absolute",
    //   top: "0",
    //   right: "0",
    //   bottom: "0",
    //   left: "0",
    //   backgroundImage: "linear-gradient(to bottom right,#002f4b,#dc4225)",
    //   opacity: "0.6"
    // }
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
  searchBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50vw",
    boxShadow: "rgba(28, 28, 28, 0.08) 0px 2px 8px",
    animation: `$stretchAnimation 2s 1 1s ${theme.transitions.easing.easeInOut}`,
    borderRadius: "20px",
    padding: "5px",
    margin: "auto",
    marginTop: "18px",
    marginBottom: "10px",
    background: "white",
    zIndex: "1",
    [theme.breakpoints.down("sm")]: {
      width: "90vw"
    }
  },
  searchInput: {
    // display: "block",
    // margin: "auto",
    // marginTop: "18px",
    // marginBottom: "10px",
    // borderRadius: "5px",
    width: "100%",
    border: "1px solid lightgray",
    borderWidth: "0px",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    // boxShadow: "rgba(28, 28, 28, 0.08) 0px 2px 8px",
    textAlign: "center",
    "&:focus": {
      border: "none",
      outline: "0px transparent !important"
    }
  },
  chkIn: {
    backgroundColor: "#282c34",
    color: "white",
    borderRadius: "15px",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    padding: "4px"
  },
  "@keyframes shakeAnimation": {
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
  "@keyframes stretchAnimation": {
    "0%": {
      width: "20%"
    },

    "100%": {
      transform: "rotate(xx)",
      width: "50vw"
    }
  },
  features: {
    // background: "#282c34",
    width: "100vw",
    height: "300px",
    marginBottom: "20%"
    // color: "white"
    // boxShadow: "inset 0 0 0 100vh rgba(251, 176, 52, 0.2)"
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
          <div style={{ marginTop: "24vh" }}>
            <Typography
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                fontFamily: "'Staatliches', cursive",
                textShadow: "2px 2px #f0cd03",
                color: "#423f39"
              }}
              variant="h3"
            >
              Enter Table Code
            </Typography>
            <div className={classes.searchBox}>
              <div>
                <i
                  style={{
                    // borderRight: "2px solid lightgray",
                    padding: "5px",
                    // borderRadius: "5px",
                    margin: "5px",
                    color: "#494545",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontSize: "18px"
                  }}
                  className="fab fa-slack-hash"
                ></i>
              </div>

              <div style={{ flex: "0 0 80%" }}>
                <input
                  id="table_code"
                  className={classes.searchInput}
                  value={state.table_code}
                  onChange={handleChange}
                  type="text"
                  placeholder="##-###-###-##"
                />
              </div>
              <div>
                <button
                  style={{ float: "right" }}
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Grid
        container
        style={{ padding: "15px", width: "94%", margin: "auto" }}
        className={classes.features}
        spacing={3}
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item sm={12} md={3}>
          {/* Protection */}
          <div
            style={{
              textAlign: "center",
              padding: "12px 6px",
              minWidth: "260px"
            }}
          >
            <img style={{ width: "85px" }} src={shield_img} alt="shield img" />
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "12px 6px",
              fontWeight: "bold",
              maxWidth: "300px",
              minWidth: "260px",
              margin: "auto"
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: "bolder",
                marginBottom: "8px",
                fontSize: "19px",
                textAlign: "center"
              }}
            >
              Heading Here
            </Typography>
            <div style={{ fontWeight: "550" }}>
              Expierence pure contactless dining, Directly order from table
              using Qr Code
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={3}>
          {/* Directly order from table using Qr Code */}
          <div
            style={{
              textAlign: "center",
              padding: "12px 6px",
              minWidth: "260px"
            }}
          >
            <img
              style={{ width: "85px" }}
              src={qr_landing_img}
              alt="shield img"
            />
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "12px 6px",
              fontWeight: "bold",
              maxWidth: "300px",
              minWidth: "260px",
              margin: "auto"
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: "bolder",
                marginBottom: "8px",
                fontSize: "19px",
                textAlign: "center"
              }}
            >
              Heading Here
            </Typography>
            <div style={{ fontWeight: "550" }}>
              Expierence pure contactless dining, Directly order from table
              using Qr Code
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={3}>
          {/* No Waiting */}
          <div
            style={{
              textAlign: "center",
              padding: "12px 6px",
              minWidth: "260px"
            }}
          >
            <img style={{ width: "85px" }} src={time_img} alt="shield img" />
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "12px 6px",
              fontWeight: "bold",
              maxWidth: "300px",
              minWidth: "260px",
              margin: "auto"
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: "bolder",
                marginBottom: "8px",
                fontSize: "19px",
                textAlign: "center"
              }}
            >
              Heading Here
            </Typography>
            <div style={{ fontWeight: "550" }}>
              Expierence pure contactless dining, Directly order from table
              using Qr Code
            </div>
          </div>
        </Grid>
        {/* <Grid item sm={12} md={3}> */}
        {/* Online PAyment */}
        {/* <div style={{ textAlign: "center", padding: "12px 6px" }}>
            <img
              style={{ width: "85px" }}
              src={online_payment_img}
              alt="shield img"
            />
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "12px 6px",
              fontWeight: "bold"
            }}
          >
            <div>Heading Here</div>
            <div>
              Expierence pure contactless dining, Directly order from table
              using Qr Code
            </div>
          </div> */}
        {/* </Grid> */}
      </Grid>
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
