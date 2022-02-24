import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { clone } from "ramda";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RestLogo from "../logos/RestLogo";
import Logo from "../logos/Logo";
import Menu from "./pages/menu/Menu";
// import Axios from "axios";
import { loadRest, logout } from "../../redux/actions/restaurant/auth";
import Orientation from "./pages/orientation/Orientation";
import { Grid, Badge, useMediaQuery } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import Account from "./pages/account/Account";
import Snackbar from "@material-ui/core/Snackbar";
import { updateRestaurant } from "../../redux/actions/restaurant/dashboard";
import MuiAlert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";
import MaterialMenu from "@material-ui/core/Menu";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// import CloseIcon from "@material-ui/icons/Close";
// import store from "../../redux/store";
// import DoneIcon from "@material-ui/icons/Done";
// import { Chip } from "@material-ui/core";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    zIndex: 2,
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
      marginLeft: 0,
    },
    backgroundColor: "#282C34",
    zIndex: 3,
    boxShadow: "none",
    borderBottom: "1px solid lightgray",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "10px",
    margin: "auto",
    marginTop: "24px",
    marginBottom: "20px",
    width: "88%",
    backgroundColor: "white",
  },
  listItemSelect: {
    color: deepPurple[500],
  },
  logoutBtn: {
    marginLeft: "auto",
    padding: "6px",
    borderRadius: "5px",
    backgroundColor: "#444444",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#565454",
    },
  },
  menuItem: {
    width: "150px",
    padding: "6px 16px",
    fontWeight: "bold",
    textAlign: "left",
    // borderBottom: "1px solid lightgray"
  },
}));

function Dashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const matchesSmDw = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const pageMap = {
    home: 0,
    orders: 1,
    menu: 2,
    orientation: 3,
    feedback: 4,
    account: 5,
    settings: 6,
  };

  const [state, setState] = React.useState({
    restaurant: clone(props.restaurant),
    mobileOpen: false,
    page: "menu",
    is_edited: Array.from({ length: 7 }, (ele) => false),
    snack_open: false,
    loading: false,
    snack1_open: false,
    anchorEl: null,
  });

  // The page becomes unresponsive due to the infinite loop created by the local reference variable..
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      restaurant: clone(props.restaurant),
    }));
  }, [props.restaurant]);
  useEffect(() => {
    if (state.is_edited[pageMap[state.page]]) {
      setState((prevState) => ({
        ...prevState,
        snack_open: true,
      }));
    } else if (state.snack_open) {
      setState((prevState) => ({
        ...prevState,
        snack_open: false,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page, state.is_edited]);

  useEffect(() => {
    if (props.isUpdated) {
      setTimeout(() => {
        let arr = state.is_edited;
        arr[pageMap[state.page]] = false;
        setState((prevState) => ({
          ...prevState,
          is_edited: [...arr],
          snack_open: false,
          loading: false,
        }));
        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            snack1_open: true,
          }));
        }, 100);
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isUpdated]);

  const handleDrawerToggle = () => {
    setState({
      ...state,
      mobileOpen: !state.mobileOpen,
    });
  };

  const handleSnackClose = (event, reason, content) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      [content]: false,
    });
  };

  const getCatIdx = (catId, menuType, name) => {
    let restaurant = clone(state.restaurant);
    let catIdx = -1;
    let parentIdx = -1;

    if (Boolean(catId)) {
      catIdx = restaurant.menu[menuType].findIndex((ele) => ele._id === catId);
      if (catIdx === -1) {
        let allSubMenus = restaurant.menu[menuType].filter(
          (ele) => ele.type === "sub_menu"
        );
        for (let i = 0; i < allSubMenus.length; i++) {
          catIdx = allSubMenus[i].items.findIndex((ele) => ele._id === catId);
          if (catIdx !== -1) {
            parentIdx = getCatIdx(
              allSubMenus[i]._id,
              menuType,
              allSubMenus[i].category_name
            ).catIdx;
            break;
          }
        }
      }
    } else {
      if (menuType === "buffet") {
        catIdx = restaurant.menu[menuType].findIndex(
          (ele) => ele.package_name === name
        );
        if (catIdx === -1) {
          let allSubMenus = restaurant.menu[menuType].filter(
            (ele) => ele.type === "sub_menu"
          );
          for (let i = 0; i < allSubMenus.length; i++) {
            catIdx = allSubMenus[i].items.findIndex(
              (ele) => ele.package_name === name
            );
            if (catIdx !== -1) {
              parentIdx = getCatIdx(
                allSubMenus[i]._id,
                menuType,
                allSubMenus[i].category_name
              ).catIdx;
              break;
            }
          }
        }
      } else {
        catIdx = restaurant.menu[menuType].findIndex(
          (ele) => ele.category_name === name
        );
        if (catIdx === -1) {
          let allSubMenus = restaurant.menu[menuType].filter(
            (ele) => ele.type === "sub_menu"
          );
          for (let i = 0; i < allSubMenus.length; i++) {
            catIdx = allSubMenus[i].items.findIndex(
              (ele) => ele.category_name === name
            );
            if (catIdx !== -1) {
              parentIdx = getCatIdx(
                allSubMenus[i]._id,
                menuType,
                allSubMenus[i].category_name
              ).catIdx;
              break;
            }
          }
        }
      }
    }
    console.log(catIdx, parentIdx);

    return { catIdx, parentIdx };
  };

  // name - category or package name
  const addItem = (item, catId, menuType, name) => {
    let restaurant = clone(state.restaurant);
    let { catIdx, parentIdx } = getCatIdx(catId, menuType, name);
    let newArr = [];
    console.log(catIdx, parentIdx);
    if (parentIdx !== -1) {
      newArr = [
        ...restaurant.menu[menuType][parentIdx].items[catIdx].items,
        item,
      ];
      restaurant.menu[menuType][parentIdx].items[catIdx].items = newArr;
    } else {
      newArr = [...restaurant.menu[menuType][catIdx].items, item];
      restaurant.menu[menuType][catIdx].items = newArr;
    }

    let arr = state.is_edited;
    arr[2] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const addCat = (catName, type, menuType) => {
    let restaurant = clone(state.restaurant);
    let newCat = {
      category_name: catName,
      type,
      items: [],
    };
    let newArr = [...restaurant.menu[menuType], newCat];
    restaurant.menu[menuType] = newArr;
    let arr = state.is_edited;
    arr[2] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const addPack = (pack, menuType) => {
    let restaurant = clone(state.restaurant);
    let newArr = [...restaurant.menu[menuType], pack];
    restaurant.menu[menuType] = newArr;
    let arr = state.is_edited;
    arr[2] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const addTable = (newTable) => {
    let restaurant = clone(state.restaurant);
    restaurant.orientation.tables = [
      ...restaurant.orientation.tables,
      { ...newTable },
    ];

    let arr = state.is_edited;
    arr[3] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const updateItem = (item, itemId, catId, menuType, itemName, name) => {
    let restaurant = clone(state.restaurant);

    let { catIdx, parentIdx } = getCatIdx(catId, menuType, name);
    if (parentIdx !== -1) {
      let itemIdx = "";
      if (Boolean(itemId)) {
        itemIdx = restaurant.menu[menuType][parentIdx].items[
          catIdx
        ].items.findIndex((ele) => ele._id === itemId);
      } else {
        itemIdx = restaurant.menu[menuType][parentIdx].items[
          catIdx
        ].items.findIndex((ele) => ele.item_name === itemName);
      }

      restaurant.menu[menuType][parentIdx].items[catIdx].items[itemIdx] =
        clone(item);
    } else {
      let itemIdx = -1;
      if (Boolean(itemId)) {
        itemIdx = restaurant.menu[menuType][catIdx].items.findIndex(
          (ele) => ele._id === itemId
        );
      } else {
        itemIdx = restaurant.menu[menuType][catIdx].items.findIndex(
          (ele) => ele.item_name === itemName
        );
      }

      restaurant.menu[menuType][catIdx].items[itemIdx] = clone(item);
    }

    let arr = state.is_edited;
    arr[2] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const updateCat = (catName, type, id, menuType, oldCatName) => {
    let restaurant = clone(state.restaurant);
    let { catIdx, parentIdx } = getCatIdx(id, menuType, oldCatName);

    if (parentIdx !== -1) {
      restaurant.menu[menuType][parentIdx].items[catIdx].category_name =
        catName;
      restaurant.menu[menuType][parentIdx].items[catIdx].type = type;
    } else if (Boolean(id)) {
      let idx = restaurant.menu[menuType].findIndex((ele) => ele._id === id);
      restaurant.menu[menuType][idx].category_name = catName;
      restaurant.menu[menuType][idx].type = type;
    } else {
      let idx = restaurant.menu[menuType].findIndex(
        (ele) => ele.category_name === oldCatName
      );
      restaurant.menu[menuType][idx].category_name = catName;
      restaurant.menu[menuType][idx].type = type;
    }
    let arr = state.is_edited;
    arr[2] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const updatePack = (pack, id, menuType, oldPackName) => {
    let restaurant = clone(state.restaurant);

    if (Boolean(id)) {
      let idx = restaurant.menu[menuType].findIndex((ele) => ele._id === id);
      restaurant.menu[menuType][idx] = pack;
    } else {
      let idx = restaurant.menu[menuType].findIndex(
        (ele) => ele.package_name === oldPackName
      );
      restaurant.menu[menuType][idx] = pack;
    }

    let arr = state.is_edited;
    arr[2] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const updateTable = (newTable, id) => {
    let restaurant = clone(state.restaurant);
    let idx = restaurant.orientation.tables.findIndex((t) => t.table_id === id);
    restaurant.orientation.tables[idx] = newTable;

    let arr = state.is_edited;
    arr[3] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const updateInfo = (data) => {
    let restaurant = { ...state.restaurant, ...data };

    let arr = state.is_edited;
    arr[5] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const resetPsswd = (newPsswd) => {
    let data = { rest_psswd: newPsswd };
    let restaurant = { ...state.restaurant, ...data };

    let arr = state.is_edited;
    arr[5] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const deleteItem = (itemId, catId, menuType, itemName, name) => {
    let restaurant = clone(state.restaurant);
    let { catIdx, parentIdx } = getCatIdx(catId, menuType, name);

    if (parentIdx !== -1) {
      let arr = restaurant.menu[menuType][parentIdx].items[catIdx].items;
      let newArr = [];
      if (Boolean(itemId)) {
        newArr = arr.filter((ele) => ele._id !== itemId);
      } else {
        newArr = arr.filter((ele) => ele.item_name !== itemName);
      }

      restaurant.menu[menuType][parentIdx].items[catIdx].items = clone(newArr);
    } else {
      let arr = restaurant.menu[menuType][catIdx].items;
      let newArr = [];
      if (Boolean(itemId)) {
        newArr = arr.filter((ele) => ele._id !== itemId);
      } else {
        newArr = arr.filter((ele) => ele.item_name !== itemName);
      }
      // restaurant.menu[menuType][catIdx].items[itemIdx] = clone(item);
      restaurant.menu[menuType][catIdx].items = clone(newArr);
    }

    let arr = restaurant.menu[menuType][catIdx].items;
    let newArr = [];
    if (Boolean(itemId)) {
      newArr = arr.filter((ele) => ele._id !== itemId);
    } else {
      newArr = arr.filter((ele) => ele.item_name !== itemName);
    }
    // restaurant.menu[menuType][catIdx].items[itemIdx] = clone(item);
    restaurant.menu[menuType][catIdx].items = clone(newArr);

    // The thing that i did befor returns the items arr to the whole Restaurant obj so the whole restaurant in state becomes the items arr
    // that is why i was getting undefined err

    arr = state.is_edited;
    arr[2] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const deleteCatOrPack = (id, menuType, oldName) => {
    let restaurant = clone(state.restaurant);
    // Below is the correct filter approach...
    let name = menuType === "buffet" ? "package_name" : "category_name";
    let arr = restaurant.menu[menuType];
    let newArr = [];
    if (Boolean(id)) {
      newArr = arr.filter((ele) => ele._id !== id);
    } else {
      newArr = arr.filter((ele) => ele[name] !== oldName);
    }
    restaurant.menu[menuType] = clone(newArr);

    // The thing that i did below returns the category arr to the whole Restaurant obj so the whole restaurant becomes the category arr
    // that is why i was getting undefined err
    // let newRest = restaurant.menu[menuType].filter(ele => ele._id !== id);

    arr = state.is_edited;
    arr[2] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const deleteTable = (id) => {
    let restaurant = clone(state.restaurant);
    let newArr = restaurant.orientation.tables.filter((t) => t.table_id !== id);
    restaurant.orientation.tables = [...newArr];

    let arr = state.is_edited;
    arr[3] = true;
    setState({
      ...state,
      restaurant: clone(restaurant),
      is_edited: [...arr],
    });
  };

  const upload = (categ) => {
    setState({
      ...state,
      loading: true,
    });
    props.updateRestaurant(state.restaurant, categ);
  };

  const clearChanges = () => {
    setState({
      ...state,
      restaurant: clone(props.restaurant),
      is_edited: Array.from({ length: 7 }, (ele) => false),
      snack_open: false,
    });
  };

  const pages = {
    home: {
      title: "Home",
      // icon: <i style={{ fontSize: "21px" }} className="fas fa-home"></i>,
      icon: (
        <img
          style={{
            width: "1.5rem",
            verticalAlign: "middle",
            // margin: "10px",
            float: "left",
          }}
          alt="home-icon"
          src="https://img.icons8.com/officexs/80/000000/restaurant-building.png"
        />
      ),
      component: <>Home</>,
    },
    orders: {
      title: "Orders",
      // icon: (
      //   <i style={{ fontSize: "21px" }} className="fas fa-clipboard-list"></i>
      // ),
      icon: (
        <img
          style={{
            width: "1.7rem",
            verticalAlign: "middle",
            // margin: "10px",
            float: "left",
          }}
          alt="order-icon"
          src="https://img.icons8.com/fluent/96/000000/purchase-order.png"
        />
      ),
      component: <>Orders</>,
    },
    menu: {
      title: "Menu",
      // icon: <i style={{ fontSize: "21px" }} className="fas fa-utensils"></i>,
      icon: (
        <img
          style={{
            width: "1.5rem",
            verticalAlign: "middle",
            // margin: "10px",
            float: "left",
          }}
          alt="menu-icon"
          src="https://img.icons8.com/dusk/64/000000/restaurant-menu.png"
        />
      ),
      component: (
        <Menu
          restaurant={state.restaurant}
          addItem={addItem}
          addCat={addCat}
          addPack={addPack}
          updateItem={updateItem}
          deleteItem={deleteItem}
          updateCat={updateCat}
          updatePack={updatePack}
          deleteCatOrPack={deleteCatOrPack}
          upload={upload}
          clearChanges={clearChanges}
          isEdited={state.is_edited[2]}
          // isloading={state.loading}
        />
      ),
    },
    orientation: {
      title: "Orientation",
      // icon: <i style={{ fontSize: "21px" }} className="fas fa-compass"></i>,

      icon: (
        <img
          style={{
            width: "1.5rem",
            verticalAlign: "middle",
            // margin: "10px",
            float: "left",
          }}
          alt="plan-icon"
          src="https://img.icons8.com/dusk/64/000000/floor-plan.png"
        />
      ),

      component: (
        <Orientation
          restaurant={state.restaurant}
          updateTable={updateTable}
          deleteTable={deleteTable}
          addTable={addTable}
          upload={upload}
          clearChanges={clearChanges}
          isEdited={state.is_edited[3]}
        />
      ),
    },
    feedback: {
      title: "Feedback",
      // icon: <i style={{ fontSize: "21px" }} className="fas fa-comments"></i>,
      icon: (
        <img
          style={{
            width: "1.5rem",
            verticalAlign: "middle",
            // margin: "10px",
            float: "left",
          }}
          alt="feedback-icon"
          src="https://img.icons8.com/fluent/96/000000/web-analystics.png"
        />
      ),
      component: <>Feedback</>,
    },
    account: {
      title: "Account",
      // icon: <i style={{ fontSize: "21px" }} className="fas fa-hotel"></i>,
      icon: (
        <img
          style={{
            width: "1.5rem",
            verticalAlign: "middle",
            // margin: "10px",
            float: "left",
          }}
          alt={"acc-icon"}
          src="https://img.icons8.com/color/96/000000/client-company.png"
        />
      ),
      component: (
        <Account
          restaurant={state.restaurant}
          updateInfo={updateInfo}
          resetPsswd={resetPsswd}
          upload={upload}
          clearChanges={clearChanges}
          isEdited={state.is_edited[5]}
        />
      ),
    },
    settings: {
      title: "Settings",
      // icon: (
      //   <i style={{ fontSize: "21px" }} className="fas fa-sign-out-alt"></i>
      // ),
      icon: (
        <img
          style={{
            width: "1.5rem",
            verticalAlign: "middle",
            // margin: "10px",
            float: "left",
          }}
          alt="settings-icon"
          src="https://img.icons8.com/fluent/96/000000/settings.png"
        />
        // <img src="https://img.icons8.com/fluent/48/000000/settings.png"/>
      ),
      component: <>Settings</>,
    },
  };
  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <Grid
        className={classes.section}
        style={{
          marginTop: matchesSmDw ? "24px" : "80px",
          padding: "15px 10px",
        }}
        container
        // spacing={1}
        direction="row"
        alignItems="center"
        justify="flex-start"
      >
        <Grid style={{ paddingRight: "8px" }} item xs={3}>
          <RestLogo height="35px" width="35px" />
        </Grid>

        <Grid style={{ paddingRight: "8px" }} item xs={9}>
          <Typography
            style={{
              fontWeight: "bolder",
              fontSize: "15px",
              // textDecoration: "underline"
            }}
            // align={"center"}
          >
            {props.restaurant ? props.restaurant.rest_name : "Restaurant"}
          </Typography>
          <Typography>
            <span
              style={{
                borderRadius: "6px",
                padding: "3px",
                backgroundColor: "#cdefc9",
                textDecoration: "underline",
                color: "green",
                marginTop: "10x",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              <img
                style={{
                  width: "13px",
                  verticalAlign: "middle",
                  margin: "3px",
                  // float: "left"
                }}
                src="https://img.icons8.com/fluent/48/000000/verified-account.png"
                alt="ID"
              />
              {props.restaurant ? "status" : "status"}
              {/* Implement Restaurant Statuses where in Restaurant can be Open/Closed/TemporarilyClosed */}
            </span>
          </Typography>
        </Grid>
      </Grid>
      {/* <Divider /> */}
      <div className={classes.section}>
        <List>
          {["home", "orders", "menu", "orientation", "feedback"].map(
            (text, index) => (
              <ListItem
                id={text}
                button
                key={text}
                classes={{ selected: classes.listItemSelect }}
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    page: text,
                    mobileOpen: false,
                  }))
                }
                selected={state.page === text}
              >
                <ListItemIcon>{pages[text]["icon"]}</ListItemIcon>

                <ListItemText
                  style={{ fontWeight: "bold" }}
                  primary={
                    // <Badge
                    //   color="secondary"
                    //   variant="dot"
                    //   invisible={!state.is_edited[index]}
                    // >
                    <span style={{ fontWeight: "bold" }}>
                      {pages[text]["title"]}
                    </span>
                    // </Badge>
                  }
                />
                <Badge
                  color="secondary"
                  variant="dot"
                  invisible={!state.is_edited[index]}
                >
                  {" "}
                </Badge>
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["account", "settings"].map((text, index) => (
            <ListItem
              button
              key={text}
              classes={{ selected: classes.listItemSelect }}
              onClick={() => {
                // console.log(evt);
                setState((prevState) => ({
                  ...prevState,
                  page: text,
                  mobileOpen: false,
                }));
              }}
              selected={state.page === text}
            >
              <ListItemIcon>{pages[text]["icon"]}</ListItemIcon>
              <ListItemText
                style={{ fontWeight: "bold" }}
                primary={
                  // <Badge
                  //   color="secondary"
                  //   variant="dot"
                  //   invisible={!state.is_edited[index + 5]}
                  // >
                  <span style={{ fontWeight: "bold" }}>
                    {pages[text]["title"]}
                  </span>
                  // </Badge>
                }
              />
              <Badge
                color="secondary"
                variant="dot"
                invisible={!state.is_edited[index + 5]}
              >
                {" "}
              </Badge>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <div className="all_partials">
        <Snackbar
          // this line here treats every page's snackbar differently hence refresh duration
          key={`Un-saved Changes in "${pages[state.page].title}"`}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={state.snack_open}
          autoHideDuration={4000}
          onClose={(evt, reason) => handleSnackClose(evt, reason, "snack_open")}
          message={
            <span
              style={{ fontWeight: "bold", color: "#FFD900" }}
            >{`Un-saved Changes in "${pages[state.page].title}"`}</span>
          }
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={(evt, reason) =>
                  handleSnackClose(evt, reason, "snack_open")
                }
              >
                {/* <CloseIcon fontSize="small" /> */}
                <i
                  style={{ color: "#F783AC" }}
                  className="fas fa-times-circle"
                ></i>
              </IconButton>
            </React.Fragment>
          }
        />
        <Snackbar
          //this line here treats every page's snackbar differently hence refresh duration
          key={`Succesfully Uploaded`}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={state.snack1_open}
          autoHideDuration={4000}
          onClose={(evt, reason) =>
            handleSnackClose(evt, reason, "snack1_open")
          }
        >
          <Alert
            onClose={(evt, reason) =>
              handleSnackClose(evt, reason, "snack1_open")
            }
            severity="success"
          >
            <span style={{ fontWeight: "bold" }}>Succesfully Uploaded!</span>
          </Alert>
        </Snackbar>
      </div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {/* TZ PARTNER */}
            <Logo width="100px" height="50px" />
          </Typography>

          <div
            aria-controls="menu-profile"
            aria-haspopup="true"
            className={classes.logoutBtn}
            onClick={(evt) =>
              setState({ ...state, anchorEl: evt.currentTarget })
            }
          >
            <Badge
              color="secondary"
              overlap="circle"
              variant="dot"
              badgeContent=" "
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <RestLogo width="20px" height="20px" />
            </Badge>

            {!matches && (
              <span
                style={{
                  marginLeft: "8px",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
                variant="p"
                noWrap
              >
                {props.restaurant.rest_id.length < 10
                  ? props.restaurant.rest_id
                  : props.restaurant.rest_id.slice(0, 8) + " .."}
              </span>
            )}
            <i
              style={{ marginLeft: "5px", verticalAlign: "sub" }}
              className="fas fa-angle-down"
            ></i>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={state.mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        <div className="partials">
          <MaterialMenu
            id="menu-profile"
            anchorEl={state.anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted
            open={Boolean(state.anchorEl)}
            onClose={() =>
              setState({
                ...state,
                anchorEl: null,
              })
            }
          >
            <MenuItem
              className={classes.menuItem}
              onClick={props.logout} //handle Logout
            >
              <i
                style={{
                  margin: "8px",
                  transform: "rotate(180deg)",
                }}
                className="fas fa-sign-out-alt"
              ></i>
              Logout
            </MenuItem>
          </MaterialMenu>
        </div>
        {state.restaurant && pages[state.page].component}
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.rest_auth.isAuthenticated,
  restaurant: state.rest_auth.restaurant,
  isUpdated: state.rest_auth.isUpdated,
  loading: state.rest_auth.loading,
});

export default connect(mapStateToProps, { loadRest, updateRestaurant, logout })(
  Dashboard
);
