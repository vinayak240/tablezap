import React, { forwardRef } from "react";
import { clone } from "ramda";
import Typography from "@material-ui/core/Typography";
import {
  Collapse,
  Button,
  Tooltip,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import FlipMove from "react-flip-move";
import useStyles, { useFirebaseBtnStyles } from "../styles/main";
import PaperComponent from "../components/PaperComponent";
import Item from "../components/Item";
import ItemForm from "../forms/ItemForm";
import CategoryForm from "../forms/CategoryForm";
import MaterialMenu from "@material-ui/core/Menu";

const Category = forwardRef((props, ref) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [state, setState] = React.useState({
    cat_show: false,
    show_options: false,
    anchorEl: null,
    cat_edit: false,
    category_name: props.category.category_name || "",
    type: props.category.type || "",
    items: clone(props.category.items),
    dialog3_open: false,
    dialog2_open: false,
    dialog_open: false,
  });

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setState({
      ...state,
      anchorEl: event.currentTarget,
    });
  };

  const handleMenuClose = () => {
    setState({
      ...state,
      anchorEl: null,
    });
  };

  const toggleCollapse = (content) => {
    setState((prevState) => ({
      ...prevState,
      [content]: !prevState[content],
    }));
  };

  const handleMouseIn = () => {
    setState({
      ...state,
      show_options: true,
    });
  };

  const handleMouseOut = () => {
    setState({
      ...state,
      show_options: state.cat_show ? true : false,
    });
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleCatEdit = (evt) => {
    evt.stopPropagation();
    setState({
      ...state,
      category_name: props.category.category_name || "",
      type: props.category.type || "",
      cat_edit: true,
      anchorEl: null,
    });
  };

  const handleCatEditClose = () => {
    setState({
      ...state,
      cat_edit: false,
    });
  };

  const handleDialogOpen = (evt, content) => {
    evt.stopPropagation();
    setState({
      ...state,
      [content]: true,
      anchorEl: null,
    });
  };

  const handleDialogClose = (content) => {
    setState({
      ...state,
      [content]: false,
      category_name: props.category.category_name || "",
    });
  };

  const addItem = (item) => {
    setState({
      ...state,
      dialog_open: false,
    });
    props.addItem(item, props.catId, props.category.category_name);
  };

  const updateCat = () => {
    setState({
      ...state,
      cat_edit: false,
    });
    props.updateCat(
      state.category_name,
      state.type,
      props.catId,
      props.category.category_name
    );
  };

  const addCat = (name, type) => {
    let newCat = {
      category_name: name,
      type,
      items: [],
    };

    setState({
      ...state,
      dialog3_open: false,
    });

    props.addItem(newCat, props.category._id, props.category.category_name);
  };

  const deleteCatOrPack = () => {
    setState({
      ...state,
      dialog2_open: false,
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
          fullScreen={matchesSmDw}
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
          open={state.dialog3_open}
          fullWidth={true}
          fullScreen={matchesSmDw}
          maxWidth={"sm"}
          scroll="body"
          onClose={() => handleDialogClose("dialog3_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <CategoryForm
            handleClose={() => handleDialogClose("dialog3_open")}
            addCat={addCat}
          />
        </Dialog>
        <Dialog
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
              Do you really want to delete the Category "
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
        <MaterialMenu
          id="sub-menu-options"
          anchorEl={state.anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(state.anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            className={classes.menuItem}
            onClick={(evt) =>
              handleDialogOpen(
                evt,
                props.category.type === "sub_menu"
                  ? "dialog3_open"
                  : "dialog_open"
              )
            }
          >
            <i style={{ margin: "8px" }} className="fas fa-plus-square"></i>
            Add item
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={handleCatEdit}>
            <i style={{ margin: "8px" }} className="fas fa-pen"></i>
            Edit
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={(evt) => handleDialogOpen(evt, "dialog2_open")}
          >
            <i style={{ margin: "8px" }} className="fas fa-trash-alt"></i>
            Delete
          </MenuItem>
        </MaterialMenu>
      </div>
      {state.cat_edit ? (
        <div className={classes.card}>
          <Typography className={classes.cardDesc} style={{ margin: "12px" }}>
            Edit
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
            <select
              id="type"
              style={{ marginBottom: "10px" }}
              value={state.type}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Type"
            >
              <option value="category">Category</option>
              <option value="sub_menu">Sub Menu</option>
            </select>
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
          style={{
            width: "98%",
            padding: props.category?.type === "sub_menu" ? "8px" : "22px",
          }}
          onMouseEnter={handleMouseIn}
          onMouseLeave={handleMouseOut}
        >
          <Typography
            className={classes.cardTitle}
            style={{
              fontWeight: "bolder",
              marginBottom: `${!state.cat_show ? "2px" : "20px"}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: props.category?.type === "sub_menu" ? "10px" : "0px",
            }}
            onClick={() =>
              props.category?.type !== "sub_menu" && toggleCollapse("cat_show")
            }
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {props.category?.type !== "sub_menu" && (
                <i
                  style={{ margin: "7px", fontSize: "25px" }}
                  className="fas fa-clipboard-list"
                ></i>
              )}
              {props.category && props.category.category_name}
              <span
                style={{
                  borderRadius: "5px",
                  color: "#7C7575",
                  fontSize: "12px",
                  backgroundColor: "#EBEDE8",
                  padding: "5px",
                  margin: "4px 8px",
                }}
              >
                {`${props.category.items?.length} items`}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {props.category?.type === "sub_menu" ||
              (matchesSmDw && state.cat_show) ? (
                <i
                  aria-controls="sub-menu-options"
                  aria-haspopup="true"
                  style={{ fontSize: "17px" }}
                  className="fas fa-ellipsis-v"
                  onClick={handleMenuOpen}
                ></i>
              ) : (
                !matchesSmDw &&
                state.show_options && (
                  <span style={{ margin: "8px" }}>
                    <Tooltip title="Delete category" arrow>
                      <button
                        style={{
                          margin: "0px 8px",
                          width: "40px",
                          border: "none",
                          textAlign: "center",
                          borderRadius: "4px",
                          backgroundColor: "#efc2c2",
                          padding: "4px",
                        }}
                        onClick={(evt) => handleDialogOpen(evt, "dialog2_open")}
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
                          padding: "4px",
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
                          padding: "4px",
                        }}
                        onClick={(evt) =>
                          handleDialogOpen(
                            evt,
                            props.category.type === "sub_menu"
                              ? "dialog3_open"
                              : "dialog_open"
                          )
                        }
                      >
                        <i
                          style={{ margin: "4px", fontSize: "16px" }}
                          className="fas fa-plus"
                        ></i>
                      </button>
                    </Tooltip>
                  </span>
                )
              )}

              {props.category?.type !== "sub_menu" &&
                !(matchesSmDw && state.cat_show) && (
                  <i
                    style={{ margin: "8px", fontSize: "22px" }}
                    className={`fas fa-sort-${state.cat_show ? "up" : "down"}`}
                  ></i>
                )}
            </span>
          </Typography>
          {/* <Divider /> */}
          <Collapse in={state.cat_show || props.category.type === "sub_menu"}>
            <FlipMove>
              {props.category &&
                props.category.items.map((item, idx) =>
                  // Boolean(props.category.type) &&
                  props.category.type === "sub_menu" &&
                  item.type === "category" ? (
                    <Category
                      catId={item._id}
                      key={idx}
                      category={item}
                      addItem={props.addItem}
                      updateItem={props.updateItem}
                      deleteItem={props.deleteItem}
                      updateCat={props.updateCat}
                      deleteCatOrPack={props.deleteCatOrPack}
                    />
                  ) : (
                    item.type !== "category" && (
                      <Item
                        catId={props.catId}
                        key={idx}
                        isPackage={false}
                        item={item}
                        name={props.category.category_name}
                        addItem={addItem}
                        updateItem={props.updateItem}
                        deleteItem={props.deleteItem}
                      />
                    )
                  )
                )}
            </FlipMove>
          </Collapse>
        </div>
      )}
    </div>
  );
});

export default Category;
