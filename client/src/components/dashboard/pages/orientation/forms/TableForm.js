import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import useStyles, { useFirebaseBtnStyles } from "../styles/main";

const TableForm = (props) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();

  const [state, setState] = React.useState({
    table_id: (props.table && props.table.table_id) || "",
    n_seats: (props.table && props.table.n_seats) || "",
  });

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value,
    });
  };

  const updateTable = () => {
    const { table_id, n_seats } = state;
    const newTable = { table_id, n_seats };

    props.updateTable(newTable);
  };

  return (
    <div>
      <DialogTitle>
        <span className={classes.cardTitle}>
          <i style={{ margin: "8px" }} className="fas fa-edit"></i>
          {props.isEdit ? "Edit Table" : "Add Table"}
        </span>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <input
              id="table_id"
              value={state.table_id}
              onChange={handleChange}
              style={{ width: "97%" }}
              className={classes.textField}
              placeholder="Table ID"
            />
          </Grid>

          <Grid item xs={12}>
            <input
              id="n_seats"
              value={state.n_seats}
              onChange={handleChange}
              style={{ width: "97%" }}
              className={classes.textField}
              placeholder="No. of seats in this Table"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className={gutterStyles.parent}>
        <Button
          variant="default"
          color="primary"
          onClick={props.handleDialogClose}
        >
          <span style={{ fontWeight: "bold" }}>Cancel</span>
        </Button>
        <Button
          style={{ margin: "10px", fontWeight: "bold" }}
          classes={styles}
          variant={"contained"}
          color={"primary"}
          onClick={updateTable}
        >
          <i style={{ margin: "6px" }} className="fas fa-save"></i>
          {props.isEdit ? "Save Changes" : "Add Table"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default TableForm;
