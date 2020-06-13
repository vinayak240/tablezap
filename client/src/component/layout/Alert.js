import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: "auto",
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
    marginBottom: "15px"
  }
}));

const AlertWindow = ({ alerts }) => {
  const classes = useStyles();
  return (
    alerts !== null &&
    alerts.length > 0 && (
      <div className={classes.root}>
        {alerts.map(alert => (
          <Alert key={alert.id} severity={alert.alertType}>
            {alert.msg}
          </Alert>
        ))}
      </div>
    )
  );
};
AlertWindow.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(AlertWindow);
