import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { InputLabel, Input, Icon } from '@material-ui/core';
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import CloseRounded from "@material-ui/icons/CloseRounded";
import { ButtonBase } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "80%",
    margin: "auto",
    padding: "10px",
    minWidth: "150px"
  },
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "20px",
    marginTop: "15px"
  },
  nextBtn: {
    backgroundColor: "#4070FF",
    color: "white"
  },
  tag: {
    color: "gray",
    padding: "10px",
    border: "1px solid lightgray",
    borderRadius: "5px",
    margin: "5px",
    marginTop: "8px",
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "80%"
  }
}));

export default function InfoForm(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    rest_email: props.formData.rest_email || "",
    rest_no: props.formData.rest_no || "",
    rest_addr: props.formData.rest_addr || "",
    rest_type: props.formData.rest_type || "",
    dine_type: props.formData.dine_type || "",
    is_alcohol: props.formData.is_alcohol || "",
    rest_timing_start: props.formData.rest_timing_start || "",
    rest_timing_end: props.formData.rest_timing_end || "",
    tag: "",
    rest_tags: props.formData.rest_tags || []
  });

  const handleChange = evt => {
    const id = evt.target.id;
    const val = evt.target.value;
    // console.log((id));

    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  };

  const addTag = e => {
    if (state.tag.length > 0) {
      setState(prevState => ({
        ...prevState,
        rest_tags: [...prevState.rest_tags, prevState.tag],
        tag: ""
      }));
    }
  };

  const removeTag = idx => {
    const del_idx = idx;
    const tags = state.rest_tags.filter((ele, idx) => del_idx !== idx);
    setState({
      ...state,
      rest_tags: [...tags]
    });
  };
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography
          style={{ margin: "10px", textDecoration: "underline" }}
          variant="h6"
        >
          Restaurant contact info
        </Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="rest_email" className={classes.paper}>
              Restaurant email :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              id="rest_email"
              value={state.rest_email}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Enter a valid email"
            />
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="rest_no" className={classes.paper}>
              Phone no. :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              style={{ width: "30%" }}
              id="rest_no"
              value={state.rest_no}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Mobile/Telephone number"
            />
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="rest_addr" className={classes.paper}>
              Restaurant address :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <textarea
              id="rest_addr"
              value={state.rest_addr}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Restaurant address"
            ></textarea>
          </Grid>

          {/*  */}
        </Grid>
      </div>

      <div className={classes.section}>
        <Typography
          style={{ margin: "10px", textDecoration: "underline" }}
          variant="h6"
        >
          Restaurant details
        </Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="rest_type" className={classes.paper}>
              Establishment type :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <select
              id="rest_type"
              name="rest_type"
              value={state.rest_type}
              onChange={handleChange}
              className={classes.textField}
            >
              <option>--Type--</option>
              <option value={1}>Restaurant</option>
              <option value={2}>Lodge with room service</option>
              <option value={3}>Mall Food Court hotel/Food joint</option>
            </select>
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="dine_type" className={classes.paper}>
              Type of dining :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <select
              id="dine_type"
              name="dine_type"
              value={state.dine_type}
              onChange={handleChange}
              className={classes.textField}
            >
              <option>--Type--</option>
              <option value={1}>Alacarte only</option>
              <option value={2}>Buffet only</option>
              <option value={3}>Both Alacarte and Buffet</option>
              <option value={4}>Bar only</option>
            </select>
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="is_alcohol" className={classes.paper}>
              Is alcohol served ? :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <RadioGroup
              aria-label="position"
              value={state.is_alcohol}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value={"true"}
                control={<Radio id="is_alcohol" color="primary" />}
                label="Yes"
                labelPlacement="end"
              />

              <FormControlLabel
                value={"false"}
                control={<Radio id="is_alcohol" color="primary" />}
                label="No"
                labelPlacement="end"
              />
            </RadioGroup>
          </Grid>

          {/*  */}

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="rest_timing" className={classes.paper}>
              Restaurant timings :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <input
                  style={{ margin: "0px" }}
                  className={classes.textField}
                  value={state.rest_timing_start}
                  onChange={handleChange}
                  placeholder="Start"
                  id="rest_timing_start"
                  type="time"
                />
              </Grid>
              <Grid item>To</Grid>
              <Grid item>
                <input
                  style={{ margin: "0px" }}
                  className={classes.textField}
                  value={state.rest_timing_end}
                  onChange={handleChange}
                  placeholder="End"
                  id="rest_timing_end"
                  type="time"
                />
              </Grid>
            </Grid>
          </Grid>

          {/*  */}
        </Grid>
      </div>

      <div className={classes.section}>
        <Typography
          style={{ margin: "10px", textDecoration: "underline" }}
          variant="h6"
        >
          Other details(Tags)
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="tag" className={classes.paper}>
              Add tags :{" "}
            </label>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={1}>
              <Grid item md={6}>
                <input
                  id="tag"
                  value={state.tag}
                  onChange={handleChange}
                  className={classes.textField}
                  placeholder="Eg. Cuisines, Alcohol preferences, WiFi etc."
                />
              </Grid>
              <Grid item md={2}>
                <Button
                  className={classes.nextBtn}
                  onClick={addTag}
                  variant="contained"
                  color="primary"
                >
                  Add +
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {state.rest_tags.length !== 0 && (
          <div className={classes.section}>
            {/* <Typography style = {{margin: '10px', textDecoration: 'underline'}} variant = 'h6'>Tags</Typography> */}

            {state.rest_tags.map((tag, idx) => (
              <span key={idx} className={classes.tag}>
                {`${tag}`}
                <ButtonBase>
                  <CloseRounded
                    onClick={() => removeTag(idx)}
                    style={{ marginLeft: "10px", fontWeight: "800" }}
                  />
                </ButtonBase>
              </span>
            ))}
          </div>
        )}
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
          className={classes.nextBtn}
          variant="contained"
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
