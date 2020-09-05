import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import { Alert, AlertTitle } from "@material-ui/lab";
import table_img from "../../../img/table.png";
import room_img from "../../../img/door.png";
// import ImageUploader from "../../layout/ImageUploader";
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
    // fontWeight:'bold',
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
    padding: "10px",
    minWidth: "150px"
  },
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "20px",
    marginTop: "15px"
  },
  nextBtn: {
    backgroundColor: "#4070FF",
    color: "white"
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

const Table = props => {
  const classes = useStyles();

  return (
    <div
      style={{ textAlign: "center", padding: "10px 20px" }}
      className={classes.section}
    >
      <div
        style={{
          color: "#756e6e",
          fontWeight: "bold",
          float: "right"
        }}
      >
        <i
          className="fas fa-times-circle"
          onClick={() => props.deleteTable(props.table_id)}
        ></i>
      </div>
      <p style={{ paddingTop: "20px" }}>
        <span
          style={{
            padding: "5px 20px ",
            backgroundColor: "#F7F7F7",
            color: "#756e6e",
            borderRadius: "5px",
            fontWeight: "bold"
          }}
        >
          {props.table_id}
        </span>
      </p>
      <img
        style={{
          margin: "auto",
          display: "block",
          width: "100px",
          height: "100px"
        }}
        src={table_img}
        alt="Table"
      />
      <p>
        <span
          style={{
            padding: "5px 20px ",
            backgroundColor: "#F7F7F7",
            color: "#756e6e",
            borderRadius: "5px",
            fontWeight: "bold"
          }}
        >
          {props.n_seats} seats
        </span>
      </p>
    </div>
  );
};

const AddTable = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    table_id: "",
    n_seats: ""
  });
  useEffect(() => {
    setState({
      table_id: "",
      n_seats: ""
    });
  }, [props.tables]);

  const addTable = () => {
    if (state.table_id.trim() !== "" && state.n_seats !== "") {
      props.addTable({ ...state });
    }
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

  return (
    <div
      className={classes.section}
      style={{ paddingBottom: "60px", marginTop: "30px" }}
    >
      <Typography
        style={{ margin: "10px", textDecoration: "underline" }}
        variant="h6"
      >
        Add restaurant tables
      </Typography>

      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid container item xs={3} justify="flex-start">
          <label htmlFor="table_id" className={classes.paper}>
            Table ID :{" "}
          </label>
        </Grid>

        <Grid item xs={9}>
          <input
            id="table_id"
            type="text"
            placeholder="Enter the table number/ID"
            value={state.table_id}
            onChange={handleChange}
            className={classes.textField}
          />
        </Grid>

        <Grid container item xs={3} justify="flex-start">
          <label htmlFor="n_seats" className={classes.paper}>
            No. of seats:{" "}
          </label>
        </Grid>

        <Grid item xs={9}>
          <input
            id="n_seats"
            type="number"
            placeholder="Exact number"
            style={{ width: "20%" }}
            value={state.n_seats}
            onChange={handleChange}
            className={classes.textField}
          />
        </Grid>
      </Grid>
      <div>
        <Button
          onClick={addTable}
          className={classes.nextBtn}
          style={{ float: "right" }}
          color="primary"
          variant="contained"
        >
          Add
        </Button>
      </div>

      {props.tables.length !== 0 && (
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ border: "none" }}
          className={classes.section}
        >
          {/* Tables here */}
          {props.tables.map(table => (
            <Grid item xs={2}>
              {" "}
              <Table
                table_id={table.table_id}
                n_seats={table.n_seats}
                deleteTable={props.deleteTable}
              />{" "}
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

const RestForm = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    service_type: "",
    n_tables: "",
    tables: []
  });

  const handleChange = evt => {
    const id = evt.target.id;
    const val = evt.target.value;
    // console.log((id));

    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  };

  const addTable = table => {
    setState({
      ...state,
      tables: [...state.tables, table]
    });
  };

  const deleteTable = table_id => {
    setState({
      ...state,
      tables: [
        ...state.tables.filter(ele => ele.table_id.trim() !== table_id.trim())
      ]
    });
  };

  const handleNext = () => {
    let orientation = { ...state };
    orientation.n_tables = orientation.tables.length;
    let data = { orientation };

    props.handleNext(data);
  };

  return (
    <div className={classes.section}>
      <Typography
        style={{ margin: "10px", textDecoration: "underline" }}
        variant="h6"
      >
        Restaurant orientation
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid container item xs={3} justify="flex-start">
          <label htmlFor="service_type" className={classes.paper}>
            Service type :{" "}
          </label>
        </Grid>

        <Grid item xs={9}>
          <select
            id="service_type"
            name="service_type"
            value={state.service_type}
            onChange={handleChange}
            className={classes.textField}
          >
            <option>--Type--</option>
            <option value={1}>Self-service without table</option>
            <option value={2}>Self-service with table</option>
            <option value={3}>With service available to tables</option>
          </select>
        </Grid>
      </Grid>

      {state.service_type !== "" && state.service_type === "2" && (
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid container item xs={3} justify="flex-start">
            <label htmlFor="n_tables" className={classes.paper}>
              No. of tables :{" "}
            </label>
          </Grid>

          <Grid item xs={9}>
            <input
              id="n_tables"
              type="number"
              placeholder="Exact number.."
              style={{ width: "20%" }}
              value={state.n_tables}
              onChange={handleChange}
              className={classes.textField}
            />
          </Grid>
        </Grid>
      )}
      {state.service_type !== "" && state.service_type === "3" && (
        <AddTable
          tables={state.tables}
          addTable={addTable}
          deleteTable={deleteTable}
        />
      )}
      {/* <ImageUploader multiple={true} show={true} /> */}

      <div className={classes.btnGroup}>
        <Button
          disabled={props.step === 0}
          onClick={props.handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        {/* here submit and ur info will be upward transmitted (via prop func) into the state to Register comp!! */}
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

const Room = props => {
  const classes = useStyles();

  return (
    <div
      style={{ textAlign: "center", padding: "10px 20px" }}
      className={classes.section}
    >
      <div
        style={{
          color: "#756e6e",
          fontWeight: "bold",
          float: "right"
        }}
      >
        <i
          className="fas fa-times-circle"
          onClick={() => props.deleteRoom(props.room_id)}
        ></i>
      </div>
      <p style={{ paddingTop: "10px" }}></p>
      <img
        style={{
          margin: "auto",
          display: "block",
          width: "100px",
          height: "100px"
        }}
        src={room_img}
        alt="Room"
      />
      <p>
        <span
          style={{
            padding: "5px 20px ",
            backgroundColor: "#FECE5C",
            color: "#A05A4B",
            borderRadius: "5px",
            fontWeight: "bold"
          }}
        >
          {props.room_id}
        </span>
      </p>
    </div>
  );
};

const LodgeForm = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    room_id: "",
    rooms: []
  });

  useEffect(() => {
    setState(state => ({
      ...state,
      room_id: ""
    }));
  }, [state.rooms]);

  const handleChange = evt => {
    const id = evt.target.id;
    const val = evt.target.value;
    // console.log((id));

    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  };

  const addRoom = () => {
    if (state.room_id.trim() !== "") {
      setState({
        ...state,
        rooms: [...state.rooms, state.room_id]
      });
    }
  };

  const deleteRoom = room_id => {
    setState({
      ...state,
      rooms: [...state.rooms.filter(id => id.trim() !== room_id.trim())]
    });
  };

  const handleNext = () => {
    let orientation = { rooms: state.rooms };
    let data = { orientation };

    props.handleNext(data);
  };

  return (
    <div className={classes.section}>
      <Typography
        style={{ margin: "10px", textDecoration: "underline" }}
        variant="h6"
      >
        Lodge rooms orientation
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid container item xs={3} justify="flex-start">
          <label htmlFor="room_id" className={classes.paper}>
            Add a room :{" "}
          </label>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <input
                id="room_id"
                value={state.room_id}
                onChange={handleChange}
                className={classes.textField}
                placeholder="Enter room name/ID"
              />
            </Grid>
            <Grid item md={2}>
              <Button
                className={classes.nextBtn}
                onClick={addRoom}
                variant="contained"
                color="primary"
              >
                Add +
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {state.rooms.length !== 0 && (
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ border: "none" }}
          className={classes.section}
        >
          {/* Rooms here */}
          {state.rooms.map(room_id => (
            <Grid item xs={2}>
              {" "}
              <Room room_id={room_id} deleteRoom={deleteRoom} />{" "}
            </Grid>
          ))}
        </Grid>
      )}
      <div className={classes.btnGroup}>
        <Button
          disabled={props.step === 0}
          onClick={props.handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        {/* here submit and ur info will be upward transmitted (via prop func) into the state to Register comp!! */}
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

const MallForm = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    mall_id: "",
    is_verified: false,
    service_type: "",
    n_tables: "",
    tables: []
  });

  const handleChange = evt => {
    const id = evt.target.id;
    const val = evt.target.value;
    // console.log((id));

    setState(prevState => ({
      ...prevState,
      [id]: val
    }));
  };

  const handleVerify = () => {
    setState({
      ...state,
      is_verified: true
    });
  };
  const addTable = table => {
    setState({
      ...state,
      tables: [...state.tables, table]
    });
  };

  const deleteTable = table_id => {
    setState({
      ...state,
      tables: [
        ...state.tables.filter(ele => ele.table_id.trim() !== table_id.trim())
      ]
    });
  };

  const handleNext = () => {
    let orientation = {
      is_verified: state.is_verified,
      service_type: state.is_verified,
      n_tables: state.n_tables
    };
    let data = { orientation };

    props.handleNext(data);
  };

  return (
    <div className={classes.section}>
      <Typography
        style={{ margin: "10px", textDecoration: "underline" }}
        variant="h6"
      >
        Restaurant orientation
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid container item xs={3} justify="flex-start">
          <label htmlFor="mall_id" className={classes.paper}>
            Mall ID :{" "}
          </label>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <input
                id="mall_id"
                value={state.mall_id}
                onChange={handleChange}
                className={classes.textField}
                placeholder="Enter the correct mall ID"
              />
            </Grid>
            <Grid item md={2}>
              <Button
                className={classes.nextBtn}
                onClick={handleVerify}
                variant="contained"
                color="primary"
              >
                Verify
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {state.is_verified && (
        <>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            {" "}
            <Grid container item xs={3} justify="flex-start">
              <label htmlFor="service_type" className={classes.paper}>
                Service type :{" "}
              </label>
            </Grid>
            <Grid item xs={9}>
              <select
                id="service_type"
                name="service_type"
                style={{ width: "30%" }}
                value={state.service_type}
                onChange={handleChange}
                className={classes.textField}
              >
                <option>--Type--</option>
                <option value={1}>Self-service without table</option>
                <option value={2}>Self-service with table</option>
                <option value={3}>With service available to tables</option>
              </select>
            </Grid>
          </Grid>
          {state.service_type !== "" && state.service_type === "2" && (
            <Grid
              container
              spacing={2}
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid container item xs={3} justify="flex-start">
                <label htmlFor="n_tables" className={classes.paper}>
                  No. of tables :{" "}
                </label>
              </Grid>

              <Grid item xs={9}>
                <input
                  id="n_tables"
                  type="number"
                  placeholder="Exact number.."
                  style={{ width: "15%" }}
                  value={state.n_tables}
                  onChange={handleChange}
                  className={classes.textField}
                />
              </Grid>
            </Grid>
          )}
          {state.service_type !== "" && state.service_type === "3" && (
            <AddTable
              tables={state.tables}
              addTable={addTable}
              deleteTable={deleteTable}
            />
          )}
        </>
      )}

      <div className={classes.btnGroup}>
        <Button
          disabled={props.step === 0}
          onClick={props.handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        {/* here submit and ur info will be upward transmitted (via prop func) into the state to Register comp!! */}
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

const TableForm = props => {
  const classes = useStyles();
  const getForm = rest_type => {
    switch (rest_type) {
      case "1":
        return <RestForm {...props} />;
      case "2":
        return <LodgeForm {...props} />;
      case "3":
        return <MallForm {...props} />;
      default:
        return (
          <div className={classes.btnGroup}>
            <Button
              disabled={props.step === 0}
              onClick={props.handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            {/* here submit and ur info will be upward transmitted (via prop func) into the state to Register comp!! */}
          </div>
        );
    }
  };

  return (
    <div className={classes.root}>
      <Alert severity="info">
        <AlertTitle>Note</AlertTitle>
        1. The form that shows up here is based on the "Establishment type" you
        selected in the form in Step 2.<br></br>2. If the form does not appear
        please select the "Establishment type" in Step 2.
      </Alert>
      {getForm(props.formData.rest_type)}
    </div>
  );
};

export default TableForm;
