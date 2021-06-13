import React, { useEffect } from "react";
// import NavBar from './component/layout/NavBar';
import "./App.css";
import Login from "./component/auth/Login";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
// import QRCode from "qrcode.react";
// import Stepper from './component/layout/HorizontalStepper';
import Register from "./component/auth/register/Register";
import Dashboard from "./component/dashboard/Dashboard";
import ImageUploader from "./component/layout/ImageUploader";
import { loadRest, refreshToken } from "./redux/actions/restaurant/auth";
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
  const setLogged = () => {
    setState({
      islogged: true,
    });
  };

  useEffect(() => {
    dispatch(refreshToken(5 * 60 * 1000));
    dispatch(loadRest());
  }, []);

  // const downloadQR = () => {
  //   const canvas = document.getElementById("123456");
  //   const pngUrl = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");
  //   let downloadLink = document.createElement("a");
  //   downloadLink.href = pngUrl;
  //   downloadLink.download = "123456.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <NavBar /> */}
        {/* <Register /> */}

        {/* <Login /> */}
        {state.islogged ? <Dashboard /> : <Login setLogged={setLogged} />}
        {/* <Register /> */}
        {/* <ImageUploader multiple={true} show={true} /> */}

        {/* <div>
            <QRCode
              id="123456"
              value="5eea80dcbcb0ee5b0498df02/T-4"
              size={290}
              level={"H"}
              includeMargin={true}
            />{" "}
            <a onClick={downloadQR}> Download QR </a>
          </div> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
