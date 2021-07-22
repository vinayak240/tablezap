import { Switch, withStyles } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const PurpleSwitch = withStyles({
  switchBase: {
    color: deepPurple[300],
    "&$checked": {
      color: deepPurple[500],
    },
    "&$checked + $track": {
      backgroundColor: deepPurple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export default PurpleSwitch;
