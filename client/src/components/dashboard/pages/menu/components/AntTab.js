import React from "react";
import { withStyles } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    // fontWeight: theme.typography.fontWeightRegular,
    fontSize: "0.85rem",
    fontWeight: "bold",
    marginRight: theme.spacing(4),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: "bold",
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export default AntTab;
