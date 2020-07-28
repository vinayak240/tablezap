import React from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
const theme = createMuiTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif"
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div>
          <Login />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
