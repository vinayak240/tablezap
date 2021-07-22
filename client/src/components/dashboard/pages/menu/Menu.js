import React, { useState, forwardRef, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Card, useMediaQuery, Button } from "@material-ui/core";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { deepPurple } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import FlipMove from "react-flip-move";
import FbSpinner from "../../../layout/FbSpinner";
import useStyles, { useFirebaseBtnStyles } from "./styles/main";
import PaperComponent from "./components/PaperComponent";
import AntTab from "./components/AntTab";
import AntTabs from "./components/AntTabs";
import Category from "./components/Category";
import Item from "./components/Item";
import Package from "./components/Package";

import ItemForm from "./forms/ItemForm";
import PackageForm from "./forms/PackageForm";

const Menu = (props) => {
  const classes = useStyles();
  // const theme = useTheme();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();
  const matches = useMediaQuery("(min-width:440px)");
  const matchesSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const minimalSelectClasses = useMinimalSelectStyles();
  // minimalSelectClasses.select.color = deepPurple[50];
  const [state, setState] = useState({
    select_cat: [0, 0, 0],
    tab: 0,
    category_name: "",
    dialog_open: false,
    dialog2_open: false,
    dialog3_open: false,
    loading: false,
  });

  // Add This Tomo
  useEffect(() => {
    if (props.isUpdated) {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }, 500);
    }
  }, [props.isUpdated]);

  const tabMap = {
    0: "food",
    1: "bar",
    2: "buffet",
  };
  const iconComponent = (props) => {
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
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const handleSelect = (evt) => {
    // const id = evt.target.name;
    const val =
      evt.target.value === "add"
        ? state.select_cat[state.tab]
        : evt.target.value;
    // console.log(evt.target);
    let arr = state.select_cat;
    arr[state.tab] = val;
    setState((prevState) => ({
      ...prevState,
      select_cat: [...arr],
    }));
  };
  const handleTab = (evt, newValue) => {
    setState({
      ...state,
      tab: newValue,
      // select_cat: 0 // here we are changing the categoris to initial value verytime
    });
  };

  const addItem = (item, catId, name) => {
    props.addItem(item, catId, tabMap[state.tab], name);
  };

  const updateItem = (item, itemId, catId, itemName, name) => {
    props.updateItem(item, itemId, catId, tabMap[state.tab], itemName, name);
  };

  const updateCat = (catName, catId, oldCatName) => {
    props.updateCat(catName, catId, tabMap[state.tab], oldCatName);
  };

  const updatePack = (pack, packId, packName) => {
    props.updatePack(pack, packId, tabMap[state.tab], packName);
  };

  // name - name of package or category in wg=hich it is
  const deleteItem = (itemId, catId, itemName, name) => {
    props.deleteItem(itemId, catId, tabMap[state.tab], itemName, name);
  };

  const deleteCatOrPack = (id, catName) => {
    props.deleteCatOrPack(id, tabMap[state.tab], catName);
  };

  const addItem2 = (item) => {
    const cat = state.select_cat;
    const tab = state.tab;
    const catIdx = cat[tab] >= 2 ? cat[tab] - 2 : cat[tab];
    const catId = props.restaurant.menu[tabMap[state.tab]][catIdx]._id;
    const name = props.restaurant.menu[tabMap[state.tab]][catIdx].category_name;

    setState({
      ...state,
      dialog_open: false,
    });
    props.addItem(item, catId, tabMap[state.tab], name);
  };

  const addCat2 = () => {
    if (state.category_name !== "") {
      setState({
        ...state,
        category_name: "",
        dialog2_open: false,
      });
      // console.log(state.category_name);
      props.addCat(state.category_name, tabMap[state.tab]);
    }
  };

  const addPack2 = (pack) => {
    if (
      pack.package_name !== "" &&
      pack.package_desc !== "" &&
      pack.package_price !== ""
    ) {
      setState({
        ...state,
        dialog3_open: false,
      });
      // console.log(state.category_name);
      props.addPack(pack, tabMap[state.tab]);
    }
  };

  const upload = () => {
    setState({
      ...state,
      loading: true,
    });
    props.upload("menu");
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleDialogOpen = (evt, content) => {
    // evt.stopPropagation();
    setState({
      ...state,
      [content]: true,
    });
  };

  const handleDialogClose = (content) => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false,
    });
  };

  const getList = (cat) => {
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
        const catName =
          props.restaurant.menu[tabMap[state.tab]][catIdx].category_name;
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
                      name={catName}
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
          fullScreen={matchesSmDw}
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
          fullScreen={matchesSmDw}
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
      <div className={classes.breadCrumb}>
        <div>
          {matchesSm && (
            <span>
              <span
                style={{
                  padding: "5px 10px ",
                  color: "#282C34",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </span>

              <b>/</b>
              <span
                style={{
                  padding: "5px 10px ",
                  color: "#282C34",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Menu
              </span>
            </span>
          )}
        </div>
        <div>
          {!state.loading ? (
            <span
              style={{
                display: "inline-block",
                marginBottom: "10px",
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
                alignContent: "center",
              }}
            >
              {" "}
              <FbSpinner /> <span style={{ margin: "5px" }}>
                Uploading...
              </span>{" "}
            </span>
          )}
        </div>
      </div>
      <Card
        className={classes.section}
        style={{
          // height: "650px",
          // maxHeight: "560px",
          minWidth: "350px",
          marginTop: "10px",
          paddingBottom: "25px",
          borderRadius: "8px",
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
                color: deepPurple[500],
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
                      backgroundColor: deepPurple[50],
                    }}
                    disabled={state.select_cat[state.tab] === 0}
                    value={"add"}
                  >
                    <div
                      onClick={(evt) =>
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
                          textDecoration: "underline",
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

const mapStateToProps = (state) => ({
  // isAuthenticated: state.rest_auth.isAuthenticated,
  isUpdated: state.rest_auth.isUpdated,
});

export default connect(mapStateToProps)(Menu);

// export default Menu;
