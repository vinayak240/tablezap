import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery, Button } from "@material-ui/core";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import useStyles, { useFirebaseBtnStyles } from "../styles/main";

const CategoryForm = (props) => {
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
    category_name: "",
    type: "category",
  });

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value,
    });
  };

  const addCat = () => {
    const { category_name: name, type } = state;
    if (name !== "") {
      setState({
        ...state,
        category_name: "",
        type: "category",
      });

      props.addCat(name, type);
    }
  };

  return (
    <div>
      <DialogTitle>
        <Typography className={classes.cardTitle} style={{ margin: "12px" }}>
          Add New Category
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
          <select
            id="type"
            style={{ marginBottom: "10px" }}
            value={state.type}
            onChange={handleChange}
            className={classes.textField}
            placeholder="Type"
          >
            <option value="category">Category</option>
            <option value="sub_menu">Sub Menu</option>
          </select>
        </div>
      </DialogContent>
      <DialogActions>
        <div className={gutterStyles.parent}>
          <Button variant="default" color="primary" onClick={props.handleClose}>
            <span style={{ fontWeight: "bold" }}>Cancel</span>
          </Button>
          <Button
            style={{ margin: "10px", fontWeight: "bold" }}
            classes={styles}
            variant={"contained"}
            color={"primary"}
            onClick={addCat}
          >
            <i style={{ margin: "6px" }} className="fas fa-save"></i>
            Save Changes
          </Button>
        </div>
      </DialogActions>
    </div>
  );
};

export default CategoryForm;
