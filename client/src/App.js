import React, { useEffect } from "react";
// import NavBar from './component/layout/NavBar';
import "./App.css";
import Login from "./component/auth/Login";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./redux/store";
// import Stepper from './component/layout/HorizontalStepper';
import Register from "./component/auth/register/Register";
import Dashboard from "./component/dashboard/Dashboard";
const theme = createMuiTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif"
  }
});

// class App extends Component {

//   render() {
//     return (
//       <Provider store={store}>
//         <ThemeProvider theme={theme}>
//           <div className="App">
//             {/* <NavBar /> */}
//             {/* <Register /> */}
//             <Dashboard />
//             {/* <Login /> */}
//           </div>
//         </ThemeProvider>
//       </Provider>
//     );
//   }
// }

// import React from 'react'

const App = () => {
  const [state, setState] = React.useState({
    islogged: false
  });

  const setLogged = () => {
    setState({
      islogged: true
    });
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          {/* <NavBar /> */}
          {/* <Register /> */}

          {/* <Login /> */}
          {/* {state.islogged ? <Dashboard /> : <Login setLogged={setLogged} />} */}
          <Register />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

// export default App

export default App;
