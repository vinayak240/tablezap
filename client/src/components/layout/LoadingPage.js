import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    margin: 0,
    display: "grid",
    placeItems: "center",
    background: "#fffff",
    height: "100vh",
  },
  spinner: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: "14px solid rgba(40, 44, 52, 0.9)",
    borderTopColor: "#FCD601",
    animation: "$spin 1s linear infinite",
  },
  "@keyframes spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
}));

export default function LoadingPage() {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.spinner}></div>
    </div>
  );
}
