import React from "react";
import { clone } from "ramda";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Collapse,
  Badge,
  FormControlLabel,
  useMediaQuery,
  Button,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import CloseRounded from "@material-ui/icons/CloseRounded";
import ImageUploader from "../../../../layout/ImageUploader";
import CustumizationEditForm from "../forms/CustumizationEditForm";

import useStyles, { useFirebaseBtnStyles } from "../styles/main";
import PaperComponent from "../components/PaperComponent";

const ItemForm = (props) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let custumization_arr = (props.item && props.item.custumization_arr) || [];

  const show_arr = Array.from(
    { length: custumization_arr.length },
    (ele) => false
  );

  const cust_arr = clone(custumization_arr);

  const [state, setState] = React.useState({
    item_name: (props.item && props.item.item_name) || "",
    item_price: (props.item && props.item.item_price) || "",
    currency: (props.item && props.item.currency) || "",
    item_desc: (props.item && props.item.item_desc) || "",
    food_type: (props.item && props.item.food_type) || "",
    item_img: (props.item && props.item.item_img) || {},
    // custumization: "",
    // custum_type: "", //Is the no of options that can be selected in the custumization number is oly correct bcpz item choosing also has a limit
    custumization_arr: clone(cust_arr),
    custum_show: false,
    custum_show_arr: [...show_arr],
    custum_edit: false,
    custum_add: false,
    add_show: false,
    option_add: false,
    option: "",
    option_type: "",
    option_food_type: "",
    option_price: "",
    curr_cust_edit_idx: undefined,
    cust_dialog_open: false,
    is_edit_cust: false,
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

  const toggleCustShow = (content, idx) => {
    // console.log(idx);
    let new_arr = state.custum_show_arr;
    new_arr[idx] = !new_arr[idx];
    setState((prevState) => ({
      ...prevState,
      [content]: [...new_arr],
    }));
  };

  const handleCustumAdd = (evt) => {
    evt.stopPropagation();
    // setState({
    //   ...state,
    //   custum_show: true,
    //   custum_add: true,
    //   custum_edit: false,
    // });

    setState({
      ...state,
      is_edit_cust: false,
      cust_dialog_open: true,
    });
  };

  const handleCustumEdit = (evt, idx) => {
    evt.stopPropagation();
    // setState((prevState) => ({
    //   ...prevState,
    //   custum_edit: true,
    //   custum_show: true,
    //   custum_add: false,
    // }));

    setState({
      ...state,
      is_edit_cust: true,
      curr_cust_edit_idx: idx,
      cust_dialog_open: true,
    });
  };

  const handleCustumUndo = (evt) => {
    evt.stopPropagation();
    const arr = [...cust_arr];
    setState((prevState) => ({
      ...prevState,
      custum_edit: false,
      custum_add: false,
      custum_show: true,
      custumization_arr: clone(arr),
    }));
  };

  const handleCustomChange = (value, custum_key, idx) => {
    let arr = [...state.custumization_arr];
    arr[idx][custum_key] = value;

    setState((prevState) => ({
      ...prevState,
      custumization_arr: clone(arr),
    }));
  };

  const handleOptionChange = (value, custIdx, option_key, opt_idx) => {
    let arr = [...state.custumization_arr];
    arr[custIdx].options[opt_idx][option_key] = value;

    setState((prevState) => ({
      ...prevState,
      custumization_arr: clone(arr),
    }));
  };

  const deleteCustum = (index, cust_name) => {
    const custIdx = Boolean(Number(index))
      ? index
      : state.custumization_arr.findIndex(
          (ele) => ele.custumization_name === cust_name
        );
    const arr = state.custumization_arr;
    const newArr = arr.filter((ele, idx) => idx !== custIdx);
    // console.log("Clicked");

    setState((prevState) => ({
      ...prevState,
      custumization_arr: clone(newArr),
    }));
  };

  const handleOptionDelete = (cust_index, cust_name, opt_index, opt_name) => {
    const custIdx = Boolean(Number(cust_index))
      ? cust_index
      : state.custumization_arr.findIndex(
          (ele) => ele.custumization_name === cust_name
        );

    const optIdx = Boolean(Number(opt_index))
      ? opt_index
      : state.custumization_arr[custIdx].options.findIndex(
          (ele) => ele.option === opt_name
        );

    const arr = state.custumization_arr;
    arr[custIdx].options = arr[custIdx].options.filter(
      (ele, idx) => idx !== optIdx
    );
    // arr[custIdx].options = [...newOptArr];
    const newArr = [...arr];
    // console.log("Clicked");

    setState((prevState) => ({
      ...prevState,
      custumization_arr: clone(newArr),
    }));
  };

  const addOption = (idx) => {
    const { option, option_type, option_price } = state;
    const newOpt = { option, option_type, option_price };
    let arr = clone(state.custumization_arr);
    arr[idx].options = [...arr[idx].options, newOpt];
    if (option !== "" && option_type !== "" && option_price !== "") {
      setState({
        ...state,
        custumization_arr: clone(arr),
        option: "",
        option_type: "",
        option_price: "",
      });
    }
  };

  const updateItem = () => {
    const { item_name, item_desc, food_type, item_img } = state;
    let newItem = { item_name, item_desc, food_type, item_img };

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

  const handleCustumCancel = (evt) => {
    evt.stopPropagation();

    setState({
      ...state,
      custum_show: true,
      custum_add: false,
      custum_edit: false,
    });
  };

  const handleOptionAdd = (evt) => {
    evt.stopPropagation();
    setState({
      ...state,
      option_add: true,
      // option_show: true
    });
  };

  const handleOptionCancel = (evt) => {
    evt.stopPropagation();
    setState({
      ...state,
      option_add: false,
      // option_show: true,
      option: "",
      option_type: "",
      option_price: "",
    });
  };

  const addCustum = (newCustum) => {
    let arr = clone(state.custumization_arr);
    arr = [...arr, newCustum];

    setState({
      ...state,
      custumization_arr: clone(arr),
      cust_dialog_open: false,
    });
  };

  const editCustum = (newCustum) => {
    let arr = state.custumization_arr.map((cust, idx) => {
      if (idx === state.curr_cust_edit_idx) {
        return newCustum;
      }
      return cust;
    });

    setState({
      ...state,
      custumization_arr: clone(arr),
      cust_dialog_open: false,
    });
  };

  function isObjEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const addImg = (payload) => {
    payload = {
      ...payload,
      updated: true,
      preID:
        props.item.item_img && props.item.item_img.preID
          ? props.item.item_img.preID
          : props.item.item_img && props.item.item_img.name
          ? props.item.item_img.name
          : undefined,
    };
    setState({
      ...state,
      item_img: { ...payload },
    });
  };

  const deleteImg = (id, name) => {
    setState({
      ...state,
      item_img: {},
    });
  };

  const handleDialogOpen = (evt, content) => {
    evt.stopPropagation();
    setState({
      ...state,
      [content]: true,
    });
  };

  const handleDialogClose = (content) => {
    setState({
      ...state,
      [content]: false,
    });
  };

  return (
    <div>
      <div className="all_partials">
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.cust_dialog_open}
          fullWidth={true}
          maxWidth={"md"}
          fullScreen={matchesSmDw}
          // classes={{paperWidthMd: classes.dialog_form, paperFullWidth: classes.dialog_form}}
          scroll="body"
          onClose={() => handleDialogClose("cust_dialog_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <CustumizationEditForm
            custumization={
              state.custumization_arr[state.curr_cust_edit_idx]
                ? state.custumization_arr[state.curr_cust_edit_idx]
                : undefined
            }
            isEdit={state.is_edit_cust}
            handleDialogClose={() => handleDialogClose("cust_dialog_open")}
            save={state.is_edit_cust ? editCustum : addCustum}
          />
        </Dialog>
      </div>
      <div>
        <DialogTitle
          // style={{ cursor: "move" }}
          id="draggable-dialog-title"
        >
          <span className={classes.cardTitle}>
            <i style={{ margin: "8px" }} className="fas fa-edit"></i>
            {props.isEdit ? "Edit Item" : "Add Item"}
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
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <Grid item xs={12}>
              <ImageUploader
                imgList={
                  isObjEmpty(state.item_img)
                    ? []
                    : [
                        state.item_img.file
                          ? state.item_img
                          : {
                              src: state.item_img.imgURL,
                              id: state.item_img.name,
                            },
                      ]
                }
                show={isObjEmpty(state.item_img)}
                multiple={false}
                width="97%"
                upload={addImg}
                deleteImg={deleteImg}
              />
            </Grid>
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
                  label={
                    <span style={{ fontWeight: "bold" }}>Contains-Egg</span>
                  }
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
                    margin: `5px 8px  ${
                      state.custum_show ? "16px" : "0px"
                    } 8px`,
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
                    className={`fas fa-sort-${
                      state.custum_show ? "up" : "down"
                    }`}
                  ></i>
                  <Button
                    className={classes.cust_ctrl_btns}
                    variant={"contained"}
                    color={"primary"}
                    onClick={handleCustumAdd}
                  >
                    <i style={{ margin: "5px" }} className={"fas fa-plus"}></i>
                  </Button>
                </Typography>

                <Collapse in={state.custum_show}>
                  {state.custumization_arr.length === 0 && !state.custum_add && (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "15px",
                      }}
                    >
                      No Custumizations Available (Press Undo to undo changes
                      made..)
                    </div>
                  )}
                  {state.custumization_arr.map((cust, idx) => (
                    <div>
                      <div>
                        <div
                          key={idx}
                          style={{
                            width: "96%",
                            padding: "11px 12px",
                            margin: "auto",
                            marginTop: "10px",
                          }}
                          className={classes.section}
                        >
                          <Typography
                            className={classes.cardDesc}
                            style={{
                              margin: `0px 8px  ${
                                state.custum_show_arr[idx] ? "16px" : "0px"
                              } 8px`,
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
                                float: "right",
                              }}
                              className={`fas fa-sort-${
                                state.cust_show ? "up" : "down"
                              }`}
                            ></i>
                            <Button
                              className={classes.cust_ctrl_btns}
                              variant={"contained"}
                              color={"primary"}
                              onClick={() =>
                                deleteCustum(idx, cust.custumization_name)
                              }
                            >
                              <i
                                style={{ margin: "5px" }}
                                className="far fa-trash-alt"
                              ></i>
                            </Button>
                            <Button
                              className={classes.cust_ctrl_btns}
                              variant={"contained"}
                              color={"primary"}
                              onClick={(evt) => handleCustumEdit(evt, idx)}
                            >
                              <i
                                style={{ margin: "5px" }}
                                className="fas fa-pen"
                              ></i>
                            </Button>
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
                                    marginLeft: "20px",
                                  }}
                                >{`${state.currency}. ${opt.option_price}`}</span>
                              </span>
                            ))}
                          </Collapse>
                        </div>
                      </div>
                    </div>
                  ))}
                </Collapse>
              </Grid>
            </Grid>
          )}
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
            onClick={updateItem}
          >
            <i style={{ margin: "6px" }} className="fas fa-save"></i>
            Save Changes
          </Button>
        </DialogActions>
      </div>
    </div>
  );
};

export default ItemForm;
