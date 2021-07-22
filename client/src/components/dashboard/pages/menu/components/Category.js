import React, { forwardRef } from "react";
import { clone } from "ramda";
import Typography from "@material-ui/core/Typography";
import { Collapse, Button, Tooltip } from "@material-ui/core";
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
    dialog_open: false,
  });

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
      cat_edit: true,
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
    // console.log("Closed - ", state.dialog_open);
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
      props.catId,
      props.category.category_name
    );
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
              marginBottom: `${!state.cat_show ? "2px" : "20px"}`,
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
                margin: "4px 8px",
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
                    onClick={(evt) => handleDialogOpen(evt, "dialog_open")}
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
                    name={props.category.category_name}
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

export default Category;
