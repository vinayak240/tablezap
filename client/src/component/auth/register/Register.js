import React, { useEffect } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import { register } from "../../../redux/actions/restaurant/auth";
import { setAlert } from "../../../redux/actions/alert";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import HorizontalStepper from "../../layout/HorizontalStepper";
import CredForm from "./CredForm";
import InfoForm from "./InfoForm";
// import ReviewForm from "./ReviewForm";
import MenuForm from "./MenuForm";
import TableForm from "./TableForm";
import Completed from "../../logos/Completed";
import question from "../../../img/question.png";
import Loading from "../../logos/Loading";

const useStyles = makeStyles(theme => ({
  root: {
    width: "88%",
    margin: "auto"
  },
  prompt: {
    flexGrow: 1,
    marginTop: "4%",
    marginBottom: "4%",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "7px",
    border: "1px solid lightgray"
  },
  backButton: {
    backgroundColor: "#4070FF",
    color: "white",
    marginRight: theme.spacing(1)
  }
}));

function getSteps() {
  return [
    "Add owner credentials",
    "Add restaurant basic Info",
    "Add restaurant menu",
    "Orientation form"
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Owner Credentials";
    case 1:
      return "Enter basic info about the restaurant";
    case 2:
      return "Review your info";
    default:
      return "Unknown stepIndex";
  }
}

const Register = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    formData: {},
    step: 0,
    submitted: false,
    loading: false
  });
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: false,
      submitted: props.isAuthenticated ? true : false
    }));
  }, [props.isAuthenticated]);
  const steps = getSteps();

  const handleNext = data => {
    if (data.hasOwnProperty("tag")) {
      delete data.tag;
    }

    if (data.hasOwnProperty("show")) {
      delete data.show;
    }

    // AddDataToState(data);

    setState(prevState => ({
      ...prevState,
      step: prevState.step + 1,
      formData: { ...prevState.formData, ...data }
    }));
  };

  const handleBack = () => {
    setState(prevState => ({
      ...prevState,
      step: prevState.step - 1
    }));
  };

  const handleReset = () => {
    setState({
      ...state,
      step: 0
    });
  };

  const submit = async () => {
    // console.log(JSON.stringify(state.formData));
    setState({
      ...state,
      loading: true
    });

    props.register(state.formData);
    console.log(props.errors);

    if (state.submitted) {
      console.log("REGISTER SUCCESS!!");
    } else {
      console.log("REGISTER FAIL");
    }
  };

  function getForm(i) {
    switch (i) {
      case 0:
        return (
          <div>
            <CredForm
              step={state.step}
              handleBack={handleBack}
              handleNext={handleNext}
              heading={getStepContent(state.step)}
              formData={state.formData}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <InfoForm
              step={state.step}
              handleBack={handleBack}
              handleNext={handleNext}
              heading={getStepContent(state.step)}
              formData={state.formData}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <MenuForm
              step={state.step}
              handleBack={handleBack}
              handleNext={handleNext}
              heading={getStepContent(state.step)}
              formData={state.formData}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <TableForm
              step={state.step}
              handleBack={handleBack}
              handleNext={handleNext}
              heading={getStepContent(state.step)}
              formData={state.formData}
            />
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <div className={classes.root}>
      <HorizontalStepper steps={steps} activeStep={state.step} />

      <div>
        {state.step === steps.length ? (
          <div className={classes.prompt}>
            {state.submitted ? (
              <Typography
                className={classes.resetInstruction}
                variant="h4"
                style={{ textAlign: "center", marginBottom: "16%" }}
              >
                <Completed width="130" height="130" />
                Submitted Successfully!
              </Typography>
            ) : state.loading && !state.submitted ? (
              <Typography
                className={classes.resetInstruction}
                variant="h4"
                style={{ textAlign: "center", marginBottom: "16%" }}
              >
                <Loading width="120" height="120" />
                Submitting..
              </Typography>
            ) : (
              <Typography
                className={classes.resetInstruction}
                variant="h4"
                style={{ textAlign: "center", marginBottom: "16%" }}
              >
                <img
                  src={question}
                  style={{
                    margin: "10px auto 10px auto",
                    display: "block",
                    width: "120px",
                    height: "120px"
                  }}
                  alt="Logo"
                />
                Do you want to Submit?
                <div style={{ margin: "10px" }} className={classes.btnGroup}>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ padding: "8px 40px 8px 40px", fontWeight: "bold" }}
                    className={classes.backButton}
                    onClick={submit}
                  >
                    Submit
                    <i
                      style={{ marginLeft: "15px", fontSize: "20px" }}
                      className="far fa-check-circle"
                    ></i>
                  </Button>
                </div>
              </Typography>
            )}

            <div className={classes.btnGroup}>
              <Button
                disabled={props.step === 0}
                onClick={handleBack}
                color="primary"
                variant="contained"
                className={classes.backButton}
              >
                Back
              </Button>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </div>
        ) : (
          getForm(state.step)
        )}
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.rest_auth.isAuthenticated,
  errors: state.alert
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
