import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import config from "../../config/default.json";
import { login, googleLogin } from "../../redux/actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Login = props => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };
  const googleSuccess = res => {
    // console.log("Response here", res.tokenId);
    props.googleLogin(res.tokenId);
  };
  const googleFailure = res => {
    console.log("Response here", res);
  };

  const login = () => {
    setState({
      ...state,
      email: "",
      password: ""
    });

    props.login(state.email, state.password);

    if (props.isAuthenticated) {
      console.log("Authenticated");
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId={config["googleClientId"]}
        buttonText="Login"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={"single_host_origin"}
      />
      <input
        id="email"
        type="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Enter email ID"
      />
      <input
        id="password"
        type="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login, googleLogin }
)(Login);
