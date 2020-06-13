import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "./Menu";
import { BuffetMenu } from "./BuffetMenu";

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
  show: {
    textAlign: "right",
    color: "#4070FF",
    width: "80%",
    margin: "8px",
    fontSize: "0.9rem"
  }
}));

const MenuForm = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    tab: 0, //its the number of tabs - 1
    category: "",
    food: [],
    bar: [],
    buffet: []
  });

  const handleTab = (evt, newValue) => {
    setState({
      ...state,
      tab: newValue
    });
  };

  const addCatToState = (type, newCat) => {
    setState({
      ...state,
      [type]: [...state[type], newCat]
    });
  };

  const addItemToCat = (type, cat_name, newItem) => {
    let new_menu = state[type];
    let idx = new_menu.findIndex(
      ele =>
        ele.category_name.trim().toLowerCase() === cat_name.trim().toLowerCase()
    );
    new_menu[idx].items = [...new_menu[idx].items, newItem];

    setState({
      ...state,
      [type]: [...new_menu]
    });
  };
  const addItemToPack = (type, package_name, newItem) => {
    let new_menu = state[type];
    let idx = new_menu.findIndex(
      ele =>
        ele.package_name.trim().toLowerCase() ===
        package_name.trim().toLowerCase()
    );
    new_menu[idx].items = [...new_menu[idx].items, newItem];

    setState({
      ...state,
      [type]: [...new_menu]
    });
  };

  const deleteCatFromState = (type, cat_name) => {
    setState({
      ...state,
      [type]: [
        ...state[type].filter(
          ele =>
            ele.category_name.trim().toLowerCase() !==
            cat_name.trim().toLowerCase()
        )
      ]
    });
  };

  const deletePackFromState = (type, package_name) => {
    setState({
      ...state,
      [type]: [
        ...state[type].filter(
          ele =>
            ele.package_name.trim().toLowerCase() !==
            package_name.trim().toLowerCase()
        )
      ]
    });
  };

  const deleteItemFromState = (type, cat_name, item_name) => {
    let new_menu = state[type];
    let idx = new_menu.findIndex(
      ele =>
        ele.category_name.trim().toLowerCase() === cat_name.trim().toLowerCase()
    );
    new_menu[idx].items = [
      ...new_menu[idx].items.filter(
        ele =>
          ele.item_name.trim().toLowerCase() !== item_name.trim().toLowerCase()
      )
    ];

    setState({
      ...state,
      [type]: [...new_menu]
    });
  };

  const deleteItemFromPack = (type, package_name, item_name) => {
    let new_menu = state[type];
    let idx = new_menu.findIndex(
      ele =>
        ele.package_name.trim().toLowerCase() ===
        package_name.trim().toLowerCase()
    );
    new_menu[idx].items = [
      ...new_menu[idx].items.filter(
        ele =>
          ele.item_name.trim().toLowerCase() !== item_name.trim().toLowerCase()
      )
    ];

    setState({
      ...state,
      [type]: [...new_menu]
    });
  };
  const getMenu = tab => {
    switch (tab) {
      case 0:
        return (
          <Menu
            type="food"
            menu={state.food}
            addCatToState={addCatToState}
            addItemToCat={addItemToCat}
            deleteCatFromState={deleteCatFromState}
            deleteItemFromState={deleteItemFromState}
          />
        );
      case 1:
        return (
          <Menu
            type="bar"
            menu={state.bar}
            addCatToState={addCatToState}
            addItemToCat={addItemToCat}
            deleteCatFromState={deleteCatFromState}
            deleteItemFromState={deleteItemFromState}
          />
        );
      case 2:
        return (
          <BuffetMenu
            type="buffet"
            menu={state.buffet}
            addPackToState={addCatToState}
            addItemToPack={addItemToPack}
            deletePackFromState={deletePackFromState}
            deleteItemFromPack={deleteItemFromPack}
          />
        );

      default:
        return <></>;
    }
  };

  const handleNext = () => {
    let menu = { food: state.food, bar: state.bar, buffet: state.buffet };
    let data = { menu };

    props.handleNext(data);
  };

  return (
    <div className={classes.root}>
      <div>
        <Tabs
          value={state.tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTab}
          aria-label="tabs"
          centered
        >
          <Tab
            label={`Food menu${
              props.formData.dine_type === "2" ||
              props.formData.dine_type === "4"
                ? "(Not available)"
                : ""
            }`}
            disabled={
              props.formData.dine_type === "2" ||
              props.formData.dine_type === "4"
            }
          />

          <Tab
            label={`Bar menu${
              props.formData.is_alcohol === "false" ? "(Not available)" : ""
            }`}
            disabled={props.formData.is_alcohol === "false"}
          />

          <Tab
            label={`Buffet menu${
              props.formData.dine_type === "1" ||
              props.formData.dine_type === "4"
                ? "(Not available)"
                : ""
            }`}
            disabled={
              props.formData.dine_type === "1" ||
              props.formData.dine_type === "4"
            }
          />
        </Tabs>
      </div>

      {getMenu(state.tab)}

      <div className={classes.btnGroup}>
        <Button
          disabled={props.step === 0}
          onClick={props.handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        {/* here submit and ur info will be upward transmitted (via prop func) into the state od Register comp!! */}
        <Button
          variant="contained"
          className={classes.nextBtn}
          color="primary"
          onClick={handleNext}
        >
          Next
          <ArrowRightAlt />
        </Button>
      </div>
    </div>
  );
};

export default MenuForm;
