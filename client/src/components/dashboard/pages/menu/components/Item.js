import React, { forwardRef } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Collapse,
  FormControlLabel,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { deepPurple } from "@material-ui/core/colors";
import item_img from "../../../../../img/food.png";
import MaterialMenu from "@material-ui/core/Menu";
// import { useTheme } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import useStyles, { useFirebaseBtnStyles } from "../styles/main";
import PaperComponent from "../components/PaperComponent";
import PurpleSwitch from "../components/PurpleSwitch";
import ItemForm from "../forms/ItemForm";

const Item = forwardRef((props, ref) => {
  const classes = useStyles();
  const matchesSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const matchesImdDim = useMediaQuery("(min-width:1200px)");
  const mactchesSm600 = useMediaQuery("(max-width:600px)");
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const {
    item_name,
    // item_price,
    currency,
    item_desc,
    // food_type,
    custumization_arr,
  } = props.item;

  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();

  const show_arr = Array.from(
    { length: custumization_arr.length },
    (ele) => false
  );

  const [state, setState] = React.useState({
    desc_show: false,
    custum_show: false,
    custum_show_arr: [...show_arr],
    anchorEl: null,
    status: true,
    dialog_open: false,
    dialog2_open: false,
    dialog_cust_edit_open: false,
  });

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

  const handleClick = (event) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
    });
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.checked,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null,
    });
  };

  const handleDialogOpen = (content) => {
    setState({
      ...state,
      [content]: true,
      anchorEl: null,
    });
  };

  const handleDialogClose = (content) => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false,
    });
  };

  const updateItem = (item) => {
    // console.log("Item - ", props.item._id);

    setState({
      ...state,
      dialog_open: false,
    });
    props.updateItem(
      item,
      props.item._id,
      props.catId,
      props.item.item_name,
      props.name
    );
  };

  const deleteItem = () => {
    setState({
      ...state,
      dialog2_open: false,
    });
    props.deleteItem(
      props.item._id,
      props.catId,
      props.item.item_name,
      props.name
    );
  };

  function isObjEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  return (
    <div ref={ref} className={classes.card}>
      <div className="all_partials">
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog_open}
          fullWidth={true}
          maxWidth={"md"}
          fullScreen={matchesSmDw}
          // classes={{paperWidthMd: classes.dialog_form, paperFullWidth: classes.dialog_form}}
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
          open={state.dialog_cust_edit_open}
          fullWidth={true}
          maxWidth={"md"}
          fullScreen={matchesSmDw}
          // classes={{paperWidthMd: classes.dialog_form, paperFullWidth: classes.dialog_form}}
          scroll="body"
          onClose={() => handleDialogClose("dialog_cust_edit_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <ItemForm
            item={props.item ? props.item : {}}
            isPackage={Boolean(props.isPackage)}
            isEdit={true}
            handleDialogClose={() => handleDialogClose("dialog_cust_edit_open")}
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
        alignItems="flex-start"
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
            {!matchesSm && (
              <MenuItem
                className={classes.menuItem}
                //  onClick={() => handleDialogOpen("dialog2_open")}
              >
                <i style={{ margin: "8px" }} className="fas fa-upload"></i>
                Add image
              </MenuItem>
            )}
            <MenuItem
              className={classes.menuItem}
              onClick={() => handleDialogOpen("dialog2_open")}
            >
              <i style={{ margin: "8px" }} className="fas fa-trash-alt"></i>
              Delete
            </MenuItem>
          </MaterialMenu>
        </Grid>
        {matchesSm && isObjEmpty(props.item.item_img) && (
          <Grid style={{ paddingLeft: "25px" }} item xs={3} sm={3} md={3}>
            <img
              src={item_img}
              alt="Item"
              className={classes.itemImage}
              style={{
                width: matchesImdDim ? "120px" : "90%",
                height: matchesImdDim ? "120px" : "90%",
              }}
            />
          </Grid>
        )}
        {!isObjEmpty(props.item.item_img) && (
          <Grid
            style={{
              paddingLeft: "25px",
            }}
            className={classes.itemImgGrid}
            item
            xs={3}
            sm={3}
            md={3}
          >
            <img
              src={props.item.item_img.imgURL || props.item.item_img.src}
              alt="Item"
              style={{
                width: matchesImdDim ? "120px" : mactchesSm600 ? "100%" : "90%",
                height: matchesImdDim
                  ? "120px"
                  : mactchesSm600
                  ? "100%"
                  : "90%",
                borderRadius: "5px",
                // boxShadow: "2px 2px 2px lightgray",
                // border: "2px solid lightgray"
              }}
            />
          </Grid>
        )}
        <Grid
          className={
            !isObjEmpty(props.item.item_img)
              ? classes.itemContentGrid
              : classes.noImgItemContentGrid
          }
          item
          xs={9}
          sm={9}
          md={9}
        >
          <Grid
            container
            // spacing={1}
            direction="row"
            alignItems="start"
            justify="flex-start"
          >
            <Grid item xs={12} sm={12} md={12}>
              {" "}
              <Typography className={classes.cardTitle}>
                <b>{item_name}</b>
              </Typography>
            </Grid>
            {props.item.item_price && (
              <Grid item xs={12} sm={12} md={12}>
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
                    color: deepPurple[100],
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
                      color: deepPurple[100],
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
                margin: `5px 8px  ${state.custum_show ? "16px" : "0px"} 8px`,
              }}
              onClick={() => toggleCollapse("custum_show")}
            >
              {/* <Badge
                  badgeContent={
                    custumization_arr.length === 0
                      ? "0"
                      : custumization_arr.length
                  }
                  color="primary"
                > */}
              <span>
                <i
                  style={{ margin: "8px", fontSize: "23px" }}
                  className="fas fa-list"
                ></i>
                Custumizations
                {custumization_arr.length !== 0 && (
                  <span
                    style={{
                      borderRadius: "5px",
                      color: "#7C7575",
                      fontSize: "12px",
                      backgroundColor: "#EBEDE8",
                      padding: "5px",
                      margin: "4px 8px",
                      // border: "1px solid lightgray"
                    }}
                  >
                    {` ${custumization_arr.length} `}
                  </span>
                )}
              </span>
              {/* </Badge> */}
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
                        float: "right",
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
                            marginLeft: "20px",
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

export default Item;
