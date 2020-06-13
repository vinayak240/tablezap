import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Badge, Collapse, Card, ButtonBase } from "@material-ui/core";
import item_img from "../../../img/food.png";
import wine_img from "../../../img/wine.png";
import coke_img from "../../../img/coke.png";
import icon_veg from "../../../img/veg.png";
import icon_egg from "../../../img/egg.png";
import icon_non_veg from "../../../img/non_veg.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AlertWindow from "../../layout/Alert";
import { setAlert } from "../../../redux/actions/alert";
import { useDispatch } from "react-redux";
import CloseRounded from "@material-ui/icons/CloseRounded";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "4%",
    marginBottom: "4%",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "7px",
    border: "1px solid lightgray"
  },
  paper: {
    textAlign: "center",
    color: "black",
    borderRadius: "5px",
    // trbl
    padding: "6px 12px 6px 12px",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "14px"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginBottom: "4%",
    fontWeight: "bold",
    textAlign: "center"
  },
  btnGroup: {
    marginTop: "4%",
    textAlign: "right"
  },
  textField: {
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "80%",
    margin: "auto",
    padding: "10px"
  },
  nextBtn: {
    backgroundColor: "#4070FF",
    color: "white"
  },
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "20px",
    marginTop: "15px"
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
  },
  show: {
    textAlign: "right",
    color: "#4070FF",
    width: "80%",
    margin: "8px",
    fontSize: "0.9rem"
  }
}));

const OptionForm = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    option_type: "",
    option: "",
    option_price: "",
    show: false
  });

  useEffect(() => {
    setState({
      option_type: "",
      option: "",
      option_price: "",
      show: true
    });
  }, [props.options]);

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const toggleShow = () => {
    setState({
      ...state,
      show: !state.show
    });
  };

  const onSubmit = () => {
    const { option, option_price, option_type } = state;
    props.addOption(props.custumization_name, {
      option,
      option_price,
      option_type
    });
  };
  return (
    <div
      style={{
        width: "96%",
        padding: "11px 12px",
        margin: "auto",
        marginTop: "10px"
      }}
      className={classes.section}
    >
      <p
        style={{ margin: `0px 8px  ${state.show ? "16px" : "0px"} 8px` }}
        onClick={toggleShow}
      >
        <i
          style={{ margin: "8px", fontSize: "25px" }}
          className="fas fa-poll"
        ></i>
        {props.custumization_name}
        <i
          style={{ margin: "8px", fontSize: "22px", float: "right" }}
          className={`fas fa-sort-${state.show ? "up" : "down"}`}
        ></i>
        <Button
          onClick={() => props.deleteCustum(props.custumization_name)}
          style={{ float: "right", marginRight: "15px", border: "none" }}
          variant="outlined"
        >
          {" "}
          <i style={{ margin: "6px" }} className="far fa-trash-alt"></i>{" "}
        </Button>
      </p>
      <Collapse in={state.show}>
        <form>
          <input
            style={{ margin: "auto", marginBottom: "10px" }}
            id="option"
            value={state.option}
            onChange={handleChange}
            type="text"
            className={classes.textField}
            placeholder="Option name"
          />

          <input
            style={{ margin: "auto", marginBottom: "10px" }}
            id="option_price"
            value={state.option_price}
            onChange={handleChange}
            type="number"
            className={classes.textField}
            placeholder="Option cost"
          />
          <RadioGroup
            aria-label="position"
            value={state.option_type}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value={"minus"}
              control={<Radio id="option_type" color="primary" />}
              label="Deduct from total."
              labelPlacement="end"
            />

            <FormControlLabel
              value={"add"}
              control={<Radio id="option_type" color="primary" />}
              label="Add to total."
              labelPlacement="end"
            />

            <FormControlLabel
              value={"total"}
              control={<Radio id="option_type" color="primary" />}
              label="Option cost becomes total."
              labelPlacement="end"
            />
          </RadioGroup>
          <div>
            <Button
              onClick={onSubmit}
              style={{ float: "right" }}
              color="secondary"
              variant="contained"
            >
              Add
            </Button>
          </div>
        </form>

        {props.options.length !== 0 && (
          <div className={classes.section} style={{ marginTop: "50px" }}>
            {props.options.map((opt, idx) => (
              <span key={idx} className={classes.tag}>
                {opt.option}
                <span
                  style={{
                    padding: "6px",
                    fontWeight: "bold",
                    backgroundColor: "#b8f2ab",
                    color: "#756e6e",
                    borderRadius: "5px",
                    border: "1px solid lightgray",
                    marginLeft: "20px"
                  }}
                >{`${props.currency}. ${opt.option_price}`}</span>
                <ButtonBase>
                  <CloseRounded
                    onClick={() =>
                      props.deleteOption(props.custumization_name, opt.option)
                    }
                    style={{ marginLeft: "10px", fontWeight: "800" }}
                  />
                </ButtonBase>
              </span>
            ))}
          </div>
        )}
      </Collapse>
    </div>
  );
};

const Item = props => {
  const classes = useStyles();
  const {
    item_name,
    item_desc,
    item_type,
    food_type
    // custumization_arr
  } = props.item;
  const ITEM_TYPES = {
    food: "Food Item",
    alcohol: "Alcohol",
    beverage: "Beverage"
  };
  // const [state, setState] = React.useState({
  //   show: false,
  //   cust_show: false
  // });

  // const toggleShow = () => {
  //   setState({
  //     ...state,
  //     show: !state.show
  //   });
  // };

  // const toggleCustShow = () => {
  //   setState({
  //     ...state,
  //     cust_show: !state.cust_show
  //   });
  // };
  const getHallmark = str => {
    switch (str) {
      case "veg":
        return (
          <img
            src={icon_veg}
            alt="Veg"
            style={{
              width: "30px",
              height: "30px",
              float: "right"
            }}
          />
        );
      case "non_veg":
        return (
          <img
            src={icon_non_veg}
            alt="Non-Veg"
            style={{
              width: "30px",
              height: "30px",
              float: "right"
            }}
          />
        );
      case "egg_only":
        return (
          <img
            src={icon_egg}
            alt="Egg only"
            style={{
              width: "30px",
              height: "30px",
              float: "right"
            }}
          />
        );
      default:
        return "    No Hallmark";
    }
  };
  return (
    <div
      style={{ width: "88%", margin: "30px auto" }}
      className={classes.section}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item xs={3}>
          {item_type === "alcohol" ? (
            <img
              src={wine_img}
              alt="Wine"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid lightgray",
                borderRadius: "5px",
                padding: "20px"
              }}
            />
          ) : item_type === "beverage" ? (
            <img
              src={coke_img}
              alt="Beverage"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid lightgray",
                borderRadius: "5px",
                padding: "20px"
              }}
            />
          ) : (
            <img
              src={item_img}
              alt="Food"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid lightgray",
                borderRadius: "5px",
                padding: "20px"
              }}
            />
          )}
        </Grid>

        <Grid item xs={9}>
          <p>
            {" "}
            <span
              style={{
                padding: "5px 20px ",
                backgroundColor: "#F7F7F7",
                color: "#756e6e",
                borderRadius: "5px",
                fontWeight: "bold",
                border: "1px solid white"
              }}
            >
              {" "}
              <i
                style={{ margin: "6px" }}
                className="far fa-arrow-alt-circle-right"
              ></i>{" "}
              {item_name}
            </span>{" "}
            {getHallmark(food_type)}
          </p>
          <p>
            <span
              style={{
                padding: "5px 20px ",
                backgroundColor: "#e6ed8b",
                color: "#756e6e",
                borderRadius: "5px",
                fontWeight: "bold",
                border: "1px solid white"
              }}
            >
              {" "}
              <i style={{ margin: "6px" }} className="fas fa-tag"></i>{" "}
              {`${ITEM_TYPES[item_type]}`}{" "}
            </span>
            <Button
              onClick={() =>
                props.deleteItemFromPack(
                  props.type,
                  props.package_name,
                  item_name
                )
              }
              style={{ float: "right" }}
              variant="outlined"
            >
              {" "}
              <i
                style={{ margin: "6px" }}
                className="far fa-trash-alt"
              ></i>{" "}
            </Button>
          </p>
          <p>
            <span
              style={{
                padding: "5px 20px ",
                backgroundColor: "#F7F7F7",
                color: "#756e6e",
                borderRadius: "5px",
                border: "1px solid white",
                display: "inline-flex",
                fontWeight: "bold",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "80%"
              }}
            >
              <i
                style={{ margin: "6px" }}
                className="far fa-arrow-alt-circle-right"
              ></i>
              {item_desc}
            </span>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

const Package = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    form_show: false,
    item_name: "",
    food_type: "",
    item_desc: "",
    item_type: "",
    item_show: true
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setState(state => ({
      ...state,
      item_name: "",
      food_type: "",
      item_desc: "",
      item_type: "",
      item_show: true,
      show: false,
      cust_show: false
    }));
  }, [props.package.items]);
  const toggleShow = key => {
    setState({
      ...state,
      [key]: !state[key]
    });
  };

  const handleChange = evt => {
    const id = evt.target.id;
    const val = evt.target.value;
    // console.log((id));

    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  };

  const addItem = () => {
    const { item_name, item_desc, food_type, item_type } = state;
    const newItem = {
      item_name,
      item_desc,
      food_type,
      item_type
    };
    if (item_name) {
      const flag = props.package.items.find(
        ele => ele.item_name.toLowerCase() === newItem.item_name.toLowerCase()
      );
      flag &&
        dispatch(
          setAlert("This item name is already used in this category", "error")
        );
      !flag &&
        props.addItemToPack(props.type, props.package.package_name, newItem);
    }
  };

  const toggleOptionShow = () => {
    setState({
      ...state,
      show: !state.show
    });
  };

  const toggleCustShow = () => {
    setState({
      ...state,
      cust_show: !state.cust_show
    });
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "30px auto"
        // paddingBottom: "0px"
      }}
      className={classes.section}
    >
      <Typography style={{ margin: "15px" }} variant="h5">
        <span
          style={{
            padding: "5px 20px ",
            backgroundColor: "#F7F7F7",
            color: "#756e6e",
            borderRadius: "5px"
          }}
        >
          <i
            style={{ margin: "8px", fontSize: "25px" }}
            className="fas fa-utensils"
          ></i>
          {props.package.package_name}
        </span>

        <Button
          onClick={() =>
            props.deletePackFromState(props.type, props.package.package_name)
          }
          style={{
            float: "right",
            color: "white",
            backgroundColor: "#FF6633",
            border: "none"
          }}
          variant="outlined"
        >
          {" "}
          <i style={{ margin: "6px" }} className="far fa-trash-alt"></i>{" "}
        </Button>
        <span
          style={{
            backgroundColor: "#b8f2ab",
            color: "#756e6e",
            borderRadius: "5px",
            border: "1px solid white",
            float: "right",
            fontSize: "16px",
            padding: "5px 14px",
            margin: "auto 30px"
          }}
        >
          {" "}
          <i style={{ margin: "6px" }} className="fas fa-rupee-sign"></i>{" "}
          {`${props.package.package_price} /-`}{" "}
        </span>
      </Typography>
      <Card
        style={{
          width: "84%",
          margin: "auto",
          padding: "4px",
          marginTop: "28px",
          paddingBottom: "10px"
        }}
        className={classes.section}
      >
        <Typography
          style={{ margin: "15px" }}
          variant="h5"
          onClick={() => toggleShow("form_show")}
        >
          <span>
            <i
              style={{ margin: "8px", fontSize: "25px" }}
              className="fas fa-plus-circle"
            ></i>
            Add a new item
          </span>
          <i
            style={{ margin: "8px", fontSize: "22px", float: "right" }}
            className={`fas fa-sort-${state.form_show ? "up" : "down"}`}
          ></i>
        </Typography>
        <Collapse in={state.form_show}>
          {/* Form here */}
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item md={11}>
              <input
                id="item_name"
                value={state.item_name}
                onChange={handleChange}
                style={{ width: "97%" }}
                className={classes.textField}
                placeholder="Item name"
              />
            </Grid>

            <Grid item md={11}>
              <AlertWindow />
            </Grid>

            <Grid item md={11}>
              <RadioGroup
                aria-label="position"
                value={state.food_type}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value={"veg"}
                  control={<Radio id="food_type" color="primary" />}
                  label="Veg"
                  labelPlacement="end"
                />

                <FormControlLabel
                  value={"non_veg"}
                  control={<Radio id="food_type" color="primary" />}
                  label="Non-Veg"
                  labelPlacement="end"
                />

                <FormControlLabel
                  value={"egg_only"}
                  control={<Radio id="food_type" color="primary" />}
                  label="Contains Egg"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={11}>
              <select
                id="item_type"
                name="item_type"
                style={{ width: "35%" }}
                value={state.item_type}
                onChange={handleChange}
                className={classes.textField}
              >
                <option>--Item Type--</option>
                <option value={"food"}>Food Item</option>
                <option value={"alcohol"}>Alcohol</option>
                <option value={"beverage"}>Beverages</option>
              </select>
            </Grid>

            <Grid item md={11}>
              <textarea
                id="item_desc"
                value={state.item_desc}
                onChange={handleChange}
                style={{ width: "97%" }}
                className={classes.textField}
                placeholder="Description"
              ></textarea>
            </Grid>

            <Grid style={{ marginTop: "30px" }} item md={11}>
              <Button
                style={{ float: "right" }}
                onClick={addItem}
                className={classes.nextBtn}
                variant="contained"
                color="primary"
                fullWidth
              >
                Add
                <i
                  style={{ margin: "4px", fontSize: "20px" }}
                  className="fas fa-plus-circle"
                ></i>
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Card>
      <Card
        style={{
          width: "84%",
          margin: "auto",
          padding: "4px",
          marginTop: "28px"
        }}
        className={classes.section}
      >
        <Typography
          onClick={() => toggleShow("item_show")}
          style={{ margin: "15px" }}
          variant="h5"
        >
          <Badge
            badgeContent={
              props.package.items.length === 0
                ? "0"
                : props.package.items.length
            }
            color="primary"
          >
            <span>
              <i
                style={{ margin: "8px", fontSize: "25px" }}
                className="fas fa-list"
              ></i>
              Items
            </span>
          </Badge>
          <i
            style={{ margin: "8px", fontSize: "22px", float: "right" }}
            className={`fas fa-sort-${state.item_show ? "up" : "down"}`}
          ></i>
        </Typography>
        <Collapse in={state.item_show}>
          {/* Items here */}
          {props.package.items.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              type={props.type}
              package_name={props.package.package_name}
              deleteItemFromPack={props.deleteItemFromPack}
            />
          ))}
        </Collapse>
      </Card>
      {props.package.custumization_arr.length !== 0 && (
        <Card
          className={classes.section}
          item
          xs={12}
          style={{
            width: "84%",
            margin: "auto",
            padding: "4px",
            marginTop: "28px"
          }}
        >
          <div style={{ margin: "15px" }}>
            <Typography
              style={{
                margin: `5px 8px  ${state.show ? "16px" : "0px"} 8px`
              }}
              onClick={toggleOptionShow}
              variant="h5"
            >
              <Badge
                badgeContent={
                  props.package.custumization_arr.length === 0
                    ? "0"
                    : props.package.custumization_arr.length
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
                className={`fas fa-sort-${state.show ? "up" : "down"}`}
              ></i>
            </Typography>

            <Collapse in={state.show}>
              {props.package.custumization_arr.map((cust, idx) => (
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
                  <p
                    style={{
                      margin: `0px 8px  ${state.cust_show ? "16px" : "0px"} 8px`
                    }}
                    onClick={toggleCustShow}
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
                  </p>
                  <Collapse in={state.cust_show}>
                    {cust.options.map((opt, idx) => (
                      <span key={idx} className={classes.tag}>
                        {opt.option}
                        <span
                          style={{
                            padding: "6px",
                            fontWeight: "bold",
                            border: "1px solid lightgray",
                            borderRadius: "3px",
                            marginLeft: "20px"
                          }}
                        >{`${"RS"}. ${opt.option_price}`}</span>
                      </span>
                    ))}
                  </Collapse>
                </div>
              ))}
            </Collapse>
          </div>
        </Card>
      )}
    </div>
  );
};

export const BuffetMenu = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    package_name: "",
    package_price: "",
    package_desc: "",
    custumization: "",
    custum_type: "", //Is the no of options that can be selected in the custumization
    custumization_arr: []
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setState(state => ({
      ...state,
      package_name: "",
      package_price: "",
      package_desc: "",
      custumization: "",
      custum_type: "",
      custumization_arr: []
    }));
  }, [props.menu]);

  const handleChange = evt => {
    const id = evt.target.id;
    const val = evt.target.value;
    // console.log((id));

    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  };
  const addPackageToState = () => {
    const {
      package_name,
      package_price,
      package_desc,
      custumization_arr
    } = state;
    const new_package = {
      package_name,
      package_price,
      package_desc,
      items: [],
      custumization_arr
    };
    const flag = props.menu.find(
      ele =>
        ele.package_name.toLowerCase() ===
        new_package.package_name.toLowerCase()
    );
    const flag1 =
      new_package.package_name.trim() === "" ||
      new_package.package_price.trim() === "";
    !flag1 &&
      flag &&
      dispatch(setAlert("Package name is already used!", "error", 2000));
    flag1 &&
      dispatch(
        setAlert(
          "Package name or Package price are required entities",
          "error",
          2000
        )
      );
    !flag && !flag1 && props.addPackToState(props.type, new_package);
    // props.addCatToState(props.type, new_package);
  };

  const addCustum = () => {
    setState({
      ...state,
      custumization_arr: [
        ...state.custumization_arr,
        {
          custumization_name: state.custumization,
          custum_type: state.custum_type,
          options: []
        }
      ],
      custumization: "",
      custum_type: ""
    });
  };

  const deleteCustum = custName => {
    setState({
      ...state,
      custumization_arr: [
        ...state.custumization_arr.filter(
          ele =>
            ele.custumization_name.trim().toLowerCase() !==
            custName.trim().toLowerCase()
        )
      ]
    });
  };

  const addOption = (custName, option) => {
    const idx = state.custumization_arr.findIndex(
      ele =>
        custName.trim().toLowerCase() ===
        ele.custumization_name.trim().toLowerCase()
    );
    let arr = state.custumization_arr;
    arr[idx].options = [...arr[idx].options, option];
    setState({
      ...state,
      custumization_arr: [...arr]
    });
  };

  const deleteOption = (custName, option_name) => {
    const idx = state.custumization_arr.findIndex(
      ele =>
        custName.trim().toLowerCase() ===
        ele.custumization_name.trim().toLowerCase()
    );
    let arr = state.custumization_arr;
    arr[idx].options = [
      ...arr[idx].options.filter(
        ele =>
          ele.option.trim().toLowerCase() !== option_name.trim().toLowerCase()
      )
    ];
    setState({
      ...state,
      custumization_arr: [...arr]
    });
  };

  return (
    <div>
      <div
        style={{
          width: "80%",
          margin: "20px auto",
          padding: "12px 15px 50px 15px"
        }}
        className={classes.section}
      >
        <Typography
          style={{ margin: "10px", textDecoration: "underline" }}
          variant="h6"
        >
          Add a buffet package
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="package_name" className={classes.paper}>
              Package name :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              id="package_name"
              value={state.package_name}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Enter a the buffet package name"
            />
          </Grid>
          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="package_price" className={classes.paper}>
              Package price :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              id="package_price"
              style={{ width: "30%" }}
              type="number"
              value={state.package_price}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Buffet package net price"
            />
          </Grid>

          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="package_desc" className={classes.paper}>
              Package Description :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <textarea
              id="package_desc"
              value={state.package_desc}
              onChange={handleChange}
              className={classes.textField}
              placeholder="Package description eg. Availabilty etc."
            ></textarea>
          </Grid>
        </Grid>
        <Grid
          container
          style={{ margin: "16px auto" }}
          // spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12}>
            <AlertWindow />
          </Grid>
        </Grid>

        <Grid
          style={{ padding: "15px", margin: "24px 8px" }}
          className={classes.section}
          item
          md={11}
        >
          <p>Add custumizations</p>
          <input
            id="custumization"
            value={state.custumization}
            onChange={handleChange}
            type="text"
            style={{ marginBottom: "10px" }}
            className={classes.textField}
            placeholder="Name of custumization"
          />

          <input
            id="custum_type"
            value={state.custum_type}
            onChange={handleChange}
            type="number"
            style={{ marginBottom: "10px" }}
            className={classes.textField}
            placeholder="No. of options that can be selected"
          />
          <div style={{ marginBottom: "50px" }}>
            <Button
              onClick={addCustum}
              style={{ float: "right" }}
              variant="outlined"
            >
              Add
              <i
                style={{ margin: "4px", fontSize: "20px" }}
                className="fas fa-plus-circle"
              ></i>
            </Button>
          </div>

          {state.custumization_arr.map((cust, idx) => (
            <OptionForm
              key={idx}
              currency="RS"
              custumization_name={cust.custumization_name}
              custum_type={cust.custum_type}
              options={cust.options}
              deleteCustum={deleteCustum}
              addOption={addOption}
              deleteOption={deleteOption}
            />
          ))}
        </Grid>

        <div>
          <Button
            onClick={addPackageToState}
            className={classes.nextBtn}
            style={{ float: "right" }}
            color="primary"
            variant="contained"
          >
            Add
            <i style={{ margin: "4px" }} className="fas fa-plus-circle"></i>
          </Button>
        </div>
      </div>

      {props.menu.map((pack, idx) => (
        <Package
          key={idx}
          type={props.type}
          package={pack}
          addItemToPack={props.addItemToPack}
          deletePackFromState={props.deletePackFromState}
          deleteItemFromPack={props.deleteItemFromPack}
        />
      ))}
    </div>
  );
};
