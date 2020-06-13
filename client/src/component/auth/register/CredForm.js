import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { InputLabel, Input, Icon } from '@material-ui/core';
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "4%",
    marginBottom: "4%",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "7px",
    border: "1px solid lightgray"
  },
  paper: {
    textAlign: "center",
    color: "black",
    // backgroundColor: '#5A6268',
    borderRadius: "5px",
    // trbl
    padding: "6px 12px 6px 12px",
    fontFamily: "'Nunito', sans-serif",
    // fontWeight:'bold',
    fontSize: "14px"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginBottom: "4%",
    fontWeight: "bold",
    textAlign: "center"
  },
  btnGroup: {
    marginTop: "4%",
    textAlign: "right"
  },
  textField: {
    fontFamily: "'Nunito', sans-serif",
    // fontWeight:'bold',
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "80%",
    margin: "auto",
    padding: "10px"
  },
  nextBtn: {
    backgroundColor: "#4070FF",
    color: "white"
  },
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "20px",
    marginTop: "15px"
  },
  show: {
    textAlign: "right",
    color: "#4070FF",
    width: "80%",
    margin: "8px",
    fontSize: "0.9rem"
  }
}));

export default function CredForm(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    rest_name: props.formData.rest_name || "",
    owner_name: props.formData.owner_name || "",
    owner_email: props.formData.owner_email || "",
    owner_no: props.formData.owner_no || "",
    // poc_desig: props.formData.poc_desig || "",
    rest_id: props.formData.rest_id || "",
    rest_psswd: props.formData.rest_psswd || "",
    show: false
  });

  const handleChange = evt => {
    const id = evt.target.id;
    const val = evt.target.value;
    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  };

  const handleShow = () => {
    setState({
      ...state,
      show: !state.show
    });
  };

  return (
    <div className={classes.root}>
      {/* <Typography style = {{margin: '5px', marginBottom: '30px', textDecoration: 'underline'}} variant = 'h6'>{props.heading}</Typography> */}

      <div className={classes.section}>
        <Typography
          style={{ margin: "10px", textDecoration: "underline" }}
          variant="h6"
        >
          Restaurant credentials
        </Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="rest_name" className={classes.paper}>
              Restaurant name :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              id="rest_name"
              value={state.rest_name}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Name should be unique"
            />
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="rest_id" className={classes.paper}>
              Restaurant ID :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              id="rest_id"
              value={state.rest_id}
              onChange={handleChange}
              className={classes.textField}
              placeholder="ID should be unique and atleast 4 characters"
            />
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="rest_psswd" className={classes.paper}>
              Restaurant password :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              type={state.show ? "text" : "password"}
              id="rest_psswd"
              value={state.rest_psswd}
              onChange={handleChange}
              className={classes.textField}
              placeholder="password should be atleast 6 characters"
            />

            <div className={classes.show}>
              <span style={{ cursor: "pointer" }} onClick={handleShow}>
                {" "}
                {state.show ? "Hide" : "Show"}{" "}
              </span>
            </div>
          </Grid>

          {/*  */}
        </Grid>
      </div>

      <div className={classes.section}>
        <Typography
          style={{ margin: "10px", textDecoration: "underline" }}
          variant="h6"
        >
          Owner credentials
        </Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="owner_name" className={classes.paper}>
              Owner name :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              id="owner_name"
              value={state.owner_name}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Both first name and last name"
            />
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="owner_email" className={classes.paper}>
              Owner email ID:{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              id="owner_email"
              value={state.owner_email}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Enter a valid email ID"
            />
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="owner_no" className={classes.paper}>
              Owner Contact No. :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              style={{ width: "30%" }}
              id="owner_no"
              value={state.owner_no}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Mobile/Telephone number"
            />
          </Grid>

          {/*  */}

          {/* <Grid container item xs={3} justify="flex-start" >
                <label htmlFor = 'poc_desig' className={classes.paper}>My designation : </label>
              </Grid>

              <Grid item xs = {9}>
                <select style = {{width: '33%',}} id = 'poc_desig'  value = {state.poc_desig} onChange = {handleChange} className={classes.textField} >
                  <option>--Designation--</option>
                  <option value = {1}>Owner</option>
                  <option value = {2}>Manager</option>
                  <option value = {3}>Employee</option>
                </select>
              </Grid> */}
        </Grid>
      </div>

      <div className={classes.btnGroup}>
        <Button
          disabled={props.step === 0}
          onClick={props.handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        {/* here submit and ur info will be upward transmitted (via prop func) into the state od Register comp!! */}
        <Button
          variant="contained"
          className={classes.nextBtn}
          color="primary"
          onClick={() => props.handleNext(state)}
        >
          Next
          <ArrowRightAlt />
        </Button>
      </div>
    </div>
  );
}
