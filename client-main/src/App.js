import React from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./redux/store";
import Landing from "./components/layout/Landing";
import { SnackbarProvider } from "notistack";
const theme = createMuiTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif"
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={4}>
          <div>
            <Landing />
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
