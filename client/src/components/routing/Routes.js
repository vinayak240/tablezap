import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "../auth/register/Register";
import Login from "../auth/Login";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingPage from "../layout/LoadingPage";

const Routes = (props) => {
  return (
    <section className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            props.auth.loading ? (
              <LoadingPage />
            ) : props.auth.isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/login"
          render={() =>
            props.auth.loading ? (
              <LoadingPage />
            ) : !props.auth.isAuthenticated ? (
              <Login />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {
  rest_auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.rest_auth,
});

export default connect(mapStateToProps)(Routes);
