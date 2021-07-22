import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Typography from "@material-ui/core/Typography";
// import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "3%",
    border: "1px solid lightgray",
    borderRadius: "5px",
    backgroundColor: "white"
  },
  resetInstruction: {
    textAlign: "center",
    // fontWeight:'bold',
    // margin: '20px',
    marginTop: "1.5%",
    textDecoration: "underline",
    marginBottom: "1.5%"
  }
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

export default function HorizontalStepper({ steps, activeStep }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.resetInstruction} variant="h5">
        Add your restaurant!
      </Typography>
      {/* <Divider /> */}
      <Stepper
        activeStep={activeStep}
        connector={<QontoConnector />}
        alternativeLabel
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: "bold" }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
