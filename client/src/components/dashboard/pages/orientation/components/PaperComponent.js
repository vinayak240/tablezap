import React from "react";
import { useMediaQuery } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
const PaperComponent = (props) => {
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return <Paper style={{ borderRadius: "12px", padding: "12px" }} {...props} />;
};

export default PaperComponent;
