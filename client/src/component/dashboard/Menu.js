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
  Tooltip
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { deepPurple } from "@material-ui/core/colors";
import item_img from "../../img/food.png";
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
import FlipMove from "react-flip-move";
import FbSpinner from "../layout/FbSpinner";

const useFirebaseBtnStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    borderRadius: 8
  },
  text: {
    paddingLeft: 16,
    paddingRight: 16
  },
  contained: {
    boxShadow: "none",
    "&:active": {
      boxShadow: shadows[0]
    }
  },
  containedPrimary: {
    backgroundColor: "#039be5",
    color: palette.common.white,
    "&:hover": {
      backgroundColor: "#0388ca",
      boxShadow: "none",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "#0388ca"
      }
    }
  },
  label: {
    textTransform: "none",
    letterSpacing: "0.5px",
    fontWeight: "bold"
  }
}));

const useStyles = makeStyles(() => ({
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "10px",
    margin: "auto",
    marginTop: "24px",
    marginBottom: "20px",
    backgroundColor: "white"
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
      borderColor: deepPurple[100]
    }
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

    "&:hover": {
      borderColor: "#7CB2F1"
    }
  },
  cardTitle: {
    fontSize: "1.17rem",
    color: "#122740",
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bolder"
  },
  cardSub: {
    fontSize: "0.975rem",
    color: "#75b583",
    // color: "#756e6e",
    borderRadius: "5px",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  itemImage: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "20px",
    "&:hover": {
      boxShadow: `1px 1px 5px ${deepPurple[400]}`
    }
  },
  cardDesc: {
    // backgroundColor: "#EBEDE8",
    // border: "2px solid #E7EDF3",
    // borderRadius: 5,
    // padding: "12px"
    // padding: "5px 20px ",
    // backgroundColor: "#b8f2ab",
    color: "#756e6e",
    // borderRadius: "5px",
    fontWeight: "bold",
    // border: "1px solid lightgray",
    marginBottom: "5px"
  },
  itemList: {
    margin: "auto",
    marginTop: "17px",
    padding: "20px",
    width: "90%",
    // overflowY: "auto",
    // overflowX: "auto",
    // height: "400px",

    "&::-webkit-scrollbar": {
      width: "16px",
      backgroundColor: "#ffffff"
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#ffffff",
      paddingTop: "10px",
      paddingBottom: "20px",

      "&:hover": {
        backgroundColor: "#F4F7FA"
      }
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: deepPurple[300],
      borderRadius: "16px",
      border: "5px solid white",
      "&:hover": {
        backgroundColor: deepPurple[400],
        border: "5px solid #F4F7FA"
      }
    },
    "&::-webkit-scrollbar-button": {
      display: "none"
    }
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
  },
  menuItem: {
    width: "150px",
    padding: "6px 16px",
    fontWeight: "bold",
    textAlign: "left"
    // borderBottom: "1px solid lightgray"
  },
  breadCrumb: {
    backgroundColor: "#e8eff4",
    border: "1px solid #90caf9",
    fontWeight: "bold",
    padding: "12px",
    borderRadius: "8px"
  },
  textField: {
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "80%",
    margin: "auto",
    padding: "10px",
    fontWeight: "bold"
  },
  paper: {
    width: "750px"
  }
}));

const AntTabs = withStyles({
  root: {
    // borderBottom: "1px solid #e8e8e8",
    // backgroundColor: "lightgray"
  },
  indicator: {
    backgroundColor: "#1890ff"
  }
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    // fontWeight: theme.typography.fontWeightRegular,
    fontSize: "0.85rem",
    fontWeight: "bold",
    marginRight: theme.spacing(4),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: "bold"
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const PurpleSwitch = withStyles({
  switchBase: {
    color: deepPurple[300],
    "&$checked": {
      color: deepPurple[500]
    },
    "&$checked + $track": {
      backgroundColor: deepPurple[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

function PaperComponent(props) {
  // const classes = useStyles();
  return (
    // <Draggable
    //   handle="#draggable-dialog-title"
    //   cancel={'[class*="MuiDialogContent-root"]'}
    // >
    <Paper style={{ borderRadius: "12px", padding: "12px" }} {...props} />
    // </Draggable>
  );
}

const CustumizationForm = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  // const gutterStyles = usePushingGutterStyles();
  const [state, setState] = React.useState({
    custumization_name: "",
    custum_type: "",
    option: "",
    options: [],
    option_type: "",
    option_price: "",
    custum_show: false,
    // custum_show_arr: [false],
    option_add: false,
    option_show: false
  });

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const toggleCollapse = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
    }));
  };
  const handleOptionAdd = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      option_add: true,
      option_show: true
    });
  };

  const handleOptionCancel = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      option_add: false,
      option_show: true,
      option: "",
      option_type: "",
      option_price: ""
    });
  };

  const addOption = () => {
    const { option, option_type, option_price } = state;
    const newOpt = { option, option_type, option_price };
    let arr = clone(state.options);
    arr = [...arr, newOpt];

    if (option !== "" && option_type !== "" && option_price !== "") {
      setState({
        ...state,
        options: clone(arr),
        option: "",
        option_type: "",
        option_price: ""
      });
    }
  };

  const deleteOption = optIdx => {
    let arr = state.options.filter((ele, idx) => idx !== optIdx);
    setState({
      ...state,
      options: clone(arr)
    });
  };

  const addCustum = () => {
    const { custumization_name, custum_type, options } = state;
    let newCustum = { custumization_name, custum_type, options };

    if (custumization_name !== "" && custum_type !== "" && options.length > 0) {
      setState({
        ...state,
        custumization_name: "",
        custum_type: "",
        options: []
      });
      props.addCustum(newCustum);
    }
  };

  return (
    <div
      style={{ paddingBottom: "20px", marginBottom: "10px" }}
      className={classes.card}
    >
      <Typography
        style={{ margin: "12px", marginBlock: "18px" }}
        className={classes.cardDesc}
      >
        Add Custumization
        <Button
          style={{
            // margin: "",
            fontWeight: "bold",
            float: "right"
          }}
          classes={styles}
          variant={"contained"}
          color={"primary"}
          onClick={addCustum}
        >
          Add
        </Button>
      </Typography>
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
          width: "96%",
          padding: "11px 12px",
          margin: "auto",
          marginTop: "10px"
        }}
        className={classes.section}
      >
        <Typography
          className={classes.cardDesc}
          style={{
            margin: `0px 8px  ${state.custum_show ? "16px" : "0px"} 8px`
          }}
          onClick={() => toggleCollapse("option_show")}
        >
          <i
            style={{ margin: "8px", fontSize: "25px" }}
            className="fas fa-poll"
          ></i>
          {/* {cust.custumization_name} */}
          Options
          <i
            style={{
              margin: "8px",
              fontSize: "22px",
              float: "right"
            }}
            className={`fas fa-sort-${state.cust_show ? "up" : "down"}`}
          ></i>
          <Button
            style={{
              margin: "5px 10px",
              ontWeight: "bold",
              float: "right"
            }}
            classes={styles}
            variant={"contained"}
            color={"primary"}
            onClick={!state.option_add ? handleOptionAdd : handleOptionCancel}
          >
            <i
              style={{ margin: "5px" }}
              className={`fas fa-${state.option_add ? "minus-square" : "plus"}`}
            ></i>
            {state.option_add ? "Hide" : "Add"}
          </Button>
        </Typography>
        <Collapse
          in={state.option_show}
          style={{
            display: state.option_add ? "flex" : "block",
            justifyContent: state.option_add ? "center" : "flex-start",
            width: "100%"
          }}
        >
          {state.option_add && (
            <div
              // style={{ marginBottom: "0px", padding: "20px",  }}
              style={{ width: "92%", margin: "18px auto" }}
              className={classes.card}
            >
              <Typography
                style={{ margin: "12px", marginBottom: "18px" }}
                className={classes.cardDesc}
              >
                Add Option
                <Button
                  style={{
                    // margin: "5px 10px",
                    fontWeight: "bold",
                    float: "right"
                  }}
                  classes={styles}
                  variant={"contained"}
                  color={"primary"}
                  onClick={addOption}
                >
                  Add
                </Button>
              </Typography>
              <input
                style={{
                  margin: "auto",
                  marginBottom: "10px"
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
                  marginBottom: "10px"
                }}
                id="option_price"
                value={state.option_price}
                onChange={handleChange}
                type="number"
                className={classes.textField}
                placeholder="Option cost"
              />
              <RadioGroup
                aria-label="position"
                value={state.option_type}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value={"minus"}
                  control={<Radio id="option_type" color="primary" />}
                  label={
                    <span style={{ fontWeight: "bold" }}>
                      Deduct from total
                    </span>
                  }
                  labelPlacement="end"
                />

                <FormControlLabel
                  value={"add"}
                  control={<Radio id="option_type" color="primary" />}
                  label={
                    <span style={{ fontWeight: "bold" }}>Add to total</span>
                  }
                  labelPlacement="end"
                />

                <FormControlLabel
                  value={"total"}
                  control={<Radio id="option_type" color="primary" />}
                  label={
                    <span style={{ fontWeight: "bold" }}>
                      Option cost becomes total.
                    </span>
                  }
                  labelPlacement="end"
                />
              </RadioGroup>
            </div>
          )}

          {state.options.length === 0 && !state.option_add && (
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              No Options Available (Press Add to add options)
            </div>
          )}
          {state.options.map((opt, id) => (
            <span key={id} className={classes.tag}>
              {`${opt.option}`}
              <span
                style={{
                  padding: "6px",
                  fontWeight: "bold",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  marginLeft: "20px"
                }}
              >{`${"Rs"}. ${opt.option_price}`}</span>
              <Button onClick={() => deleteOption(id)}>
                <CloseRounded />
              </Button>
            </span>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

const ItemForm = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();

  // const cust_arr = custumization_arr.map(cust => {
  //   let opt_arr = cust.options.map(opt => ({
  //     option: opt.option,
  //     option_price: opt.option_price,
  //     option_type: opt.option_type
  //   }));
  //   return {
  //     custumization_name: cust.custumization_name,
  //     custum_type: cust.custum_type,
  //     options: [...opt_arr]
  //   };
  // });
  let custumization_arr = (props.item && props.item.custumization_arr) || [];

  const show_arr = Array.from(
    { length: custumization_arr.length },
    ele => false
  );

  const cust_arr = clone(custumization_arr);

  const [state, setState] = React.useState({
    item_name: (props.item && props.item.item_name) || "",
    item_price: (props.item && props.item.item_price) || "",
    currency: (props.item && props.item.currency) || "",
    item_desc: (props.item && props.item.item_desc) || "",
    food_type: (props.item && props.item.food_type) || "",
    // custumization: "",
    // custum_type: "", //Is the no of options that can be selected in the custumization number is oly correct bcpz item choosing also has a limit
    custumization_arr: clone(cust_arr),
    custum_show: false,
    custum_show_arr: [...show_arr],
    custum_edit: false,
    custum_add: false,
    add_show: false
  });

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const toggleCollapse = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
    }));
  };

  const toggleCustShow = (content, idx) => {
    // console.log(idx);
    let new_arr = state.custum_show_arr;
    new_arr[idx] = !new_arr[idx];
    setState(prevState => ({
      ...prevState,
      [content]: [...new_arr]
    }));
  };

  const handleCustumEdit = evt => {
    evt.stopPropagation();
    setState(prevState => ({
      ...prevState,
      custum_edit: true,
      custum_show: true,
      custum_add: false
    }));
  };

  const handleCustumUndo = evt => {
    evt.stopPropagation();
    const arr = [...cust_arr];
    setState(prevState => ({
      ...prevState,
      custum_edit: false,
      custum_add: false,
      custum_show: true,
      custumization_arr: clone(arr)
    }));
  };

  const handleCustomChange = (value, custum_key, idx) => {
    let arr = [...state.custumization_arr];
    arr[idx][custum_key] = value;

    setState(prevState => ({
      ...prevState,
      custumization_arr: clone(arr)
    }));
  };

  const handleOptionChange = (value, custIdx, option_key, opt_idx) => {
    let arr = [...state.custumization_arr];
    arr[custIdx].options[opt_idx][option_key] = value;

    setState(prevState => ({
      ...prevState,
      custumization_arr: clone(arr)
    }));
  };

  const handleCustumDelete = (index, cust_name) => {
    const custIdx = Boolean(Number(index))
      ? index
      : state.custumization_arr.findIndex(
          ele => ele.custumization_name === cust_name
        );
    const arr = state.custumization_arr;
    const newArr = arr.filter((ele, idx) => idx !== custIdx);
    // console.log("Clicked");

    setState(prevState => ({
      ...prevState,
      custumization_arr: clone(newArr)
    }));
  };

  const handleOptionDelete = (cust_index, cust_name, opt_index, opt_name) => {
    const custIdx = Boolean(Number(cust_index))
      ? cust_index
      : state.custumization_arr.findIndex(
          ele => ele.custumization_name === cust_name
        );

    const optIdx = Boolean(Number(opt_index))
      ? opt_index
      : state.custumization_arr[custIdx].options.findIndex(
          ele => ele.option === opt_name
        );

    const arr = state.custumization_arr;
    arr[custIdx].options = arr[custIdx].options.filter(
      (ele, idx) => idx !== optIdx
    );
    // arr[custIdx].options = [...newOptArr];
    const newArr = [...arr];
    // console.log("Clicked");

    setState(prevState => ({
      ...prevState,
      custumization_arr: clone(newArr)
    }));
  };

  const updateItem = () => {
    const { item_name, item_desc, food_type } = state;
    let newItem = { item_name, item_desc, food_type };

    if (!props.isPackage) {
      let { item_price, currency } = state;
      let custumization_arr = clone(state.custumization_arr);
      newItem = { ...newItem, custumization_arr, item_price, currency };
    } else {
      let custumization_arr = [];
      newItem = { ...newItem, custumization_arr };
    }

    props.updateItem(newItem);
  };

  const handleCustumAdd = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      custum_show: true,
      custum_add: true,
      custum_edit: false
    });
  };

  const handleCustumCancel = evt => {
    evt.stopPropagation();

    setState({
      ...state,
      custum_show: true,
      custum_add: false,
      custum_edit: false
    });
  };

  const addCustum = newCustum => {
    let arr = clone(state.custumization_arr);
    arr = [...arr, newCustum];

    setState({
      ...state,
      custumization_arr: clone(arr)
    });
  };

  return (
    <div>
      <DialogTitle
        // style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        <span className={classes.cardTitle}>
          <i style={{ margin: "8px" }} className="fas fa-edit"></i>
          {props.isEdit ? "Edit Item" : "Add Item"}
        </span>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <input
              id="item_name"
              value={state.item_name}
              onChange={handleChange}
              style={{ width: "97%" }}
              className={classes.textField}
              placeholder="Item name"
            />
          </Grid>

          {!props.isPackage && (
            <Grid item xs={12}>
              <Grid container justify="flex-start" spacing={3}>
                <Grid item xs={6} sm={5} md={4}>
                  <select
                    id="currency"
                    value={state.currency}
                    onChange={handleChange}
                    className={classes.textField}
                    placeholder="Currency"
                  >
                    <option>- -</option>
                    <option value="RS">RS</option>
                    <option value="$">$</option>
                  </select>
                </Grid>

                <Grid item xs={6} sm={5} md={4}>
                  <input
                    id="item_price"
                    value={state.item_price}
                    onChange={handleChange}
                    type="number"
                    className={classes.textField}
                    placeholder="Item price"
                  />
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            <RadioGroup
              aria-label="position"
              value={state.food_type}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value={"veg"}
                control={<Radio id="food_type" color="primary" />}
                label={<span style={{ fontWeight: "bold" }}>Veg</span>}
                labelPlacement="end"
              />

              <FormControlLabel
                value={"non_veg"}
                control={<Radio id="food_type" color="primary" />}
                label={<span style={{ fontWeight: "bold" }}>Non-Veg</span>}
                labelPlacement="end"
              />

              <FormControlLabel
                value={"egg_only"}
                control={<Radio id="food_type" color="primary" />}
                label={<span style={{ fontWeight: "bold" }}>Contains-Egg</span>}
                labelPlacement="end"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <textarea
              id="item_desc"
              value={state.item_desc}
              onChange={handleChange}
              style={{ width: "97%" }}
              className={classes.textField}
              placeholder="Description"
            ></textarea>
          </Grid>
        </Grid>
        {/* <CustumizationForm addCustum={addCustum} /> */}

        {!props.isPackage && (
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="start"
            justify="flex-start"
          >
            <Grid
              style={{ margin: "10px 2px 10px 2px" }}
              className={classes.section}
              item
              xs={12}
            >
              <Typography
                className={classes.cardDesc}
                style={{
                  margin: `5px 8px  ${state.custum_show ? "16px" : "0px"} 8px`
                }}
                onClick={() => toggleCollapse("custum_show")}
              >
                <Badge
                  badgeContent={
                    state.custumization_arr.length === 0
                      ? "0"
                      : state.custumization_arr.length
                  }
                  color="primary"
                >
                  <span>
                    <i
                      style={{ margin: "8px", fontSize: "23px" }}
                      className="fas fa-list"
                    ></i>
                    Custumizations
                  </span>
                </Badge>

                <i
                  style={{ margin: "8px", fontSize: "22px", float: "right" }}
                  className={`fas fa-sort-${state.custum_show ? "up" : "down"}`}
                ></i>
                <Button
                  style={{
                    margin: "5px 10px",
                    fontWeight: "bold",
                    float: "right"
                  }}
                  classes={styles}
                  variant={"contained"}
                  color={"primary"}
                  onClick={
                    !state.custum_add ? handleCustumAdd : handleCustumCancel
                  }
                >
                  <i
                    style={{ margin: "5px" }}
                    className={`fas fa-${
                      !state.custum_add ? "plus" : "minus-square"
                    }`}
                  ></i>
                  {!state.custum_add ? "Add" : "Hide"}
                </Button>
                {props.isEdit && (
                  <Button
                    style={{
                      margin: "5px 10px",
                      fontWeight: "bold",
                      float: "right"
                    }}
                    classes={styles}
                    variant={"contained"}
                    color={"primary"}
                    onClick={
                      !state.custum_edit ? handleCustumEdit : handleCustumUndo
                    }
                  >
                    <i
                      style={{ margin: "5px" }}
                      className={`fas fa-${
                        !state.custum_edit ? "pen" : "undo-alt"
                      }`}
                    ></i>
                    {!state.custum_edit ? "Edit" : "Undo"}
                  </Button>
                )}
              </Typography>

              <Collapse in={state.custum_show}>
                {state.custum_add && (
                  <div
                    style={{
                      width: "96%",
                      padding: "11px 12px",
                      margin: "auto",
                      marginTop: "10px"
                    }}
                    className={classes.section}
                  >
                    <Typography
                      className={classes.cardDesc}
                      style={{
                        margin: `0px 8px  ${
                          state.add_show ? "16px" : "0px"
                        } 8px`
                      }}
                      onClick={() => toggleCollapse("add_show")}
                    >
                      <i
                        style={{ margin: "8px", fontSize: "25px" }}
                        className="fas fa-poll"
                      ></i>
                      {/* {cust.custumization_name} */}
                      {!state.custum_add ? "Add a Custumization" : "Form"}
                      <i
                        style={{
                          margin: "8px",
                          fontSize: "22px",
                          float: "right"
                        }}
                        className={`fas fa-sort-${
                          state.add_show ? "up" : "down"
                        }`}
                      ></i>
                    </Typography>
                    <Collapse in={state.add_show}>
                      <CustumizationForm addCustum={addCustum} />
                    </Collapse>
                  </div>
                )}

                {state.custumization_arr.length === 0 && !state.custum_add && (
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: "15px"
                    }}
                  >
                    No Custumizations Available (Press Undo to undo changes
                    made..)
                  </div>
                )}
                {state.custumization_arr.map((cust, idx) => (
                  <div>
                    {state.custum_edit ? (
                      props.isEdit && (
                        <div className={classes.card}>
                          <Typography
                            style={{ margin: "12px" }}
                            className={classes.cardDesc}
                          >
                            Edit Custumization
                            <Button
                              style={{
                                // margin: "8px",
                                float: "right"
                              }}
                              onClick={() =>
                                handleCustumDelete(idx, cust.custumization_name)
                              }
                            >
                              <i
                                style={{ margin: "8px", fontSize: "22px" }}
                                className={`fas fa-trash-alt`}
                              ></i>
                            </Button>
                          </Typography>
                          <input
                            id="custumization"
                            value={cust.custumization_name}
                            onChange={evt =>
                              handleCustomChange(
                                evt.target.value,
                                "custumization_name",
                                idx
                              )
                            }
                            type="text"
                            style={{ marginBottom: "10px" }}
                            className={classes.textField}
                            placeholder="Name of custumization"
                          />

                          <input
                            id="custum_type"
                            value={cust.custum_type}
                            onChange={evt =>
                              handleCustomChange(
                                evt.target.value,
                                "custum_type",
                                idx
                              )
                            }
                            type="number"
                            style={{ marginBottom: "10px" }}
                            className={classes.textField}
                            placeholder="No. of options that can be selected"
                          />
                          <div
                            key={idx}
                            style={{
                              width: "96%",
                              padding: "11px 12px",
                              margin: "auto",
                              marginTop: "10px"
                            }}
                            className={classes.section}
                          >
                            <Typography
                              className={classes.cardDesc}
                              style={{
                                margin: `0px 8px  ${
                                  state.custum_show_arr[idx] ? "16px" : "0px"
                                } 8px`
                              }}
                              onClick={() =>
                                toggleCustShow("custum_show_arr", idx)
                              }
                            >
                              <i
                                style={{ margin: "8px", fontSize: "25px" }}
                                className="fas fa-poll"
                              ></i>
                              {/* {cust.custumization_name} */}
                              Options
                              <i
                                style={{
                                  margin: "8px",
                                  fontSize: "22px",
                                  float: "right"
                                }}
                                className={`fas fa-sort-${
                                  state.cust_show ? "up" : "down"
                                }`}
                              ></i>
                            </Typography>
                            <Collapse in={state.custum_show_arr[idx]}>
                              {cust.options.length === 0 && !state.option_add && (
                                <div
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    marginTop: "15px"
                                  }}
                                >
                                  No Options Available (Press Undo to undo
                                  changes made..)
                                </div>
                              )}
                              {cust.options.map((opt, id) => (
                                <div className={classes.card}>
                                  <Typography
                                    style={{ margin: "12px" }}
                                    className={classes.cardDesc}
                                  >
                                    Edit Option
                                    <Button
                                      style={{
                                        // margin: "8px",
                                        float: "right"
                                      }}
                                      onClick={() =>
                                        handleOptionDelete(
                                          idx,
                                          cust.custumization_name,
                                          id,
                                          opt.option
                                        )
                                      }
                                    >
                                      <i
                                        style={{
                                          margin: "8px",
                                          fontSize: "22px"
                                        }}
                                        className={`fas fa-trash-alt`}
                                      ></i>
                                    </Button>
                                  </Typography>
                                  <input
                                    style={{
                                      margin: "auto",
                                      marginBottom: "10px"
                                    }}
                                    id="option"
                                    value={opt.option}
                                    onChange={evt =>
                                      handleOptionChange(
                                        evt.target.value,
                                        idx,
                                        "option",
                                        id
                                      )
                                    }
                                    type="text"
                                    className={classes.textField}
                                    placeholder="Option name"
                                  />

                                  <input
                                    style={{
                                      margin: "auto",
                                      marginBottom: "10px"
                                    }}
                                    id="option_price"
                                    value={opt.option_price}
                                    onChange={evt =>
                                      handleOptionChange(
                                        evt.target.value,
                                        idx,
                                        "option_price",
                                        id
                                      )
                                    }
                                    type="number"
                                    className={classes.textField}
                                    placeholder="Option cost"
                                  />
                                  <RadioGroup
                                    aria-label="position"
                                    value={opt.option_type}
                                    onChange={evt =>
                                      handleOptionChange(
                                        evt.target.value,
                                        idx,
                                        "option_type",
                                        id
                                      )
                                    }
                                    row
                                  >
                                    <FormControlLabel
                                      value={"minus"}
                                      control={
                                        <Radio
                                          id="option_type"
                                          color="primary"
                                        />
                                      }
                                      label={
                                        <span style={{ fontWeight: "bold" }}>
                                          Deduct from total
                                        </span>
                                      }
                                      labelPlacement="end"
                                    />

                                    <FormControlLabel
                                      value={"add"}
                                      control={
                                        <Radio
                                          id="option_type"
                                          color="primary"
                                        />
                                      }
                                      label={
                                        <span style={{ fontWeight: "bold" }}>
                                          Add to total
                                        </span>
                                      }
                                      labelPlacement="end"
                                    />

                                    <FormControlLabel
                                      value={"total"}
                                      control={
                                        <Radio
                                          id="option_type"
                                          color="primary"
                                        />
                                      }
                                      label={
                                        <span style={{ fontWeight: "bold" }}>
                                          Option cost becomes total.
                                        </span>
                                      }
                                      labelPlacement="end"
                                    />
                                  </RadioGroup>
                                </div>
                              ))}
                            </Collapse>
                          </div>
                        </div>
                      )
                    ) : (
                      <div>
                        <div
                          key={idx}
                          style={{
                            width: "96%",
                            padding: "11px 12px",
                            margin: "auto",
                            marginTop: "10px"
                          }}
                          className={classes.section}
                        >
                          <Typography
                            className={classes.cardDesc}
                            style={{
                              margin: `0px 8px  ${
                                state.custum_show_arr[idx] ? "16px" : "0px"
                              } 8px`
                            }}
                            onClick={() =>
                              toggleCustShow("custum_show_arr", idx)
                            }
                          >
                            <i
                              style={{ margin: "8px", fontSize: "25px" }}
                              className="fas fa-poll"
                            ></i>
                            {cust.custumization_name}
                            <i
                              style={{
                                margin: "8px",
                                fontSize: "22px",
                                float: "right"
                              }}
                              className={`fas fa-sort-${
                                state.cust_show ? "up" : "down"
                              }`}
                            ></i>
                          </Typography>

                          <Collapse in={state.custum_show_arr[idx]}>
                            {cust.options.map((opt, id) => (
                              <span key={id} className={classes.tag}>
                                {`${opt.option}`}
                                <span
                                  style={{
                                    padding: "6px",
                                    fontWeight: "bold",
                                    border: "1px solid lightgray",
                                    borderRadius: "3px",
                                    marginLeft: "20px"
                                  }}
                                >{`${state.currency}. ${opt.option_price}`}</span>
                              </span>
                            ))}
                          </Collapse>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Collapse>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions className={gutterStyles.parent}>
        <Button
          variant="default"
          color="primary"
          onClick={props.handleDialogClose}
        >
          <span style={{ fontWeight: "bold" }}>Cancel</span>
        </Button>
        <Button
          style={{ margin: "10px", fontWeight: "bold" }}
          classes={styles}
          variant={"contained"}
          color={"primary"}
          onClick={updateItem}
        >
          <i style={{ margin: "6px" }} className="fas fa-save"></i>
          Save Changes
        </Button>
      </DialogActions>
    </div>
  );
};

const Item = forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    item_name,
    // item_price,
    currency,
    item_desc,
    // food_type,
    custumization_arr
  } = props.item;

  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();

  const show_arr = Array.from(
    { length: custumization_arr.length },
    ele => false
  );

  const [state, setState] = React.useState({
    desc_show: false,
    custum_show: false,
    custum_show_arr: [...show_arr],
    anchorEl: null,
    status: true,
    dialog_open: false,
    dialog2_open: false
  });

  const toggleCollapse = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
    }));
  };

  const toggleCustShow = (content, idx) => {
    // console.log(idx);
    let new_arr = state.custum_show_arr;
    new_arr[idx] = !new_arr[idx];
    setState(prevState => ({
      ...prevState,
      [content]: [...new_arr]
    }));
  };

  const handleClick = event => {
    setState({
      ...state,
      anchorEl: event.currentTarget
    });
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.name]: evt.target.checked
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  const handleDialogOpen = content => {
    setState({
      ...state,
      [content]: true,
      anchorEl: null
    });
  };

  const handleDialogClose = content => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false
    });
  };

  const updateItem = item => {
    // console.log("Item - ", props.item._id);

    setState({
      ...state,
      dialog_open: false
    });
    props.updateItem(item, props.item._id, props.catId, props.item.item_name);
  };

  const deleteItem = () => {
    setState({
      ...state,
      dialog2_open: false
    });
    props.deleteItem(props.item._id, props.catId, props.item.item_name);
  };

  return (
    <div ref={ref} className={classes.card}>
      <div className="all_dialogs">
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog_open}
          fullWidth={true}
          maxWidth={"md"}
          scroll="body"
          onClose={() => handleDialogClose("dialog_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <ItemForm
            item={props.item ? props.item : {}}
            isPackage={Boolean(props.isPackage)}
            isEdit={true}
            handleDialogClose={() => handleDialogClose("dialog_open")}
            // addItem={addItem}
            updateItem={updateItem}
          />
        </Dialog>

        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog2_open}
          fullWidth={true}
          maxWidth={"sm"}
          scroll="body"
          onClose={() => handleDialogClose("dialog2_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            <span className={classes.cardTitle}>
              <i
                style={{ margin: "8px" }}
                className="fas fa-exclamation-triangle"
              ></i>
              Confirmation
            </span>
          </DialogTitle>

          <DialogContent>
            <Typography className={classes.cardDesc}>
              Do yo really want to delete the item "{props.item.item_name}" ?
            </Typography>
          </DialogContent>

          <DialogActions className={gutterStyles.parent}>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={deleteItem}
            >
              Yes
            </Button>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={() => handleDialogClose("dialog2_open")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="start"
        justify="flex-start"
      >
        <Grid style={{ padding: "0px 8px 0px 8px" }} item xs={12}>
          <i
            aria-controls="simple-menu"
            aria-haspopup="true"
            style={{ float: "right", fontSize: "17px" }}
            className="fas fa-ellipsis-v"
            onClick={handleClick}
          ></i>

          <MaterialMenu
            id="simple-menu"
            // className={classes.materialMenu}
            // style={{ backgroundColor: "white" }}
            anchorEl={state.anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            open={Boolean(state.anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              className={classes.menuItem}
              // onClick={handleClose}
            >
              <FormControlLabel
                style={{ fontWeight: "bold" }}
                control={
                  <PurpleSwitch
                    checked={state.status}
                    onChange={handleChange}
                    name="status"
                  />
                }
                label={
                  <span style={{ fontWeight: "bold" }}>{`${
                    state.status ? "Online" : "Offline"
                  }`}</span>
                }
              />
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => handleDialogOpen("dialog_open")}
            >
              <i style={{ margin: "8px" }} className="fas fa-pen"></i>
              Edit
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => handleDialogOpen("dialog2_open")}
            >
              <i style={{ margin: "8px" }} className="fas fa-trash-alt"></i>
              Delete
            </MenuItem>
          </MaterialMenu>
        </Grid>
        <Grid style={{ paddingLeft: "25px" }} item xs={12} sm={12} md={3}>
          <img
            src={item_img}
            alt="Item"
            className={classes.itemImage}
            style={{
              width: "120px",
              height: "120px"
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Grid
            container
            // spacing={1}
            direction="row"
            alignItems="start"
            justify="flex-start"
          >
            <Grid item xs={6} sm={6} md={12}>
              {" "}
              <Typography className={classes.cardTitle}>
                <b>{item_name}</b>
              </Typography>
            </Grid>
            {props.item.item_price && (
              <Grid item xs={6} sm={6} md={12}>
                <Typography className={classes.cardSub}>
                  Rs. {props.item.item_price}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}></Grid>
            <Typography
              className={classes.cardDesc}
              onClick={() => toggleCollapse("desc_show")}
              style={{ marginTop: "5px" }}
            >
              {item_desc.length > 40 &&
                !state.desc_show &&
                item_desc.slice(0, 30).concat("... ")}

              {item_desc.length > 40 && !state.desc_show && (
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    color: deepPurple[100]
                  }}
                >
                  more
                </span>
              )}
              {item_desc.length <= 40 && <span>{item_desc}</span>}

              {item_desc.length > 40 && (
                <Collapse in={state.desc_show}>
                  {item_desc}
                  {".  "}
                  <span
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      color: deepPurple[100]
                    }}
                  >
                    less
                  </span>
                </Collapse>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {custumization_arr.length !== 0 && (
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="start"
          justify="flex-start"
        >
          <Grid
            style={{ margin: "10px 2px 10px 2px" }}
            className={classes.section}
            item
            xs={12}
          >
            <Typography
              className={classes.cardDesc}
              style={{
                margin: `5px 8px  ${state.custum_show ? "16px" : "0px"} 8px`
              }}
              onClick={() => toggleCollapse("custum_show")}
            >
              <Badge
                badgeContent={
                  custumization_arr.length === 0
                    ? "0"
                    : custumization_arr.length
                }
                color="primary"
              >
                <span>
                  <i
                    style={{ margin: "8px", fontSize: "23px" }}
                    className="fas fa-list"
                  ></i>
                  Custumizations
                </span>
              </Badge>
              <i
                style={{ margin: "8px", fontSize: "22px", float: "right" }}
                className={`fas fa-sort-${state.custum_show ? "up" : "down"}`}
              ></i>
            </Typography>

            <Collapse in={state.custum_show}>
              {custumization_arr.map((cust, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "96%",
                    padding: "11px 12px",
                    margin: "auto",
                    marginTop: "10px"
                  }}
                  className={classes.section}
                >
                  <Typography
                    className={classes.cardDesc}
                    style={{
                      margin: `0px 8px  ${
                        state.custum_show_arr[idx] ? "16px" : "0px"
                      } 8px`
                    }}
                    onClick={() => toggleCustShow("custum_show_arr", idx)}
                  >
                    <i
                      style={{ margin: "8px", fontSize: "25px" }}
                      className="fas fa-poll"
                    ></i>
                    {cust.custumization_name}
                    <i
                      style={{
                        margin: "8px",
                        fontSize: "22px",
                        float: "right"
                      }}
                      className={`fas fa-sort-${
                        state.cust_show ? "up" : "down"
                      }`}
                    ></i>
                  </Typography>

                  <Collapse in={state.custum_show_arr[idx]}>
                    {cust.options.map((opt, id) => (
                      <span key={id} className={classes.tag}>
                        {`${opt.option}`}
                        <span
                          style={{
                            padding: "6px",
                            fontWeight: "bold",
                            border: "1px solid lightgray",
                            borderRadius: "3px",
                            marginLeft: "20px"
                          }}
                        >{`${currency}. ${opt.option_price}`}</span>
                      </span>
                    ))}
                  </Collapse>
                </div>
              ))}
            </Collapse>
          </Grid>
        </Grid>
      )}
    </div>
  );
});

const Category = forwardRef((props, ref) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  const [state, setState] = React.useState({
    cat_show: false,
    show_options: false,
    cat_edit: false,
    category_name: props.category.category_name || "",
    items: clone(props.category.items),
    dialog2_open: false,
    dialog_open: false
  });

  const toggleCollapse = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
    }));
  };

  const handleMouseIn = () => {
    setState({
      ...state,
      show_options: true
    });
  };

  const handleMouseOut = () => {
    setState({
      ...state,
      show_options: state.cat_show ? true : false
    });
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const handleCatEdit = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      category_name: props.category.category_name || "",
      cat_edit: true
    });
  };

  const handleCatEditClose = () => {
    setState({
      ...state,
      cat_edit: false
    });
  };

  const handleDialogOpen = (evt, content) => {
    evt.stopPropagation();
    setState({
      ...state,
      [content]: true,
      anchorEl: null
    });
  };

  const handleDialogClose = content => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false,
      category_name: props.category.category_name || ""
    });
  };

  const addItem = item => {
    setState({
      ...state,
      dialog_open: false
    });
    props.addItem(item, props.catId);
  };

  const updateCat = () => {
    setState({
      ...state,
      cat_edit: false
    });
    props.updateCat(
      state.category_name,
      props.catId,
      props.category.category_name
    );
  };

  const deleteCatOrPack = () => {
    setState({
      ...state,
      dialog2_open: false
    });
    props.deleteCatOrPack(props.catId, props.category.category_name);
  };

  return (
    <div ref={ref}>
      <div className="all_dialogs">
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog_open}
          fullWidth={true}
          maxWidth={"md"}
          scroll="body"
          onClose={() => handleDialogClose("dialog_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <ItemForm
            item={props.item ? props.item : {}}
            isPackage={false}
            isEdit={false}
            handleDialogClose={() => handleDialogClose("dialog_open")}
            updateItem={addItem}
          />
        </Dialog>

        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog2_open}
          fullWidth={true}
          maxWidth={"sm"}
          scroll="body"
          onClose={() => handleDialogClose("dialog2_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            <span className={classes.cardTitle}>
              <i
                style={{ margin: "8px" }}
                className="fas fa-exclamation-triangle"
              ></i>
              Confirmation
            </span>
          </DialogTitle>

          <DialogContent>
            <Typography className={classes.cardDesc}>
              Do yo really want to delete the Category "
              {props.category.category_name}", Deleting will also delete all
              items in it ?
            </Typography>
          </DialogContent>

          <DialogActions className={gutterStyles.parent}>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={deleteCatOrPack}
            >
              Yes
            </Button>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={() => handleDialogClose("dialog2_open")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {state.cat_edit ? (
        <div className={classes.card}>
          <Typography className={classes.cardDesc} style={{ margin: "12px" }}>
            Edit category name
          </Typography>
          <div>
            <input
              id="category_name"
              value={state.category_name}
              onChange={handleChange}
              type="text"
              style={{ marginBottom: "10px" }}
              className={classes.textField}
              placeholder="Category name"
            />
          </div>

          <div className={gutterStyles.parent}>
            <Button
              variant="default"
              color="primary"
              onClick={handleCatEditClose}
            >
              <span style={{ fontWeight: "bold" }}>Cancel</span>
            </Button>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={updateCat}
            >
              <i style={{ margin: "6px" }} className="fas fa-save"></i>
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={classes.card}
          style={{ width: "98%" }}
          onMouseEnter={handleMouseIn}
          onMouseLeave={handleMouseOut}
        >
          <Typography
            className={classes.cardTitle}
            style={{
              fontWeight: "bolder",
              marginBottom: `${!state.cat_show ? "2px" : "20px"}`
            }}
            onClick={() => toggleCollapse("cat_show")}
          >
            <i
              style={{ margin: "7px", fontSize: "25px" }}
              className="fas fa-clipboard-list"
            ></i>

            {props.category && props.category.category_name}
            <span
              style={{
                borderRadius: "5px",
                color: "#7C7575",
                fontSize: "12px",
                backgroundColor: "#EBEDE8",
                padding: "5px",
                margin: "4px 8px"
                // border: "1px solid lightgray"
              }}
            >
              {`${props.category.items.length} items`}
            </span>

            <i
              style={{ margin: "8px", fontSize: "22px", float: "right" }}
              className={`fas fa-sort-${state.cat_show ? "up" : "down"}`}
            ></i>
            {state.show_options && (
              <span style={{ margin: "8px", float: "right" }}>
                <Tooltip title="Delete category" arrow>
                  <button
                    style={{
                      margin: "0px 8px",
                      width: "40px",
                      border: "none",
                      textAlign: "center",
                      borderRadius: "4px",
                      backgroundColor: "#efc2c2",
                      padding: "4px"
                    }}
                    onClick={evt => handleDialogOpen(evt, "dialog2_open")}
                  >
                    <i
                      style={{ margin: "4px", fontSize: "16px" }}
                      className="fas fa-trash-alt"
                    ></i>
                  </button>
                </Tooltip>
                <Tooltip title="Edit Category" arrow>
                  <button
                    style={{
                      margin: "0px 8px",
                      width: "40px",
                      border: "none",
                      textAlign: "center",
                      borderRadius: "4px",
                      backgroundColor: "#c4dff2",
                      padding: "4px"
                    }}
                    onClick={handleCatEdit}
                  >
                    <i
                      style={{ margin: "4px", fontSize: "16px" }}
                      className="fas fa-edit"
                    ></i>
                  </button>
                </Tooltip>
                <Tooltip title="Add item" arrow>
                  <button
                    style={{
                      margin: "0px 8px",
                      width: "40px",
                      border: "none",
                      textAlign: "center",
                      borderRadius: "4px",
                      // backgroundColor: "#efc2c2",
                      padding: "4px"
                    }}
                    onClick={evt => handleDialogOpen(evt, "dialog_open")}
                  >
                    <i
                      style={{ margin: "4px", fontSize: "16px" }}
                      className="fas fa-plus"
                    ></i>
                  </button>
                </Tooltip>
              </span>
            )}
          </Typography>
          {/* <Divider /> */}
          <Collapse in={state.cat_show}>
            <FlipMove>
              {props.category &&
                props.category.items.map((item, idx) => (
                  <Item
                    catId={props.catId}
                    key={idx}
                    isPackage={false}
                    item={item}
                    addItem={addItem}
                    updateItem={props.updateItem}
                    deleteItem={props.deleteItem}
                  />
                ))}
            </FlipMove>
          </Collapse>
        </div>
      )}
    </div>
  );
});

const PackageForm = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  let custumization_arr =
    (props.package && props.package.custumization_arr) || [];

  const show_arr = Array.from(
    { length: custumization_arr.length },
    ele => false
  );

  // let { custumization_arr } = props.package;
  const cust_arr = clone(custumization_arr);

  const [state, setState] = React.useState({
    package_name: (props.package && props.package.package_name) || "",
    package_price: (props.package && props.package.package_price) || "",
    // currency: props.package && props.package.currency || "",
    package_desc: (props.package && props.package.package_desc) || "",
    // food_type: props.package && props.package.food_type || "",
    // custumization: "",
    // custum_type: "", //Is the no of options that can be selected in the custumization number is oly correct bcpz item choosing also has a limit
    custumization_arr: clone(cust_arr),
    // item_show: false,
    custum_show: false,
    custum_show_arr: [...show_arr],
    custum_edit: false,
    custum_add: false,
    add_show: false
  });

  // const { custumization_arr } = state;

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const toggleCollapse = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
    }));
  };

  const toggleCustShow = (content, idx) => {
    // console.log(idx);
    let new_arr = state.custum_show_arr;
    new_arr[idx] = !new_arr[idx];
    setState(prevState => ({
      ...prevState,
      [content]: [...new_arr]
    }));
  };

  const handleCustumEdit = evt => {
    evt.stopPropagation();
    setState(prevState => ({
      ...prevState,
      custum_edit: true,
      custum_show: true,
      custum_add: false
    }));
  };

  const handleCustumUndo = evt => {
    evt.stopPropagation();
    const arr = [...cust_arr];
    setState(prevState => ({
      ...prevState,
      custum_edit: false,
      custum_add: false,
      custum_show: true,
      custumization_arr: clone(arr)
    }));
  };

  // const handleCustumEdit = evt => {
  //   evt.stopPropagation();
  //   setState(prevState => ({
  //     ...prevState,
  //     custum_edit: true,
  //     custum_show: true
  //   }));
  // };

  // const handleCustumUndo = evt => {
  //   evt.stopPropagation();
  //   const arr = [...cust_arr];
  //   setState(prevState => ({
  //     ...prevState,
  //     custum_edit: false,
  //     // custum_show: true,
  //     custumization_arr: clone(arr)
  //   }));
  // };

  const handleCustomChange = (value, custum_key, idx) => {
    let arr = [...state.custumization_arr];
    arr[idx][custum_key] = value;

    setState(prevState => ({
      ...prevState,
      custumization_arr: clone(arr)
    }));
  };

  const handleOptionChange = (value, custIdx, option_key, opt_idx) => {
    let arr = [...state.custumization_arr];
    arr[custIdx].options[opt_idx][option_key] = value;

    setState(prevState => ({
      ...prevState,
      custumization_arr: clone(arr)
    }));
  };

  const handleCustumDelete = (index, cust_name) => {
    const custIdx = Boolean(Number(index))
      ? index
      : state.custumization_arr.findIndex(
          ele => ele.custumization_name === cust_name
        );
    const arr = state.custumization_arr;
    const newArr = arr.filter((ele, idx) => idx !== custIdx);
    // console.log("Clicked");

    setState(prevState => ({
      ...prevState,
      custumization_arr: clone(newArr)
    }));
  };

  const handleOptionDelete = (cust_index, cust_name, opt_index, opt_name) => {
    const custIdx = Boolean(Number(cust_index))
      ? cust_index
      : state.custumization_arr.findIndex(
          ele => ele.custumization_name === cust_name
        );

    const optIdx = Boolean(Number(opt_index))
      ? opt_index
      : state.custumization_arr[custIdx].options.findIndex(
          ele => ele.option === opt_name
        );

    const arr = state.custumization_arr;
    arr[custIdx].options = arr[custIdx].options.filter(
      (ele, idx) => idx !== optIdx
    );
    // arr[custIdx].options = [...newOptArr];
    const newArr = [...arr];
    // console.log("Clicked");

    setState(prevState => ({
      ...prevState,
      custumization_arr: clone(newArr)
    }));
  };

  const handleCustumAdd = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      custum_show: true,
      custum_add: true,
      custum_edit: false
    });
  };

  const handleCustumCancel = evt => {
    evt.stopPropagation();
    setState({
      ...state,
      custum_show: true,
      custum_add: false,
      custum_edit: false
    });
  };

  const addCustum = newCustum => {
    let arr = clone(state.custumization_arr);
    arr = [...arr, newCustum];

    setState({
      ...state,
      custumization_arr: clone(arr)
    });
  };

  const updatePack = () => {
    const { package_name, package_desc, package_price } = state;
    let custumization_arr = clone(state.custumization_arr);
    let items = clone(props.package.items);
    let newPack = {
      package_name,
      package_desc,
      package_price,
      custumization_arr,
      items
    };

    props.updatePack(newPack);
  };

  return (
    <div>
      <DialogTitle
        // style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        <span className={classes.cardTitle}>
          <i style={{ margin: "8px" }} className="fas fa-edit"></i>
          {props.isEdit ? " Edit Package" : "Add Package"}
        </span>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <input
              id="package_name"
              value={state.package_name}
              onChange={handleChange}
              style={{ width: "97%" }}
              className={classes.textField}
              placeholder="Package name"
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={3}>
              {/* <Grid item xs={4}>
                <select
                  id="currency"
                  value={state.currency}
                  onChange={handleChange}
                  className={classes.textField}
                  placeholder="Currency"
                >
                  <option>- -</option>
                  <option value="RS">RS</option>
                  <option value="$">$</option>
                </select>
              </Grid> */}

              <Grid item xs={6}>
                <input
                  id="package_price"
                  value={state.package_price}
                  onChange={handleChange}
                  type="number"
                  className={classes.textField}
                  placeholder="Package price"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item md={12}>
            <RadioGroup
              aria-label="position"
              value={state.food_type}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value={"veg"}
                control={<Radio id="food_type" color="primary" />}
                label={<span style={{ fontWeight: "bold" }}>Veg</span>}
                labelPlacement="end"
              />

              <FormControlLabel
                value={"non_veg"}
                control={<Radio id="food_type" color="primary" />}
                label={<span style={{ fontWeight: "bold" }}>Non-Veg</span>}
                labelPlacement="end"
              />

              <FormControlLabel
                value={"egg_only"}
                control={<Radio id="food_type" color="primary" />}
                label={<span style={{ fontWeight: "bold" }}>Contains-Egg</span>}
                labelPlacement="end"
              />
            </RadioGroup>
          </Grid> */}

          <Grid item xs={12}>
            <textarea
              id="package_desc"
              value={state.package_desc}
              onChange={handleChange}
              style={{ width: "97%" }}
              className={classes.textField}
              placeholder="Description"
            ></textarea>
          </Grid>
        </Grid>

        {
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="start"
            justify="flex-start"
          >
            <Grid
              style={{ margin: "10px 2px 10px 2px" }}
              className={classes.section}
              item
              xs={12}
            >
              <Typography
                className={classes.cardDesc}
                style={{
                  margin: `5px 8px  ${state.custum_show ? "16px" : "0px"} 8px`
                }}
                onClick={() => toggleCollapse("custum_show")}
              >
                <Badge
                  badgeContent={
                    state.custumization_arr.length === 0
                      ? "0"
                      : state.custumization_arr.length
                  }
                  color="primary"
                >
                  <span>
                    <i
                      style={{ margin: "8px", fontSize: "23px" }}
                      className="fas fa-list"
                    ></i>
                    Custumizations
                  </span>
                </Badge>

                <i
                  style={{ margin: "8px", fontSize: "22px", float: "right" }}
                  className={`fas fa-sort-${state.custum_show ? "up" : "down"}`}
                ></i>
                <Button
                  style={{
                    margin: "5px 10px",
                    fontWeight: "bold",
                    float: "right"
                  }}
                  classes={styles}
                  variant={"contained"}
                  color={"primary"}
                  onClick={
                    !state.custum_add ? handleCustumAdd : handleCustumCancel
                  }
                >
                  <i
                    style={{ margin: "5px" }}
                    className={`fas fa-${
                      !state.custum_add ? "plus" : "minus-square"
                    }`}
                  ></i>
                  {!state.custum_add ? "Add" : "Hide"}
                </Button>

                {props.isEdit && (
                  <Button
                    style={{
                      margin: "5px 10px",
                      fontWeight: "bold",
                      float: "right"
                    }}
                    classes={styles}
                    variant={"contained"}
                    color={"primary"}
                    onClick={
                      !state.custum_edit ? handleCustumEdit : handleCustumUndo
                    }
                  >
                    <i
                      style={{ margin: "5px" }}
                      className={`fas fa-${
                        state.custum_edit ? "undo-alt" : "pen"
                      }`}
                    ></i>
                    {state.custum_edit ? "Undo" : "Edit"}
                  </Button>
                )}
              </Typography>

              <Collapse in={state.custum_show}>
                {state.custum_add && (
                  <div
                    style={{
                      width: "96%",
                      padding: "11px 12px",
                      margin: "auto",
                      marginTop: "10px"
                    }}
                    className={classes.section}
                  >
                    <Typography
                      className={classes.cardDesc}
                      style={{
                        margin: `0px 8px  ${
                          state.add_show ? "16px" : "0px"
                        } 8px`
                      }}
                      onClick={() => toggleCollapse("add_show")}
                    >
                      <i
                        style={{ margin: "8px", fontSize: "25px" }}
                        className="fas fa-poll"
                      ></i>
                      {/* {cust.custumization_name} */}
                      {!state.custum_add ? "Add a Custumization" : "Form"}
                      <i
                        style={{
                          margin: "8px",
                          fontSize: "22px",
                          float: "right"
                        }}
                        className={`fas fa-sort-${
                          state.add_show ? "up" : "down"
                        }`}
                      ></i>
                    </Typography>
                    <Collapse in={state.add_show}>
                      <CustumizationForm addCustum={addCustum} />
                    </Collapse>
                  </div>
                )}
                {state.custumization_arr.length === 0 && !state.custum_add && (
                  <div style={{ textAlign: "center", fontWeight: "bold" }}>
                    No Custumizations Available (Press Undo to undo changes
                    made..)
                  </div>
                )}
                {state.custumization_arr.map((cust, idx) => (
                  <div>
                    {state.custum_edit ? (
                      props.isEdit && (
                        <div className={classes.card}>
                          <Typography
                            style={{ margin: "12px" }}
                            className={classes.cardDesc}
                          >
                            Edit Custumization
                            <Button
                              style={{
                                // margin: "8px",
                                float: "right"
                              }}
                              onClick={() =>
                                handleCustumDelete(idx, cust.custumization_name)
                              }
                            >
                              <i
                                style={{ margin: "8px", fontSize: "22px" }}
                                className={`fas fa-trash-alt`}
                              ></i>
                            </Button>
                          </Typography>
                          <input
                            id="custumization"
                            value={cust.custumization_name}
                            onChange={evt =>
                              handleCustomChange(
                                evt.target.value,
                                "custumization_name",
                                idx
                              )
                            }
                            type="text"
                            style={{ marginBottom: "10px" }}
                            className={classes.textField}
                            placeholder="Name of custumization"
                          />

                          <input
                            id="custum_type"
                            value={cust.custum_type}
                            onChange={evt =>
                              handleCustomChange(
                                evt.target.value,
                                "custum_type",
                                idx
                              )
                            }
                            type="number"
                            style={{ marginBottom: "10px" }}
                            className={classes.textField}
                            placeholder="No. of options that can be selected"
                          />
                          <div
                            key={idx}
                            style={{
                              width: "96%",
                              padding: "11px 12px",
                              margin: "auto",
                              marginTop: "10px"
                            }}
                            className={classes.section}
                          >
                            <Typography
                              className={classes.cardDesc}
                              style={{
                                margin: `0px 8px  ${
                                  state.custum_show_arr[idx] ? "16px" : "0px"
                                } 8px`
                              }}
                              onClick={() =>
                                toggleCustShow("custum_show_arr", idx)
                              }
                            >
                              <i
                                style={{ margin: "8px", fontSize: "25px" }}
                                className="fas fa-poll"
                              ></i>
                              {/* {cust.custumization_name} */}
                              Options
                              <i
                                style={{
                                  margin: "8px",
                                  fontSize: "22px",
                                  float: "right"
                                }}
                                className={`fas fa-sort-${
                                  state.cust_show ? "up" : "down"
                                }`}
                              ></i>
                            </Typography>
                            <Collapse in={state.custum_show_arr[idx]}>
                              {cust.options.length === 0 && (
                                <div
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "bold"
                                  }}
                                >
                                  No Options Available (Press Undo to undo
                                  changes made..)
                                </div>
                              )}
                              {cust.options.map((opt, id) => (
                                <div className={classes.card}>
                                  <Typography
                                    style={{ margin: "12px" }}
                                    className={classes.cardDesc}
                                  >
                                    Edit Option
                                    <Button
                                      style={{
                                        // margin: "8px",
                                        float: "right"
                                      }}
                                      onClick={() =>
                                        handleOptionDelete(
                                          idx,
                                          cust.custumization_name,
                                          id,
                                          opt.option
                                        )
                                      }
                                    >
                                      <i
                                        style={{
                                          margin: "8px",
                                          fontSize: "22px"
                                        }}
                                        className={`fas fa-trash-alt`}
                                      ></i>
                                    </Button>
                                  </Typography>
                                  <input
                                    style={{
                                      margin: "auto",
                                      marginBottom: "10px"
                                    }}
                                    id="option"
                                    value={opt.option}
                                    onChange={evt =>
                                      handleOptionChange(
                                        evt.target.value,
                                        idx,
                                        "option",
                                        id
                                      )
                                    }
                                    type="text"
                                    className={classes.textField}
                                    placeholder="Option name"
                                  />

                                  <input
                                    style={{
                                      margin: "auto",
                                      marginBottom: "10px"
                                    }}
                                    id="option_price"
                                    value={opt.option_price}
                                    onChange={evt =>
                                      handleOptionChange(
                                        evt.target.value,
                                        idx,
                                        "option_price",
                                        id
                                      )
                                    }
                                    type="number"
                                    className={classes.textField}
                                    placeholder="Option cost"
                                  />
                                  <RadioGroup
                                    aria-label="position"
                                    value={opt.option_type}
                                    onChange={evt =>
                                      handleOptionChange(
                                        evt.target.value,
                                        idx,
                                        "option_type",
                                        id
                                      )
                                    }
                                    row
                                  >
                                    <FormControlLabel
                                      value={"minus"}
                                      control={
                                        <Radio
                                          id="option_type"
                                          color="primary"
                                        />
                                      }
                                      label={
                                        <span style={{ fontWeight: "bold" }}>
                                          Deduct from total
                                        </span>
                                      }
                                      labelPlacement="end"
                                    />

                                    <FormControlLabel
                                      value={"add"}
                                      control={
                                        <Radio
                                          id="option_type"
                                          color="primary"
                                        />
                                      }
                                      label={
                                        <span style={{ fontWeight: "bold" }}>
                                          Add to total
                                        </span>
                                      }
                                      labelPlacement="end"
                                    />

                                    <FormControlLabel
                                      value={"total"}
                                      control={
                                        <Radio
                                          id="option_type"
                                          color="primary"
                                        />
                                      }
                                      label={
                                        <span style={{ fontWeight: "bold" }}>
                                          Option cost becomes total.
                                        </span>
                                      }
                                      labelPlacement="end"
                                    />
                                  </RadioGroup>
                                </div>
                              ))}
                            </Collapse>
                          </div>
                        </div>
                      )
                    ) : (
                      <div
                        key={idx}
                        style={{
                          width: "96%",
                          padding: "11px 12px",
                          margin: "auto",
                          marginTop: "10px"
                        }}
                        className={classes.section}
                      >
                        <Typography
                          className={classes.cardDesc}
                          style={{
                            margin: `0px 8px  ${
                              state.custum_show_arr[idx] ? "16px" : "0px"
                            } 8px`
                          }}
                          onClick={() => toggleCustShow("custum_show_arr", idx)}
                        >
                          <i
                            style={{ margin: "8px", fontSize: "25px" }}
                            className="fas fa-poll"
                          ></i>
                          {cust.custumization_name}
                          <i
                            style={{
                              margin: "8px",
                              fontSize: "22px",
                              float: "right"
                            }}
                            className={`fas fa-sort-${
                              state.cust_show ? "up" : "down"
                            }`}
                          ></i>
                        </Typography>

                        <Collapse in={state.custum_show_arr[idx]}>
                          {cust.options.map((opt, id) => (
                            <span key={id} className={classes.tag}>
                              {`${opt.option}`}
                              <span
                                style={{
                                  padding: "6px",
                                  fontWeight: "bold",
                                  border: "1px solid lightgray",
                                  borderRadius: "3px",
                                  marginLeft: "20px"
                                }}
                              >{`${"RS"}. ${opt.option_price}`}</span>
                            </span>
                          ))}
                        </Collapse>
                      </div>
                    )}
                  </div>
                ))}
              </Collapse>
            </Grid>
          </Grid>
        }
      </DialogContent>
      <DialogActions className={gutterStyles.parent}>
        <Button
          variant="default"
          color="primary"
          onClick={props.handleDialogClose}
        >
          <span style={{ fontWeight: "bold" }}>Cancel</span>
        </Button>
        <Button
          style={{ margin: "10px", fontWeight: "bold" }}
          classes={styles}
          variant={"contained"}
          color={"primary"}
          onClick={updatePack}
        >
          <i style={{ margin: "6px" }} className="fas fa-save"></i>
          Save Changes
        </Button>
      </DialogActions>
    </div>
  );
};

const Package = forwardRef((props, ref) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();

  const { package_name, package_price, package_desc } = props.package;
  const items = (props.package && props.package.items) || [];
  const custumization_arr =
    (props.package && props.package.custumization_arr) || [];

  const show_arr = Array.from(
    { length: custumization_arr.length },
    ele => false
  );

  const [state, setState] = React.useState({
    desc_show: false,
    custum_show: false,
    custum_show_arr: [...show_arr],
    anchorEl: null,
    items_show: false,
    status: true,
    dialog_open: false,
    dialog2_open: false
  });

  const toggleCollapse = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
    }));
  };

  const toggleCustShow = (content, idx) => {
    // console.log(idx);
    let new_arr = state.custum_show_arr;
    new_arr[idx] = !new_arr[idx];
    setState(prevState => ({
      ...prevState,
      [content]: [...new_arr]
    }));
  };

  const handleClick = event => {
    setState({
      ...state,
      anchorEl: event.currentTarget
    });
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.name]: evt.target.checked
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  const handleDialogOpen = content => {
    setState({
      ...state,
      [content]: true,
      anchorEl: null
    });
  };

  const handleDialogClose = content => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false
    });
  };

  const updatePack = pack => {
    setState({
      ...state,
      dialog_open: false
    });
    props.updatePack(pack, props.packId, props.package.package_name);
  };

  const deleteCatOrPack = () => {
    setState({
      ...state,
      dialog2_open: false
    });
    props.deleteCatOrPack(props.packId, props.package.package_name);
  };

  return (
    <div
      ref={ref}
      style={{ width: "100%", padding: "30px" }}
      className={classes.card}
    >
      <div className="all_dialogs">
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog_open}
          fullWidth={true}
          maxWidth={"md"}
          scroll="body"
          onClose={() => handleDialogClose("dialog_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <PackageForm
            package={props.package ? props.package : {}}
            updatePack={updatePack}
            isEdit={true}
            handleDialogClose={() => handleDialogClose("dialog_open")}
          />
        </Dialog>

        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog2_open}
          fullWidth={true}
          maxWidth={"sm"}
          scroll="body"
          onClose={() => handleDialogClose("dialog2_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            <span className={classes.cardTitle}>
              <i
                style={{ margin: "8px" }}
                className="fas fa-exclamation-triangle"
              ></i>
              Confirmation
            </span>
          </DialogTitle>

          <DialogContent>
            <Typography className={classes.cardDesc}>
              Do yo really want to delete the Package "
              {props.package.package_name}", Deleting will also delete all the
              items in it ?
            </Typography>
          </DialogContent>

          <DialogActions className={gutterStyles.parent}>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={deleteCatOrPack}
            >
              Yes
            </Button>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={() => handleDialogClose("dialog2_open")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="start"
        justify="flex-start"
      >
        {/* <Grid style={{ padding: "0px 8px 0px 8px" }} item xs={12}>
          <i
            aria-controls="simple-menu"
            aria-haspopup="true"
            style={{ float: "right", fontSize: "17px" }}
            className="fas fa-ellipsis-v"
            onClick={handleClick}
          ></i>

          <MaterialMenu
            id="simple-menu"
            className={classes.cardDesc}
            anchorEl={state.anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            open={Boolean(state.anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>offline</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </MaterialMenu>
        </Grid> */}
        {/* <Grid item xs={12} sm={12} md={3}>
          <img
            src={item_img}
            alt="Item"
            className={classes.itemImage}
            style={{
              width: "120px",
              height: "120px"
            }}
          />
        </Grid> */}
        <Grid item xs={12}>
          <Grid
            container
            // spacing={1}
            direction="row"
            alignItems="start"
            justify="flex-start"
          >
            <Grid item xs={6} sm={6} md={12}>
              {" "}
              <Typography className={classes.cardTitle}>
                <b>{package_name}</b>
                <i
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  style={{ float: "right", fontSize: "17px" }}
                  className="fas fa-ellipsis-v"
                  onClick={handleClick}
                ></i>
                <MaterialMenu
                  id="simple-menu"
                  // className={classes.materialMenu}
                  // style={{ backgroundColor: "white" }}
                  anchorEl={state.anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  open={Boolean(state.anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    className={classes.menuItem}
                    // onClick={handleClose}
                  >
                    <FormControlLabel
                      style={{ fontWeight: "bold" }}
                      control={
                        <PurpleSwitch
                          checked={state.status}
                          onChange={handleChange}
                          name="status"
                        />
                      }
                      label={
                        <span style={{ fontWeight: "bold" }}>{`${
                          state.status ? "Online" : "Offline"
                        }`}</span>
                      }
                    />
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => handleDialogOpen("dialog_open")}
                  >
                    <i style={{ margin: "8px" }} className="fas fa-pen"></i>
                    Edit
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={() => handleDialogOpen("dialog2_open")}
                  >
                    <i
                      style={{ margin: "8px" }}
                      className="fas fa-trash-alt"
                    ></i>
                    Delete
                  </MenuItem>
                </MaterialMenu>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.cardSub}>
                Rs. {package_price}
              </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
            <Typography
              className={classes.cardDesc}
              onClick={() => toggleCollapse("desc_show")}
              style={{ marginTop: "5px" }}
            >
              {package_desc.length > 40 &&
                !state.desc_show &&
                package_desc.slice(0, 30).concat("... ")}

              {package_desc.length > 40 && !state.desc_show && (
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    color: deepPurple[100]
                  }}
                >
                  more
                </span>
              )}
              {package_desc.length <= 40 && <span>{package_desc}</span>}

              {package_desc.length > 40 && (
                <Collapse in={state.desc_show}>
                  {package_desc}
                  {".  "}
                  <span
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      color: deepPurple[100]
                    }}
                  >
                    less
                  </span>
                </Collapse>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="start"
        justify="flex-start"
      >
        <Grid
          style={{ margin: "10px 2px 10px 2px" }}
          className={classes.section}
          item
          xs={12}
        >
          <Typography
            className={classes.cardDesc}
            style={{
              margin: `5px 8px  ${state.items_show ? "16px" : "0px"} 8px`
            }}
            onClick={() => toggleCollapse("items_show")}
          >
            <Badge
              badgeContent={
                items !== undefined && items.length === 0 ? "0" : items.length
              }
              color="primary"
            >
              <span>
                <i
                  style={{ margin: "8px", fontSize: "23px" }}
                  className="fas fa-list-alt"
                ></i>
                Items
              </span>
            </Badge>
            <i
              style={{ margin: "8px", fontSize: "22px", float: "right" }}
              className={`fas fa-sort-${state.items_show ? "up" : "down"}`}
            ></i>
          </Typography>
          <Collapse in={state.items_show}>
            <FlipMove>
              {items.map((item, idx) => (
                <Item
                  catId={props.packId}
                  key={idx}
                  isPackage={true}
                  item={item}
                  addItem={props.addItem}
                  updateItem={props.updateItem}
                  deleteItem={props.deleteItem}
                />
              ))}
            </FlipMove>
          </Collapse>
        </Grid>

        <Grid
          style={{ margin: "10px 2px 10px 2px" }}
          className={classes.section}
          item
          xs={12}
        >
          <Typography
            className={classes.cardDesc}
            style={{
              margin: `5px 8px  ${state.custum_show ? "16px" : "0px"} 8px`
            }}
            onClick={() => toggleCollapse("custum_show")}
          >
            <Badge
              badgeContent={
                custumization_arr.length === 0 ? "0" : custumization_arr.length
              }
              color="primary"
            >
              <span>
                <i
                  style={{ margin: "8px", fontSize: "23px" }}
                  className="fas fa-list-alt"
                ></i>
                Custumizations
              </span>
            </Badge>
            <i
              style={{ margin: "8px", fontSize: "22px", float: "right" }}
              className={`fas fa-sort-${state.custum_show ? "up" : "down"}`}
            ></i>
          </Typography>

          <Collapse in={state.custum_show}>
            {custumization_arr.map((cust, idx) => (
              <div
                key={idx}
                style={{
                  width: "96%",
                  padding: "11px 12px",
                  margin: "auto",
                  marginTop: "10px"
                }}
                className={classes.section}
              >
                <Typography
                  className={classes.cardDesc}
                  style={{
                    margin: `0px 8px  ${
                      state.custum_show_arr[idx] ? "16px" : "0px"
                    } 8px`
                  }}
                  onClick={() => toggleCustShow("custum_show_arr", idx)}
                >
                  <i
                    style={{ margin: "8px", fontSize: "25px" }}
                    className="fas fa-poll"
                  ></i>
                  {cust.custumization_name}
                  <i
                    style={{
                      margin: "8px",
                      fontSize: "22px",
                      float: "right"
                    }}
                    className={`fas fa-sort-${state.cust_show ? "up" : "down"}`}
                  ></i>
                </Typography>

                <Collapse in={state.custum_show_arr[idx]}>
                  {cust.options.map((opt, id) => (
                    <span key={id} className={classes.tag}>
                      {`${opt.option}`}
                      <span
                        style={{
                          padding: "6px",
                          fontWeight: "bold",
                          border: "1px solid lightgray",
                          borderRadius: "3px",
                          marginLeft: "20px"
                        }}
                      >{`${"Rs."} ${opt.option_price}`}</span>
                    </span>
                  ))}
                </Collapse>
              </div>
            ))}
          </Collapse>
        </Grid>
      </Grid>
    </div>
  );
});

const Menu = props => {
  const classes = useStyles();
  // const theme = useTheme();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  const matches = useMediaQuery("(min-width:440px)");
  const minimalSelectClasses = useMinimalSelectStyles();
  // minimalSelectClasses.select.color = deepPurple[50];
  const [state, setState] = useState({
    select_cat: [0, 0, 0],
    tab: 0,
    category_name: "",
    dialog_open: false,
    dialog2_open: false,
    dialog3_open: false,
    loading: false
  });

  // Add This Tomo
  useEffect(() => {
    if (props.isUpdated) {
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          loading: false
        }));
      }, 500);
    }
  }, [props.isUpdated]);

  const tabMap = {
    0: "food",
    1: "bar",
    2: "buffet"
  };
  const iconComponent = props => {
    return (
      <ExpandMoreIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };
  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    getContentAnchorEl: null
  };

  const handleSelect = evt => {
    // const id = evt.target.name;
    const val =
      evt.target.value === "add"
        ? state.select_cat[state.tab]
        : evt.target.value;
    // console.log(evt.target);
    let arr = state.select_cat;
    arr[state.tab] = val;
    setState(prevState => ({
      ...prevState,
      select_cat: [...arr]
    }));
  };
  const handleTab = (evt, newValue) => {
    setState({
      ...state,
      tab: newValue
      // select_cat: 0 // here we are changing the categoris to initial value verytime
    });
  };

  const addItem = (item, catId) => {
    props.addItem(item, catId, tabMap[state.tab]);
  };

  const updateItem = (item, itemId, catId, itemName) => {
    props.updateItem(item, itemId, catId, tabMap[state.tab], itemName);
  };

  const updateCat = (catName, catId, oldCatName) => {
    props.updateCat(catName, catId, tabMap[state.tab], oldCatName);
  };

  const updatePack = (pack, packId, packName) => {
    props.updatePack(pack, packId, tabMap[state.tab], packName);
  };

  const deleteItem = (itemId, catId, itemName) => {
    props.deleteItem(itemId, catId, tabMap[state.tab], itemName);
  };

  const deleteCatOrPack = (id, catName) => {
    props.deleteCatOrPack(id, tabMap[state.tab], catName);
  };

  const addItem2 = item => {
    const cat = state.select_cat;
    const tab = state.tab;
    const catIdx = cat[tab] >= 2 ? cat[tab] - 2 : cat[tab];
    const catId = props.restaurant.menu[tabMap[state.tab]][catIdx]._id;

    setState({
      ...state,
      dialog_open: false
    });
    props.addItem(item, catId, tabMap[state.tab]);
  };

  const addCat2 = () => {
    if (state.category_name !== "") {
      setState({
        ...state,
        category_name: "",
        dialog2_open: false
      });
      // console.log(state.category_name);
      props.addCat(state.category_name, tabMap[state.tab]);
    }
  };

  const addPack2 = pack => {
    if (
      pack.package_name !== "" &&
      pack.package_desc !== "" &&
      pack.package_price !== ""
    ) {
      setState({
        ...state,
        dialog3_open: false
      });
      // console.log(state.category_name);
      props.addPack(pack, tabMap[state.tab]);
    }
  };

  const upload = () => {
    setState({
      ...state,
      loading: true
    });
    props.upload("menu");
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const handleDialogOpen = (evt, content) => {
    // evt.stopPropagation();
    setState({
      ...state,
      [content]: true
    });
  };

  const handleDialogClose = content => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false
    });
  };

  const getList = cat => {
    const tab = state.tab;
    const val =
      state.tab === 2
        ? "pack"
        : cat[tab] === 1
        ? "categ"
        : cat[tab] >= 2 // this is here vaused the err where when selected cat[>=2] were not displayed
        ? "item"
        : "no items";

    switch (val) {
      case "pack":
        if (cat[tab] === 0)
          return (
            <div style={{ textAlign: "center", fontWeight: "bold" }}>
              No items selected to display
            </div>
          );
        else if (cat[tab] === 1)
          return (
            <div>
              <FlipMove>
                {props.restaurant ? (
                  props.restaurant.menu[tabMap[state.tab]].map((pack, idx) => (
                    <Package
                      packId={pack._id}
                      key={idx}
                      package={pack}
                      addItem={addItem}
                      updateItem={updateItem}
                      deleteItem={deleteItem}
                      updatePack={updatePack}
                      deleteCatOrPack={deleteCatOrPack}
                    />
                  ))
                ) : (
                  <div style={{ textAlign: "center", fontWeight: "bold" }}>
                    No Items Available
                  </div>
                )}
              </FlipMove>
            </div>
          );
        else
          return (
            <div>
              <FlipMove>
                {props.restaurant ? (
                  <Package
                    key={0}
                    packId={
                      props.restaurant.menu[tabMap[state.tab]][
                        cat[tab] >= 2 ? cat[tab] - 2 : cat[tab]
                      ]._id
                    }
                    package={
                      props.restaurant.menu[tabMap[state.tab]][
                        cat[tab] >= 2 ? cat[tab] - 2 : cat[tab]
                      ]
                    }
                    addItem={addItem}
                    updateItem={updateItem}
                    deleteItem={deleteItem}
                    updatePack={updatePack}
                    deleteCatOrPack={deleteCatOrPack}
                  />
                ) : (
                  <div style={{ textAlign: "center", fontWeight: "bold" }}>
                    No Items Available
                  </div>
                )}
              </FlipMove>
            </div>
          );

      case "categ":
        return (
          <div>
            <FlipMove>
              {props.restaurant ? (
                props.restaurant.menu[tabMap[state.tab]].map(
                  (category, idx) => (
                    <Category
                      catId={category._id}
                      key={idx}
                      category={category}
                      addItem={addItem}
                      updateItem={updateItem}
                      deleteItem={deleteItem}
                      updateCat={updateCat}
                      deleteCatOrPack={deleteCatOrPack}
                    />
                  )
                )
              ) : (
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  No Items Available
                </div>
              )}
            </FlipMove>
          </div>
        );
      case "item":
        const catIdx = cat[tab] >= 2 ? cat[tab] - 2 : cat[tab];
        const catId = props.restaurant.menu[tabMap[state.tab]][catIdx]._id;
        return (
          <div>
            <FlipMove>
              {props.restaurant ? (
                props.restaurant.menu[tabMap[state.tab]][catIdx].items.map(
                  (item, idx) => (
                    <Item
                      catId={catId}
                      key={"item" + idx}
                      isPackage={false}
                      item={item}
                      addItem={addItem}
                      updateItem={updateItem}
                      deleteItem={deleteItem}
                    />
                  )
                )
              ) : (
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  No Items Available
                </div>
              )}
            </FlipMove>
          </div>
        );

      default:
        return (
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            No items selected to display
          </div>
        );
    }
  };

  return (
    <div>
      <div className="all_dialogs">
        <Dialog
          open={state.dialog_open}
          fullWidth={true}
          maxWidth={"md"}
          scroll="body"
          onClose={() => handleDialogClose("dialog_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <ItemForm
            item={props.item ? props.item : {}}
            isPackage={false}
            isEdit={false}
            handleDialogClose={() => handleDialogClose("dialog_open")}
            updateItem={addItem2}
          />
        </Dialog>
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog2_open}
          fullWidth={true}
          maxWidth={"sm"}
          scroll="body"
          onClose={() => handleDialogClose("dialog2_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle>
            <Typography className={classes.cardDesc} style={{ margin: "12px" }}>
              Edit category name
            </Typography>
          </DialogTitle>
          <DialogContent>
            <div>
              <input
                id="category_name"
                value={state.category_name}
                onChange={handleChange}
                type="text"
                style={{ marginBottom: "10px" }}
                className={classes.textField}
                placeholder="Category name"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <div className={gutterStyles.parent}>
              <Button
                variant="default"
                color="primary"
                onClick={() => handleDialogClose("dialog2_open")}
              >
                <span style={{ fontWeight: "bold" }}>Cancel</span>
              </Button>
              <Button
                style={{ margin: "10px", fontWeight: "bold" }}
                classes={styles}
                variant={"contained"}
                color={"primary"}
                onClick={addCat2}
              >
                <i style={{ margin: "6px" }} className="fas fa-save"></i>
                Save Changes
              </Button>
            </div>
          </DialogActions>
        </Dialog>
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog3_open}
          fullWidth={true}
          maxWidth={"md"}
          scroll="body"
          onClose={() => handleDialogClose("dialog3_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <PackageForm
            package={props.package ? props.package : {}}
            updatePack={addPack2}
            isEdit={false}
            handleDialogClose={() => handleDialogClose("dialog3_open")}
          />
        </Dialog>
      </div>
      <div>
        <Typography
          // className={classes.breadCrumb}
          paragraph
        >
          <span
            style={{
              padding: "5px 10px ",
              // backgroundColor: "#fce76f",
              color: "#282C34",
              borderRadius: "5px",
              fontWeight: "bold"
              // border: "1px solid lightgray"
            }}
          >
            Dashboard
          </span>

          <b>/</b>
          <span
            style={{
              padding: "5px 10px ",
              // backgroundColor: "#fce76f",
              color: "#282C34",
              borderRadius: "5px",
              fontWeight: "bold",
              textDecoration: "underline"
              // border: "1px solid lightgray"
            }}
          >
            Menu
          </span>
          {!state.loading ? (
            <span
              style={{
                display: "inline-block",
                float: "right",
                marginBottom: "10px"
              }}
              className={gutterStyles.parent}
            >
              <Button
                style={{ fontWeight: "bold", marginLeft: "10px" }}
                classes={styles}
                variant={"contained"}
                color={"primary"}
                disabled={!props.isEdited}
                onClick={upload}
              >
                <i style={{ margin: "6px" }} className="fas fa-upload"></i>
                Upload
              </Button>
              <Button
                variant="default"
                color="primary"
                onClick={props.clearChanges}
                disabled={!props.isEdited}
              >
                <span style={{ fontWeight: "bold" }}>Clear</span>
              </Button>
            </span>
          ) : (
            <span
              style={{
                fontWeight: "bold",
                color: "#0388CA",
                float: "right",
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center"
              }}
            >
              {" "}
              <FbSpinner /> <span style={{ margin: "5px" }}>
                Uploading...
              </span>{" "}
            </span>
          )}
        </Typography>
      </div>
      <Card
        className={classes.section}
        style={{
          // height: "650px",
          // maxHeight: "560px",
          minWidth: "350px",
          paddingBottom: "25px",
          borderRadius: "8px"
        }}
      >
        <div>
          <AntTabs
            value={state.tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTab}
            // variant={!matches && "scrollable"}
            // scrollButtons={!matches && "auto"}
            aria-label="tabs"
            centered={matches}
          >
            <AntTab label={`Food Menu`} />

            <AntTab label={`Bar menu`} />

            <AntTab label={`Buffet menu`} />
          </AntTabs>
        </div>
        <div>
          <FormControl style={{ width: "80%", margin: "22px 10% 8px 10%" }}>
            <Select
              disableUnderline
              name="select_cat"
              classes={{ root: classes.select }}
              style={{
                color: deepPurple[500]
                // border: "1px solid lightgray"
                // borderRadius: 5
              }}
              MenuProps={menuProps}
              IconComponent={iconComponent}
              value={state.select_cat[state.tab]}
              onChange={handleSelect}
            >
              <MenuItem value={0}>Select a Category or package</MenuItem>
              <MenuItem value={1}>All</MenuItem>
              {props.restaurant ? (
                props.restaurant.menu[tabMap[state.tab]].map((cat, idx) => (
                  <MenuItem value={idx + 2}>
                    {cat.category_name || cat.package_name}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}

              {state.select_cat[state.tab] !== 0 &&
                !(state.tab === 2 && state.select_cat[state.tab] > 1) && (
                  <MenuItem
                    style={{
                      // borderTop: "1px solid lightgray",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: deepPurple[50]
                    }}
                    disabled={state.select_cat[state.tab] === 0}
                    value={"add"}
                  >
                    <div
                      onClick={evt =>
                        handleDialogOpen(
                          evt,
                          state.tab === 2
                            ? "dialog3_open"
                            : state.select_cat[state.tab] === 1
                            ? "dialog2_open"
                            : "dialog_open"
                        )
                      }
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline"
                        }}
                      >
                        Add a{" "}
                        {state.tab === 2
                          ? "Package to Menu"
                          : state.select_cat[state.tab] === 1
                          ? "Category to Menu"
                          : "Item in Selected Category"}
                        <i
                          style={{ margin: "5px 8px" }}
                          className="fa fa-plus"
                        ></i>
                      </span>
                    </div>
                  </MenuItem>
                )}
            </Select>
          </FormControl>

          <div className={classes.itemList}>
            {/* Restaurant value at first is NULL because the app has not yet fetch the value of restaurant from server
          so to solve the problem use the restaurant value in if..else construct like below...
          */}

            {/* {props.restaurant ? (
              props.restaurant.menu[tabMap[state.tab]].map(cat => (
                <Item item={cat.items[0]} />
              ))
            ) : (
              <>No Items Available...</>
            )} */}
            {getList(state.select_cat)}
          </div>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  // isAuthenticated: state.rest_auth.isAuthenticated,
  isUpdated: state.rest_auth.isUpdated
});

export default connect(mapStateToProps)(Menu);

// export default Menu;
