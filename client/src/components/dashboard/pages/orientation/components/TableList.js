import React from "react";
import { Grid } from "@material-ui/core";
import Table from "../components/Table";

const TableList = (props) => {
  return (
    <Grid
      container
      style={{ marginTop: "18px" }}
      spacing={4}
      direction="row"
      alignItems="start"
      justify="flex-start"
    >
      {props.tables.map((table, idx) => (
        <Grid key={idx} item xs={12} sm={12} md={6}>
          <Table
            rest_id={props.rest_id}
            table={table}
            updateTable={props.updateTable}
            deleteTable={props.deleteTable}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TableList;
