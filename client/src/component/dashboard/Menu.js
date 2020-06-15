import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Card, Grid, Collapse, Badge, Divider } from "@material-ui/core";
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
    minWidth: "200px"

    // "&:hover": {
    //   borderColor: deepPurple[300]
    // }
  },
  cardTitle: {
    fontSize: "1.17rem",
    color: "#122740",
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bolder"
  },
  cardSub: {
    fontSize: "0.975rem",
    color: "#75b583",
    // color: "#756e6e",
    borderRadius: "5px",
    fontWeight: "bold",
    marginBottom: "5px"
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
    fontWeight: "bold",
    // border: "1px solid lightgray",
    marginBottom: "5px"
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
    // item_price,
    currency,
    item_desc,
    // food_type,
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
            {props.item.item_price && (
              <Grid item xs={6} sm={6} md={12}>
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
                    color: deepPurple[100]
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
                      color: deepPurple[100]
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
                margin: `5px 8px  ${state.custum_show ? "16px" : "0px"} 8px`
              }}
              onClick={() => toggleCollapse("custum_show")}
            >
              <Badge
                badgeContent={
                  custumization_arr.length === 0
                    ? "0"
                    : custumization_arr.length
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
      )}
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
        style={{
          fontWeight: "bolder",
          marginBottom: `${!state.cat_show ? "2px" : "20px"}`
        }}
        onClick={() => toggleCollapse("cat_show")}
      >
        <i
          style={{ margin: "4px", fontSize: "25px" }}
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
            margin: "4px 8px"
            // border: "1px solid lightgray"
          }}
        >
          {`${props.category.items.length} items`}
        </span>

        <i
          style={{ margin: "8px", fontSize: "22px", float: "right" }}
          className={`fas fa-sort-${state.cat_show ? "up" : "down"}`}
        ></i>
      </Typography>
      {/* <Divider /> */}
      <Collapse in={state.cat_show}>
        {props.category &&
          props.category.items.map((item, idx) => (
            <Item key={idx} item={item} />
          ))}
      </Collapse>
    </div>
  );
};

const Package = props => {
  const classes = useStyles();
  const {
    package_name,
    package_price,
    package_desc,
    items,
    custumization_arr
  } = props.package;
  const show_arr = Array.from(
    { length: custumization_arr.length },
    ele => false
  );

  const [state, setState] = React.useState({
    desc_show: false,
    custum_show: false,
    custum_show_arr: [...show_arr],
    anchorEl: null,
    items_show: false
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
    <div style={{ width: "100%", padding: "30px" }} className={classes.card}>
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
            <Grid item xs={6} sm={6} md={12}>
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
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.cardSub}>
                Rs. {package_price}
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
                    color: deepPurple[100]
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
                      color: deepPurple[100]
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
              margin: `5px 8px  ${state.items_show ? "16px" : "0px"} 8px`
            }}
            onClick={() => toggleCollapse("items_show")}
          >
            <Badge
              badgeContent={items.length === 0 ? "0" : items.length}
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
            {items.map((item, idx) => (
              <Item key={idx} item={item} />
            ))}
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
                      >{`${"Rs."}. ${opt.option_price}`}</span>
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

const Menu = props => {
  const classes = useStyles();
  const minimalSelectClasses = useMinimalSelectStyles();
  // minimalSelectClasses.select.color = deepPurple[50];
  const [state, setState] = useState({
    select_cat: [0, 0, 0],
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

  const handleSelect = evt => {
    const id = evt.target.name;
    const val = evt.target.value;
    // console.log(evt.target);
    let arr = state.select_cat;
    arr[state.tab] = val;
    setState(prevState => ({
      ...prevState,
      select_cat: [...arr]
    }));
  };
  const handleTab = (evt, newValue) => {
    setState({
      ...state,
      tab: newValue
      // select_cat: 0 // here we are changing the categoris to initial value verytime
    });
  };

  const getList = cat => {
    const tab = state.tab;
    const val =
      state.tab === 2
        ? "pack"
        : cat[tab] === 1
        ? "categ"
        : cat[tab] === 2
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
              {props.restaurant ? (
                props.restaurant.menu[tabMap[state.tab]].map((pack, idx) => (
                  <Package key={idx} package={pack} />
                ))
              ) : (
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  No Items Available
                </div>
              )}
            </div>
          );
        else
          return (
            <div>
              {props.restaurant ? (
                <Package
                  key={0}
                  package={
                    props.restaurant.menu[tabMap[state.tab]][
                      cat[tab] >= 2 ? cat[tab] - 2 : cat[tab]
                    ]
                  }
                />
              ) : (
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  No Items Available
                </div>
              )}
            </div>
          );

      case "categ":
        return (
          <div>
            {props.restaurant ? (
              props.restaurant.menu[tabMap[state.tab]].map((category, idx) => (
                <Category key={idx} category={category} />
              ))
            ) : (
              <div style={{ textAlign: "center", fontWeight: "bold" }}>
                No Items Available
              </div>
            )}
          </div>
        );
      case "item":
        const catIdx = cat[tab] >= 2 ? cat[tab] - 2 : cat[tab];
        return (
          <div>
            {props.restaurant ? (
              props.restaurant.menu[tabMap[state.tab]][catIdx].items.map(
                item => <Item item={item} />
              )
            ) : (
              <div style={{ textAlign: "center", fontWeight: "bold" }}>
                No Items Available
              </div>
            )}
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
