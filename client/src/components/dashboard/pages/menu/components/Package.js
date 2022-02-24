import React, { forwardRef } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  Collapse,
  Badge,
  FormControlLabel,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { deepPurple } from "@material-ui/core/colors";
import MaterialMenu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import FlipMove from "react-flip-move";

import useStyles, { useFirebaseBtnStyles } from "../styles/main";
import PaperComponent from "../components/PaperComponent";
import PurpleSwitch from "../components/PurpleSwitch";
import Item from "../components/Item";

import ItemForm from "../forms/ItemForm";
import PackageForm from "../forms/PackageForm";

const Package = forwardRef((props, ref) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { package_name, package_price, package_desc } = props.package;
  const items = (props.package && props.package.items) || [];
  const custumization_arr =
    (props.package && props.package.custumization_arr) || [];

  const show_arr = Array.from(
    { length: custumization_arr.length },
    (ele) => false
  );

  const [state, setState] = React.useState({
    desc_show: false,
    custum_show: false,
    custum_show_arr: [...show_arr],
    anchorEl: null,
    items_show: false,
    status: true,
    dialog_open: false,
    dialog2_open: false,
    dialog3_open: false,
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

  const addItem = (item) => {
    setState({
      ...state,
      dialog3_open: false,
    });
    props.addItem(item, props.packId, props.package.package_name);
  };

  const updatePack = (pack) => {
    setState({
      ...state,
      dialog_open: false,
    });
    props.updatePack(pack, props.packId, props.package.package_name);
  };

  const deleteCatOrPack = () => {
    setState({
      ...state,
      dialog2_open: false,
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
          fullScreen={matchesSmDw}
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
        <Dialog
          open={state.dialog3_open}
          fullWidth={true}
          fullScreen={matchesSmDw}
          maxWidth={"md"}
          scroll="body"
          onClose={() => handleDialogClose("dialog3_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <ItemForm
            item={props.item ? props.item : {}}
            isPackage={true}
            isEdit={false}
            handleDialogClose={() => handleDialogClose("dialog3_open")}
            updateItem={addItem}
          />
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
            <Grid item xs={12}>
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
                    onClick={() => handleDialogOpen("dialog3_open")}
                  >
                    <i
                      style={{ margin: "8px" }}
                      className="fas fa-plus-square"
                    ></i>
                    Add Item
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
                <span style={{ marginRight: "2px" }}>&#8377;</span>{" "}
                {package_price}
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
                    color: deepPurple[100],
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
              margin: `5px 8px  ${state.items_show ? "16px" : "0px"} 8px`,
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
                  name={props.package.package_name}
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
              margin: `5px 8px  ${state.custum_show ? "16px" : "0px"} 8px`,
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
                          marginLeft: "20px",
                        }}
                      >
                        {" "}
                        <span style={{ marginRight: "2px" }}>&#8377;</span>
                        {`${opt.option_price}`}
                      </span>
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

export default Package;
