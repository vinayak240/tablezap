import React from "react";
import { withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";

const AntTabs = withStyles((theme) => ({
  flexContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
}))(Tabs);

export default AntTabs;
