import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Card, Grid, Collapse, Badge } from "@material-ui/core";
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
    // boxShadow: "5px 5px 5px lightgray",
    // boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.54)",
    // boxShadow: "0px 2px 12px 0px rgba(0,0,0,0.35)",
    // boxShadow: "0px 2px 12px -3px rgba(0,0,0,0.35)",
    boxShadow: "0px 2px 11px -5px rgba(0,0,0,0.45)",
    // wordBreak: "break-all",
    // zIndex: 1,
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
      borderColor: deepPurple[300]
    }
  },
  cardTitle: {
    fontSize: "1.17rem",
    color: "#122740",
    textAlign: "left"
  },
  cardSub: {
    fontSize: "0.975rem",
    color: "#75b583",
    // color: "#756e6e",
    borderRadius: "5px",
    fontWeight: "bold"
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
    fontWeight: "bold"
    // border: "1px solid lightgray"
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
  }
}));

const Item = props => {
  const classes = useStyles();
  const {
    item_name,
    item_price,
    currency,
    item_desc,
    food_type,
    custumization_arr
  } = props.item;
  const show_arr = Array.from(
    { length: custumization_arr.length },
    ele => false
  );

  const [state, setState] = React.useState({
    desc_show: false,
    custum_show: false,
    custum_show_arr: [...show_arr],
    anchorEl: null
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

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  return (
    <div className={classes.card}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
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
            <Grid item xs={6} sm={6} md={12}>
              <Typography className={classes.cardSub}>
                Rs. {item_price}
              </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
            <Typography
              className={classes.cardDesc}
              onClick={() => toggleCollapse("desc_show")}
              style={{ marginTop: "5px" }}
            >
              {!state.desc_show &&
                "This the short version of Description"
                  .slice(0, 30)
                  .concat("... ")}

              {!state.desc_show && (
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
              {/* <i
              style={{ margin: "8px", fontSize: "22px", float: "right" }}
              className={`fas fa-sort-${state.desc_show ? "up" : "down"}`}
            ></i> */}
              <Collapse in={state.desc_show}>
                {/* This is the FULL ver sion of the description without any cutouts
                this the Full version of desc This is the FULL ver sion of the
                description without any cutouts this the Full version of desc
                This is the FULL ver sion of the description without any cutouts
                this the Full version of desc version of desc This is the FULL
                ver sion of the description without any cutouts this the Full
                version of desc version of desc This is the FULL ver sion of the
                description without any cutouts this the Full version of desc
                version of desc This is the FULL ver sion of the description
                without any cutouts this the Full version of desc FULL ver sion
                of the description without any cutouts this the Full version of
                desc version of desc This is the FULL ver sion of the
                description without any cutouts this the Full version of desc
                version of desc This is the FULL ver sion of the description
                without any cutouts this the Full version of desc version of
                desc This is the FULL ver sion of the description without any
                cutouts this the Full version of desc {".  "} */}
                {item_desc}
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    color: deepPurple[100]
                  }}
                >
                  {".  "}less
                </span>
              </Collapse>
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
                      >{`${currency}. ${opt.option_price}`}</span>
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
};

const Category = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    cat_show: false
  });

  const toggleCollapse = content => {
    setState(prevState => ({
      ...prevState,
      [content]: !prevState[content]
    }));
  };

  return (
    <div className={classes.card} style={{ width: "93%" }}>
      <Typography
        className={classes.cardTitle}
        style={{ fontWeight: "bolder" }}
        onClick={() => toggleCollapse("cat_show")}
      >
        <i
          style={{ margin: "4px", fontSize: "25px" }}
          className="fas fa-clipboard-list"
        ></i>
        Category name
        <i
          style={{ margin: "8px", fontSize: "22px", float: "right" }}
          className={`fas fa-sort-${state.cat_show ? "up" : "down"}`}
        ></i>
      </Typography>

      <Collapse in={state.cat_show}>Items</Collapse>
    </div>
  );
};

const Menu = props => {
  const classes = useStyles();
  const minimalSelectClasses = useMinimalSelectStyles();
  // minimalSelectClasses.select.color = deepPurple[50];
  const [state, setState] = useState({
    select_cat: 0,
    tab: 0
  });

  // const { menu } = props.restaurant;
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

  const handleChange = evt => {
    const id = evt.target.name;
    const val = evt.target.value;
    // console.log(evt.target);

    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  };
  const handleTab = (evt, newValue) => {
    setState({
      ...state,
      tab: newValue
      //select_cat: 0 // here we are changing the categoris to initial value verytime
    });
  };

  const getList = cat => {
    const val =
      state.tab === 2
        ? "pack"
        : cat === 1
        ? "categ"
        : cat === 2
        ? "item"
        : "no items";

    switch (val) {
      case "pack":
        if (cat === 0)
          return (
            <div style={{ textAlign: "center", fontWeight: "bold" }}>
              No items selected to display
            </div>
          );
        else if (cat === 1) return <div>All Packages</div>;
        else return <div>Selected Package</div>;

      case "categ":
        return <div>Categories</div>;
      case "item":
        return <div>Items</div>;

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
      <div>
        <Typography paragraph>Dashboard > Menu</Typography>
        <Typography style={{ fontWeight: "bold" }} variant="h5">
          <span
            style={{
              padding: "5px 20px ",
              backgroundColor: "#fce76f",
              color: "#282C34",
              borderRadius: "5px"
              // border: "1px solid lightgray"
            }}
          >
            Restuarant Menu
          </span>
        </Typography>
      </div>
      <Card
        className={classes.section}
        style={{
          // height: "650px",
          // maxHeight: "560px",
          minWidth: "350px",
          paddingBottom: "25px"
        }}
      >
        <div>
          <Tabs
            value={state.tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTab}
            aria-label="tabs"
            centered
          >
            <Tab label={`Food Menu`} />

            <Tab label={`Bar menu`} />

            <Tab label={`Buffet menu`} />
          </Tabs>
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
              value={state.select_cat}
              onChange={handleChange}
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
            {/* <Category /> */}
            {getList(state.select_cat)}
          </div>
        </div>
      </Card>
    </div>
  );
};

// const mapStateToProps = state => ({
//   isAuthenticated: state.rest_auth.isAuthenticated,
//   restaurant: state.rest_auth.restaurant
// });

// export default connect(
//   mapStateToProps
// )(Menu);

export default Menu;
