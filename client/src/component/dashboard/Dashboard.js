import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import Menu from "./Menu";
// import Axios from "axios";
import { loadRest } from "../../redux/actions/restaurant/auth";
import Orientation from "./Orientation";
import { Grid } from "@material-ui/core";
// import store from "../../redux/store";
// import DoneIcon from "@material-ui/icons/Done";
// import { Chip } from "@material-ui/core";

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    },
    zIndex: 2
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
      marginLeft: 0
    },
    // backgroundColor: "#455a64",
    backgroundColor: "#282C34",
    zIndex: 3
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "10px",
    margin: "auto",
    marginTop: "24px",
    marginBottom: "20px",
    width: "88%",
    backgroundColor: "white"
  }
}));

function Dashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const dispatch = useDispatch();
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // let restaurant = {};
  // let menu = {};
  // let orientation = {};
  // if (props.restaurant) {
  //   restaurant = { ...props.restaurant };
  //   delete restaurant.menu;
  //   delete restaurant.orientation;
  //   menu = clone(props.restaurant.menu);
  //   orientation = clone(props.restaurant.orientation);
  // }

  // const restaurant = clone(props.restaurant);
  // console.log("Clone again : ", restaurant);

  const [state, setState] = React.useState({
    restaurant: clone(props.restaurant),
    mobileOpen: false,
    page: "menu"
  });

  // The page becomes unresponsive due to the infinite loop created by the local reference variable..
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      restaurant: clone(props.restaurant)
    }));
  }, [props.restaurant]);

  const handleDrawerToggle = () => {
    setState({
      ...state,
      mobileOpen: !state.mobileOpen
    });
  };

  const addItem = (item, catId, menuType) => {
    let restaurant = clone(state.restaurant);
    let catIdx = restaurant.menu[menuType].findIndex(ele => ele._id === catId);
    let newArr = [...restaurant.menu[menuType][catIdx].items, item];
    restaurant.menu[menuType][catIdx].items = newArr;

    setState({
      ...state,
      restaurant: clone(restaurant)
    });
  };

  const updateItem = (item, itemId, catId, menuType) => {
    let restaurant = clone(state.restaurant);
    // restaurant.menu = clone(menu);
    let catIdx = restaurant.menu[menuType].findIndex(ele => ele._id === catId);
    let itemIdx = restaurant.menu[menuType][catIdx].items.findIndex(
      ele => ele._id === itemId
    );
    restaurant.menu[menuType][catIdx].items[itemIdx] = clone(item);

    setState({
      ...state,
      restaurant: clone(restaurant)
    });
  };

  const deleteItem = (itemId, catId, menuType) => {
    let restaurant = clone(state.restaurant);
    // restaurant.menu = clone(menu);
    let catIdx = restaurant.menu[menuType].findIndex(ele => ele._id === catId);
    let arr = restaurant.menu[menuType][catIdx].items;
    let newArr = arr.filter(ele => ele._id !== itemId);
    // restaurant.menu[menuType][catIdx].items[itemIdx] = clone(item);
    restaurant.menu[menuType][catIdx].items = clone(newArr);

    // The thing that i did befor returns the items arr to the whole Restaurant obj so the whole restaurant in state becomes the items arr
    // that is why i was getting undefined err
    setState({
      ...state,
      restaurant: clone(restaurant)
    });
  };

  const updateCat = (catName, id, menuType) => {
    let restaurant = clone(state.restaurant);
    let idx = restaurant.menu[menuType].findIndex(ele => ele._id === id);
    restaurant.menu[menuType][idx].category_name = catName;

    setState({
      ...state,
      restaurant: clone(restaurant)
    });
  };

  const updatePack = (pack, id, menuType) => {
    let restaurant = clone(state.restaurant);
    let idx = restaurant.menu[menuType].findIndex(ele => ele._id === id);
    restaurant.menu[menuType][idx] = clone(pack);

    setState({
      ...state,
      restaurant: clone(restaurant)
    });
  };

  const deleteCatOrPack = (id, menuType) => {
    let restaurant = clone(state.restaurant);
    // Below is the correct filter approach...
    let arr = restaurant.menu[menuType];
    let newArr = arr.filter(ele => ele._id !== id);
    restaurant.menu[menuType] = clone(newArr);

    // The thing that i did below returns the category arr to the whole Restaurant obj so the whole restaurant becomes the category arr
    // that is why i was getting undefined err
    // let newRest = restaurant.menu[menuType].filter(ele => ele._id !== id);

    setState({
      ...state,
      restaurant: clone(restaurant)
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
            float: "left"
          }}
          alt="home-icon"
          src="https://img.icons8.com/officexs/80/000000/restaurant-building.png"
        />
      ),
      component: <>Home</>
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
            float: "left"
          }}
          alt="order-icon"
          src="https://img.icons8.com/fluent/96/000000/purchase-order.png"
        />
      ),
      component: <>Orders</>
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
            float: "left"
          }}
          alt="menu-icon"
          src="https://img.icons8.com/dusk/64/000000/restaurant-menu.png"
        />
      ),
      component: (
        <Menu
          restaurant={state.restaurant}
          addItem={addItem}
          updateItem={updateItem}
          deleteItem={deleteItem}
          updateCat={updateCat}
          updatePack={updatePack}
          deleteCatOrPack={deleteCatOrPack}
        />
      )
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
            float: "left"
          }}
          alt="plan-icon"
          src="https://img.icons8.com/dusk/64/000000/floor-plan.png"
        />
      ),

      component: <Orientation restaurant={state.restaurant} />
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
            float: "left"
          }}
          alt="feedback-icon"
          src="https://img.icons8.com/fluent/96/000000/web-analystics.png"
        />
      ),
      component: <>Feedback</>
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
            float: "left"
          }}
          alt={"acc-icon"}
          src="https://img.icons8.com/color/96/000000/client-company.png"
        />
      ),
      component: <>Account</>
    },
    logout: {
      title: "Logout",
      // icon: (
      //   <i style={{ fontSize: "21px" }} className="fas fa-sign-out-alt"></i>
      // ),
      icon: (
        <img
          style={{
            width: "1.5rem",
            verticalAlign: "middle",
            // margin: "10px",
            float: "left"
          }}
          alt="logout-icon"
          src="https://img.icons8.com/fluent/96/000000/exit.png"
        />
      ),
      component: <>Logout</>
    }
  };
  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <Grid
        className={classes.section}
        style={{ marginTop: "80px", padding: "15px 10px" }}
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
              fontSize: "15px"
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
                fontWeight: "bold"
              }}
            >
              <img
                style={{
                  width: "13px",
                  verticalAlign: "middle",
                  margin: "3px"
                  // float: "left"
                }}
                src="https://img.icons8.com/fluent/48/000000/verified-account.png"
                alt="ID"
              />
              {props.restaurant ? props.restaurant.rest_id : "123"}
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
                onClick={() =>
                  setState(prevState => ({
                    ...prevState,
                    page: text,
                    mobileOpen: false
                  }))
                }
              >
                <ListItemIcon>{pages[text]["icon"]}</ListItemIcon>
                <ListItemText
                  style={{ fontWeight: "bold" }}
                  primary={
                    <span style={{ fontWeight: "bold" }}>
                      {pages[text]["title"]}
                    </span>
                  }
                />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["account", "logout"].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                // console.log(evt);
                setState(prevState => ({
                  ...prevState,
                  page: text,
                  mobileOpen: false
                }));
              }}
            >
              <ListItemIcon>{pages[text]["icon"]}</ListItemIcon>
              <ListItemText
                style={{ fontWeight: "bold" }}
                primary={
                  <span style={{ fontWeight: "bold" }}>
                    {pages[text]["title"]}
                  </span>
                }
              />
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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          {/* <Hidden smUp implementation="css"> */}
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={state.mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          {/* <Hidden xsDown implementation="css"> */}

          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

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
  window: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.rest_auth.isAuthenticated,
  restaurant: state.rest_auth.restaurant
});

export default connect(
  mapStateToProps,
  { loadRest }
)(Dashboard);
