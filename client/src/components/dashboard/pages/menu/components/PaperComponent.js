import React from "react";
import { useMediaQuery } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const PaperComponent = (props) => {
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Paper
      style={{
        padding: matchesSmDw ? "unset" : "12px",
        borderRadius: matchesSmDw ? "0px" : "12px",
      }}
      {...props}
    />
  );
};

export default PaperComponent;
