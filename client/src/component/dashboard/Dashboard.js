import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
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
// import store from "../../redux/store";
// import DoneIcon from "@material-ui/icons/Done";
// import { Chip } from "@material-ui/core";
const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    },
    zIndex: 2
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      marginLeft: 0
    },
    // backgroundColor: "#455a64",
    backgroundColor: "#282C34",
    zIndex: 3
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [state, setState] = React.useState({
    ...props.restaurant
  });
  // const [state, setState] = React.useState({
  //   page: "home",
  //   restuarant: {}
  // });
  // useEffect(() => {
  //   // console.log(store.getState());
  //   props.loadRest();
  // }, [props.loadRest]);

  // useEffect(() => {
  //   console.log(props.restuarant);
  // }, [props.restuarant]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      component: <></>
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
      component: <></>
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
      component: <></>
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
      component: <></>
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
      component: <></>
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
      component: <></>
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
      component: <></>
    }
  };
  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <div
        className={classes.section}
        style={{ border: "none", textAlign: "center", marginTop: "80px" }}
      >
        <RestLogo height="70px" width="70px" />
        <Typography
          style={{ marginTop: "10px", fontWeight: "bolder" }}
          align={"center"}
        >
          {props.restaurant ? props.restaurant.rest_name : "SherLock's Pub"}
        </Typography>
      </div>
      {/* <Divider /> */}
      <div className={classes.section}>
        <List>
          {["home", "orders", "menu", "orientation", "feedback"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{pages[text]["icon"]}</ListItemIcon>
                <ListItemText
                  style={{ fontWeight: "bold" }}
                  primary={pages[text]["title"]}
                />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["account", "logout"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{pages[text]["icon"]}</ListItemIcon>
              <ListItemText
                style={{ fontWeight: "bold" }}
                primary={pages[text]["title"]}
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
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
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
        <Hidden xsDown implementation="css">
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

        <Menu restaurant={props.restaurant} />
        {/* <Orientation restaurant={props.restaurant} /> */}
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
