import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import config from "../../config/default.json";
import { register, googleLogin } from "../../redux/actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ButtonBase, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import user_add from "../../img/user_add.png";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

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

const useStyles = makeStyles(theme => ({
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
  }
}));

const Register = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  useEffect(() => {
    let arr = props.alerts.filter(
      (item, i, ar) => ar.findIndex(ele => ele.msg === item.msg) === i
    );
    arr.forEach(alert => {
      enqueueSnackbar(alert.msg, { variant: alert.alertType });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.alerts]);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };
  const googleSuccess = res => {
    props.googleLogin(res.tokenId);
  };
  const googleFailure = res => {
    console.log("Response here", res);
  };

  const register = () => {
    const { name, email, phone, password } = state;
    setState({
      ...state,
      email: "",
      password: "",
      phone: "",
      name: ""
    });

    props.register({ name, email, phone, password });

    if (props.isAuthenticated) {
      console.log("Authenticated");
    }
  };

  return (
    <div>
      <div style={{ margin: "8px", textAlign: "right" }}>
        <i
          onClick={props.handleDialogClose}
          style={{ fontSize: "18px" }}
          className="fas fa-times"
        ></i>
      </div>
      <div style={{ textAlign: "center" }}>
        <img alt="user" src={user_add} />
      </div>
      <div
        style={{ margin: "10px", marginBottom: "18px", textAlign: "center" }}
      >
        <span className={classes.cardTitle}>Register</span>
      </div>
      <div>
        <input
          id="name"
          className={classes.textField}
          type="text"
          value={state.name}
          onChange={handleChange}
          placeholder="Enter full name"
        />
        <input
          id="email"
          className={classes.textField}
          type="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Enter email ID"
        />
        <input
          id="phone"
          className={classes.textField}
          type="text"
          value={state.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        <input
          id="password"
          className={classes.textField}
          type="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </div>
      <div style={{ marginTop: "18px" }}>
        <Button
          classes={styles}
          onClick={register}
          variant={"contained"}
          color={"primary"}
          style={{ display: "block", width: "90%", margin: "auto" }}
          disabled={
            state.name === "" ||
            state.email === "" ||
            state.phone === "" ||
            state.password === ""
          }
          fullWidth
        >
          Register
        </Button>
        <div style={{ margin: "18px" }}>
          <Divider />
        </div>
        <div style={{ margin: "10px" }}>
          <GoogleLogin
            clientId={config["googleClientId"]}
            render={renderProps => (
              <ButtonBase
                style={{ display: "block", width: "94%", margin: "auto" }}
              >
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#737373",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    fontWeight: "bold",
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                    border: "1px solid lightgray",
                    fontFamily: "'Nunito', sans-serif"
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <img
                        style={{ width: "22px", marginRight: "7px" }}
                        alt="google-icon"
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                      />
                    </div>
                    <div>
                      <span>Continue with google</span>
                    </div>
                  </div>
                </button>
              </ButtonBase>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div style={{ marginTop: "18px", textAlign: "center" }}>
          <span className={classes.cardTitle} style={{ fontSize: "1rem" }}>
            Have account?
            <span
              onClick={props.openLogin}
              style={{
                color: "#4285f4",
                marginLeft: "6px",
                textDecoration: "underline",
                cursor: "pointer"
              }}
            >
              Login
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  googleLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { register, googleLogin }
)(Register);
