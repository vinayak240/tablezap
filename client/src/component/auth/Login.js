import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RestLogo from "../logos/RestLogo";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/restaurant/auth";
import AlertWindow from "../layout/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    width: "30%",
    minWidth: "300px",
    margin: "auto",
    marginTop: "4%",
    marginBottom: "2%",
    padding: "4px",
    borderRadius: "7px"
  },
  textField: {
    margin: "9px",
    marginLeft: "5%",
    marginRight: "5%",
    width: "82%",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "bold",
    padding: "4%",
    backgroundColor: "#ebede8",
    borderRadius: "5px",
    border: "none"
  },
  button: {
    marginLeft: "5%",
    marginRight: "5%",
    width: "90%",
    color: "white",
    backgroundColor: "#5D594E",
    marginTop: "10px",
    marginBottom: "15px",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "bold"
  },
  p: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "900",
    fontSize: "26px",
    textDecoration: "underline"
  },
  logo: {
    margin: "30px"
  }
}));

function Login({ login, isAuthenticated, setLogged }) {
  const classes = useStyles();
  const [state, setState] = useState({
    rest_id: "",
    password: ""
  });

  // const state1 = useSelector(state => state);

  const onChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    login(state.rest_id, state.password);
    //  dont use isAuthenticated here it is not changed yet!!!
  };

  if (isAuthenticated) {
    // console.log("User is authenticated");
    setLogged();
  }
  return (
    <>
      <Card elevation="4" className={classes.root} disableTouchRipple>
        <div style={{ padding: "3px", marginBottom: "2px" }}>
          <Typography
            gutterBottom
            variant="p"
            component="p"
            className={classes.p}
          >
            Restaurant Login.
          </Typography>
        </div>
        <div className={classes.logo}>
          <RestLogo width="150px" height="150px" />
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <Fragment>
              <input
                id="rest_id"
                type="text"
                placeholder="Restaurant ID"
                className={classes.textField}
                onChange={onChange}
                value={state.rest_id}
              />
            </Fragment>
            <Fragment>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={classes.textField}
                onChange={onChange}
                value={state.password}
              />
            </Fragment>
          </div>
          <div disableFocusRipple>
            <Button
              type="submit"
              color="primary"
              size="medium"
              variant="contained"
              className={classes.button}
              disableFocusRipple
            >
              Log in
            </Button>
          </div>
        </form>
        <AlertWindow />
      </Card>
    </>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.rest_auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
