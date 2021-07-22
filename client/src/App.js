import React, { useEffect, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/restaurant/auth";
import Routes from "./components/routing/Routes";
import { LOGOUT } from "./redux/actions/types";
const theme = createMuiTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
});

const App = () => {
  const [state, setState] = React.useState({
    islogged: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken(5 * 60 * 1000, true));
    window.addEventListener("storage", () => {
      if (!localStorage.rest_token) dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Fragment>
            <Switch>
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
