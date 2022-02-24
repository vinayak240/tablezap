import React, { useState, forwardRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { clone } from "ramda";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  Grid,
  Collapse,
  Badge,
  Switch,
  FormControlLabel,
  withStyles,
  useMediaQuery,
  Button,
  RadioGroup,
  Radio,
  Tooltip,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { deepPurple } from "@material-ui/core/colors";
import MaterialMenu from "@material-ui/core/Menu";
// import { useTheme } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
// import Draggable from "react-draggable";
// import { useNeumorphShadowStyles } from '@mui-treasury/styles/shadow/neumorph';
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import CloseRounded from "@material-ui/icons/CloseRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import FlipMove from "react-flip-move";

const useFirebaseBtnStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    borderRadius: 8,
  },
  text: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  contained: {
    boxShadow: "none",
    "&:active": {
      boxShadow: shadows[0],
    },
  },
  containedPrimary: {
    backgroundColor: "#039be5",
    color: palette.common.white,
    "&:hover": {
      backgroundColor: "#0388ca",
      boxShadow: "none",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "#0388ca",
      },
    },
  },
  label: {
    textTransform: "none",
    letterSpacing: "0.5px",
    fontWeight: "bold",
  },
}));

const useStyles = makeStyles((theme) => ({
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "10px",
    margin: "auto",
    marginTop: "24px",
    marginBottom: "20px",
    backgroundColor: "white",
  },
  select: {
    minWidth: 200,
    background: "white",
    color: deepPurple[500],
    fontWeight: 600,
    borderStyle: "none",
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 24,
    paddingTop: 14,
    paddingBottom: 15,
    textAlign: "center",
    boxShadow: "0px 2px 11px -5px rgba(0,0,0,0.45)",
    // boxShadow: "0 10px 10px -5px rgba(0,0,0,0.45)",
    // wordBreak: "break-all",
    wordWrap: "break-word",
    "&:focus": {
      borderRadius: 12,
      background: "white",
      borderColor: deepPurple[100],
    },
  },
  card: {
    border: "2px solid",
    borderColor: "#E7EDF3",
    width: "90%",
    margin: "auto",
    marginTop: "10px",
    padding: "22px",
    borderRadius: 16,
    transition: "0.4s",
    minWidth: "200px",
    // overflow: "auto",
    "&:hover": {
      borderColor: "#7CB2F1",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cardTitle: {
    fontSize: "1.17rem",
    color: "#122740",
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bolder",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  cardSub: {
    fontSize: "0.80rem",
    color: "#756e6e",
    borderRadius: "5px",
    fontWeight: "bold",
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
  },
  itemImage: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "20px",
    "&:hover": {
      boxShadow: `1px 1px 5px ${deepPurple[400]}`,
    },
  },
  cardDesc: {
    fontSize: "13px",
    color: "#756e6e",
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
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
    maxWidth: "80%",
  },
  textField: {
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "80%",
    margin: "auto",
    padding: "10px",
    fontWeight: "bold",
  },
  paper: {
    width: "750px",
  },
  dialog_form: {
    width: "80%",
    minWidth: "350px",
  },
}));

/**
 * @sumary Form Component to edit/add the Item Custumizations
 * @param  {any} props Contains :
 * * save = Function to save the edited/added Custumization,
 * * isEdit = Flag to specify whether to add/edit,
 * * handleDialogClose = Function to close the form dialog,
 * * custumization? = Custumization object, empty in case of "add"
 * @returns {JSX.Element}
 */

const CustumizationEditForm = (props) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [state, setState] = useState({
    custumization_name: props.custumization?.custumization_name || "",
    custum_type: props.custumization?.custum_type || "",
    option: "",
    options: clone(props.custumization?.options || []),
    option_type: "total",
    option_food_type: "veg",
    option_price: "",
    custum_show: false,
    show_options_form: false,
    show_options: false,
    is_opt_edit: false,
    cur_edit_opt: -1,
  });

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value,
    });
  };

  const toggleCollapse = (content) => {
    setState((prevState) => ({
      ...prevState,
      [content]: !prevState[content],
    }));
  };
  const handleOptionAdd = (evt) => {
    evt.stopPropagation();
    setState({
      ...state,
      show_options_form: true,
      show_options: true,
      option: "",
      option_type: "total",
      option_food_type: "veg",
      option_price: "",
      cur_edit_opt: undefined,
    });
  };

  const handleOptionCancel = (evt) => {
    evt.stopPropagation();
    setState({
      ...state,
      show_options_form: false,
      show_options: true,
      is_opt_edit: false,
      option: "",
      option_food_type: "",
      option_type: "",
      option_price: "",
      cur_edit_opt: undefined,
    });
  };

  const addOption = () => {
    const {
      option,
      option_type,
      option_food_type: food_type,
      option_price,
    } = state;

    if (option !== "" && option_price !== "") {
      const newOpt = { option, option_type, food_type, option_price }; //here
      let arr = clone(state.options);
      arr = [...arr, newOpt];
      setState({
        ...state,
        options: clone(arr),
        option: "",
        option_type: "",
        option_price: "",
        show_options_form: false,
      });
    }
  };

  const editOption = (optIdx) => {
    const {
      option,
      option_type,
      option_food_type: food_type,
      option_price,
    } = state;
    if (optIdx >= 0) {
      const newOpt = { option, option_type, food_type, option_price }; //here
      let newOptArr = state.options.map((opt, idx) => {
        if (optIdx === idx) return newOpt;
        return opt;
      });

      setState({
        ...state,
        options: clone(newOptArr),
        cur_edit_opt: -1,
        show_options_form: false,
        is_opt_edit: false,
      });
    }
  };

  const deleteOption = (optIdx) => {
    let arr = state.options.filter((ele, idx) => idx !== optIdx);
    setState({
      ...state,
      options: clone(arr),
    });
  };

  const save = () => {
    const { custumization_name, custum_type, options } = state;
    let newCustum = { custumization_name, custum_type, options };

    if (custumization_name !== "" && custum_type !== "" && options.length > 0) {
      setState({
        ...state,
        custumization_name: "",
        custum_type: "",
        options: [],
      });
      props.save(newCustum);
    }
  };

  const setEditForm = (optIdx) => {
    setState({
      ...state,
      is_opt_edit: true,
      cur_edit_opt: optIdx,
      show_options_form: true,
      show_options: true,
      option: state.options[optIdx]?.option || "",
      option_food_type: state.options[optIdx]?.food_type || "",
      option_type: state.options[optIdx]?.option_type || "",
      option_price: state.options[optIdx]?.option_price || "",
    });
  };

  return (
    <div>
      <DialogTitle id="draggable-dialog-title">
        <span className={classes.cardTitle}>
          <i style={{ margin: "8px" }} className="fas fa-edit"></i>
          {props.isEdit ? "Edit Custumization" : "Add Custumization"}
        </span>
        {matchesSmDw && (
          <Button
            style={{ float: "right" }}
            variant="default"
            color="primary"
            onClick={props.handleDialogClose}
          >
            <CloseRounded />
          </Button>
        )}
      </DialogTitle>
      <DialogContent>
        <input
          id="custumization_name"
          value={state.custumization_name}
          onChange={handleChange}
          type="text"
          style={{ marginBottom: "10px" }}
          className={classes.textField}
          placeholder="Name of custumization"
        />

        <input
          id="custum_type"
          value={state.custum_type}
          onChange={handleChange}
          type="number"
          style={{ marginBottom: "10px" }}
          className={classes.textField}
          placeholder="No. of options that can be selected"
        />

        <div
          style={{
            width: "100%",
            padding: "11px 12px",
            margin: "auto",
            marginTop: "10px",
          }}
          className={classes.section}
        >
          <Typography
            className={classes.cardDesc}
            style={{
              margin: `0px 8px  ${state.custum_show ? "16px" : "0px"} 8px`,
            }}
            onClick={() => toggleCollapse("show_options")}
          >
            <i
              style={{ margin: "8px", fontSize: "25px" }}
              className="fas fa-poll"
            ></i>
            Options
            <i
              style={{
                margin: "8px",
                fontSize: "22px",
                float: "right",
              }}
              className={`fas fa-sort-${state.cust_show ? "up" : "down"}`}
            ></i>
            <Button
              style={{
                margin: "5px 10px",
                ontWeight: "bold",
                float: "right",
              }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={
                !state.show_options_form ? handleOptionAdd : handleOptionCancel
              }
            >
              <i
                style={{ margin: "5px" }}
                className={`fas fa-${
                  state.show_options_form ? "minus-square" : "plus"
                }`}
              ></i>
              {state.show_options_form ? "Cancel" : "Add"}
            </Button>
          </Typography>
          <Collapse
            in={state.show_options}
            style={{
              display: state.show_options_form ? "flex" : "block",
              justifyContent: state.show_options_form ? "center" : "flex-start",
              width: "100%",
            }}
          >
            {state.show_options_form && (
              <div
                // style={{ marginBottom: "0px", padding: "20px",  }}
                style={{ width: "92%", margin: "18px auto" }}
                className={classes.card}
              >
                <Typography
                  style={{ margin: "12px", marginBottom: "18px" }}
                  className={classes.cardDesc}
                >
                  {state.is_opt_edit ? "Edit Option" : "Add Option"}
                  <Button
                    style={{
                      // margin: "5px 10px",
                      fontWeight: "bold",
                      float: "right",
                    }}
                    classes={styles}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() =>
                      state.is_opt_edit
                        ? editOption(state.cur_edit_opt)
                        : addOption()
                    }
                  >
                    {state.is_opt_edit ? "Save" : "Add"}
                  </Button>
                </Typography>
                <input
                  style={{
                    margin: "auto",
                    marginBottom: "10px",
                  }}
                  id="option"
                  value={state.option}
                  onChange={handleChange}
                  type="text"
                  className={classes.textField}
                  placeholder="Option name"
                />

                <input
                  style={{
                    margin: "auto",
                    marginBottom: "10px",
                  }}
                  id="option_price"
                  value={state.option_price}
                  onChange={handleChange}
                  type="number"
                  className={classes.textField}
                  placeholder="Option cost"
                />
                <select
                  id="option_type"
                  value={state.option_type}
                  onChange={handleChange}
                  className={classes.textField}
                  placeholder="Option Type"
                >
                  <option value="minus">Deduct from total</option>
                  <option value="add">Add to total</option>
                  <option value="total">Option cost becomes total.</option>
                </select>
                <RadioGroup
                  aria-label="position"
                  value={state.option_food_type}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value={"veg"}
                    control={<Radio id="option_food_type" color="primary" />}
                    label={<span style={{ fontWeight: "bold" }}>Veg</span>}
                    labelPlacement="end"
                  />

                  <FormControlLabel
                    value={"non_veg"}
                    control={<Radio id="option_food_type" color="primary" />}
                    label={<span style={{ fontWeight: "bold" }}>Non Veg</span>}
                    labelPlacement="end"
                  />

                  <FormControlLabel
                    value={"egg_only"}
                    control={<Radio id="option_food_type" color="primary" />}
                    label={
                      <span style={{ fontWeight: "bold" }}>Contains Egg</span>
                    }
                    labelPlacement="end"
                  />
                </RadioGroup>
              </div>
            )}

            {Boolean(state.options?.length) == 0 && !state.show_options_form && (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                No Options Available (Press "Add" to add options)
              </div>
            )}
            {state.options.map((opt, id) =>
              state.cur_edit_opt === id ? (
                <></>
              ) : (
                <span key={id} className={classes.tag}>
                  {`${opt.option}`}
                  <span
                    style={{
                      padding: "6px",
                      fontWeight: "bold",
                      border: "1px solid lightgray",
                      borderRadius: "3px",
                      marginLeft: "20px",
                    }}
                  >
                    {" "}
                    <span style={{ marginRight: "2px" }}>&#8377;</span>
                    {opt.option_price}
                  </span>

                  <Tooltip title="Delete option" arrow>
                    <Button
                      style={{ marginRight: "5px" }}
                      onClick={() => deleteOption(id)}
                    >
                      <CloseRounded />
                    </Button>
                  </Tooltip>

                  <Tooltip title="Edit option" arrow>
                    <Button onClick={() => setEditForm(id)}>
                      <EditRoundedIcon />
                    </Button>
                  </Tooltip>
                </span>
              )
            )}
          </Collapse>
        </div>
      </DialogContent>
      <DialogActions className={gutterStyles.parent}>
        {!matchesSmDw && (
          <Button
            variant="default"
            color="primary"
            onClick={props.handleDialogClose}
          >
            <span style={{ fontWeight: "bold" }}>Cancel</span>
          </Button>
        )}
        <Button
          style={{ margin: "10px", fontWeight: "bold" }}
          classes={styles}
          variant={"contained"}
          color={"primary"}
          onClick={save}
        >
          <i style={{ margin: "6px" }} className="fas fa-save"></i>
          Save Changes
        </Button>
      </DialogActions>
    </div>
  );
};

export default CustumizationEditForm;
