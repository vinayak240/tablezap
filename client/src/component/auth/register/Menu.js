import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Badge, Collapse, Card, ButtonBase } from "@material-ui/core";
import item_img from "../../../img/food.png";
import wine_img from "../../../img/wine.png";
import icon_veg from "../../../img/veg.png";
import icon_egg from "../../../img/egg.png";
import icon_non_veg from "../../../img/non_veg.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import AlertWindow from "../../layout/Alert";
import { setAlert } from "../../../redux/actions/alert";
import { useDispatch } from "react-redux";
import CloseRounded from "@material-ui/icons/CloseRounded";
import ImageUploader from "../../layout/ImageUploader";

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
    item_price,
    currency,
    item_desc,
    food_type,
    custumization_arr
  } = props.item;
  const [state, setState] = React.useState({
    show: false,
    cust_show: false
  });

  const toggleShow = () => {
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
          {props.item.item_img && props.item.item_img.src ? (
            // <div
            //   style={{
            //     padding: "20px",
            //     border: "1px solid lightgray",
            //     borderRadius: "5px"
            //   }}
            // >
            <img
              src={props.item.item_img.src}
              alt={props.item.item_name}
              style={{
                width: "110px",
                height: "110px",
                border: "1px solid lightgray",
                borderRadius: "4px",
                padding: "2px"
              }}
            />
          ) : // </div>
          props.type === "bar" ? (
            <img
              src={wine_img}
              alt={props.item.item_name}
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
              alt={props.item.item_name}
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
                backgroundColor: "#b8f2ab",
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
              {`${currency}.  ${item_price}`}{" "}
            </span>
            <Button
              onClick={() => props.deleteItemFromState(item_name)}
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
        {custumization_arr.length !== 0 && (
          <Grid className={classes.section} item xs={12}>
            <div style={{ width: "100%" }}>
              <p
                style={{
                  margin: `5px 8px  ${state.show ? "16px" : "0px"} 8px`
                }}
                onClick={toggleShow}
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
                  className={`fas fa-sort-${state.show ? "up" : "down"}`}
                ></i>
              </p>

              <Collapse in={state.show}>
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
                    <p
                      style={{
                        margin: `0px 8px  ${
                          state.cust_show ? "16px" : "0px"
                        } 8px`
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
                          >{`${currency}. ${opt.option_price}`}</span>
                        </span>
                      ))}
                    </Collapse>
                  </div>
                ))}
              </Collapse>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

//FRemove Item Image property
const ItemForm = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    item_name: "",
    item_img: {},
    item_price: "",
    currency: "",
    item_desc: "",
    food_type: "",
    custumization: "",
    custum_type: "", //Is the no of options that can be selected in the custumization
    custumization_arr: [],
    item_show: false
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setState(state => ({
      ...state,
      item_name: "",
      item_price: "",
      item_img: {},
      currency: "",
      item_desc: "",
      food_type: "",
      custumization: "",
      custum_type: "",
      custumization_arr: [],
      item_show: true
    }));
  }, [props.category.items]);

  const toggleItems = () => {
    setState({
      ...state,
      item_show: !state.item_show
    });
  };
  const addItem = () => {
    const {
      item_name,
      item_price,
      item_img,
      currency,
      item_desc,
      food_type,
      custumization_arr
    } = state;
    const newItem = {
      item_name,
      item_img,
      item_price,
      currency,
      item_desc,
      food_type,
      custumization_arr
    };
    if (item_name) {
      const flag = props.category.items.find(
        ele => ele.item_name.toLowerCase() === newItem.item_name.toLowerCase()
      );
      flag &&
        dispatch(
          setAlert("This item name is already used in this category", "error")
        );
      !flag && props.addItemToCat(props.category.category_name, newItem);
    }
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

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const deleteItemFromState = item_name => {
    props.deleteItemFromState(props.category.category_name, item_name);
  };

  const addImage = payload => {
    // console.log("here payload", payload);

    setState({
      ...state,
      item_img: { ...payload }
    });
  };

  const deleteImg = (id, name) => {
    setState({
      ...state,
      item_img: {}
    });
  };

  function isObjEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  return (
    <div
      style={{
        width: "88%",
        margin: "50px auto",
        padding: "8px 30px 30px 30px"
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
            className="fas fa-clipboard-list"
          ></i>
          {props.category.category_name}
          <Button
            onClick={() =>
              props.deleteCatFromState(props.category.category_name)
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
        </span>
      </Typography>
      <ExpansionPanel
        style={{
          width: "84%",
          margin: "auto",
          padding: "0px",
          marginTop: "28px"
        }}
        className={classes.section}
      >
        <ExpansionPanelSummary
          expandIcon={
            <i
              style={{ margin: "8px", fontSize: "22px", float: "right" }}
              className="fas fa-sort-down"
            ></i>
          }
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography
            style={{
              margin: "10px",
              textDecoration: "none",
              textAlign: "center"
            }}
            variant="h6"
          >
            <i
              style={{ margin: "8px", fontSize: "25px" }}
              className="fas fa-plus-circle"
            ></i>
            Add a item
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item md={11}>
              <ImageUploader
                imgList={isObjEmpty(state.item_img) ? [] : [state.item_img]}
                multiple={false}
                show={true}
                upload={addImage}
                deleteImg={deleteImg}
              />
            </Grid>
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
              <Grid container justify="flex-start" spacing={3}>
                <Grid item xs={2}>
                  <select
                    id="currency"
                    value={state.currency}
                    onChange={handleChange}
                    className={classes.textField}
                    placeholder="Currency"
                  >
                    <option>- -</option>
                    <option value="RS">RS</option>
                    <option value="$">$</option>
                  </select>
                </Grid>

                <Grid item xs={4}>
                  <input
                    id="item_price"
                    value={state.item_price}
                    onChange={handleChange}
                    type="number"
                    className={classes.textField}
                    placeholder="Item price"
                  />
                </Grid>
              </Grid>
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

            {/* Add custumization Form Here! */}
            <Grid
              style={{ padding: "15px" }}
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
                  currency={state.currency}
                  custumization_name={cust.custumization_name}
                  custum_type={cust.custum_type}
                  options={cust.options}
                  deleteCustum={deleteCustum}
                  addOption={addOption}
                  deleteOption={deleteOption}
                />
              ))}
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
        </ExpansionPanelDetails>
      </ExpansionPanel>

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
          onClick={toggleItems}
          style={{ margin: "15px" }}
          variant="h5"
        >
          <Badge
            badgeContent={
              props.category.items.length === 0
                ? "0"
                : props.category.items.length
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
          {props.category.items.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              type={props.type}
              deleteItemFromState={deleteItemFromState}
            />
          ))}
        </Collapse>
      </Card>
    </div>
  );
};

const Menu = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    category: ""
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setState(state => ({
      ...state,
      category: ""
    }));
  }, [props.menu]);

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
    });
  };

  const addItemToCat = (cat_name, newItem) => {
    props.addItemToCat(props.type, cat_name, newItem);
  };

  const deleteItemFromState = (cat_name, item_name) => {
    props.deleteItemFromState(props.type, cat_name, item_name);
  };

  const addCat = () => {
    const newCat = { category_name: state.category, items: [] };
    const flag = props.menu.find(
      ele =>
        ele.category_name.toLowerCase() === newCat.category_name.toLowerCase()
    );
    const flag1 = newCat.category_name.trim() === "";
    flag && dispatch(setAlert("Category name is already used!", "error", 2000));
    flag1 &&
      dispatch(
        setAlert("Category name is Should not be empty!", "error", 2000)
      );
    !flag && !flag1 && props.addCatToState(props.type, newCat);
  };

  const deleteCatFromState = cat_name => {
    props.deleteCatFromState(props.type, cat_name);
  };

  return (
    <div style={{ border: "none" }} className={classes.section}>
      <Grid container justify="center" alignItems="center">
        <Grid container item md={6} justify="flex-end">
          <input
            id="category"
            value={state.category}
            onChange={handleChange}
            className={classes.textField}
            placeholder="Add a new food category"
          />
        </Grid>
        <Grid container item md={2} justify="flex-start">
          <Button
            onClick={addCat}
            className={classes.nextBtn}
            variant="contained"
            color="primary"
          >
            Add +
          </Button>
        </Grid>
        <Grid style={{ marginTop: "10px" }} item md={12}>
          <AlertWindow />
        </Grid>
      </Grid>

      {props.menu.map((cat, idx) => (
        <ItemForm
          key={idx}
          type={props.type}
          category={cat}
          addItemToCat={addItemToCat}
          deleteCatFromState={deleteCatFromState}
          deleteItemFromState={deleteItemFromState}
        />
      ))}
    </div>
  );
};

export default Menu;
