import React from "react";
import { withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";

const AntTabs = withStyles({
  root: {
    // borderBottom: "1px solid #e8e8e8",
    // backgroundColor: "lightgray"
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

export default AntTabs;
