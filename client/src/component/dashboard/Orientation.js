import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import {
  makeStyles,
  Card,
  Grid,
  FormControlLabel,
  withStyles,
  Button,
  Switch,
  Tooltip,
  useMediaQuery
} from "@material-ui/core";
import MaterialMenu from "@material-ui/core/Menu";
import { deepPurple } from "@material-ui/core/colors";
import Logo from "../logos/Logo";
import QRCode from "qrcode.react";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import FbSpinner from "../layout/FbSpinner";

const useFirebaseBtnStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    borderRadius: 8
  },
  text: {
    paddingLeft: 16,
    paddingRight: 16
  },
  contained: {
    boxShadow: "none",
    "&:active": {
      boxShadow: shadows[0]
    }
  },
  containedPrimary: {
    backgroundColor: "#039be5",
    color: palette.common.white,
    "&:hover": {
      backgroundColor: "#0388ca",
      boxShadow: "none",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "#0388ca"
      }
    }
  },
  label: {
    textTransform: "none",
    letterSpacing: "0.5px",
    fontWeight: "bold"
  }
}));

const PurpleSwitch = withStyles({
  switchBase: {
    color: deepPurple[300],
    "&$checked": {
      color: deepPurple[500]
    },
    "&$checked + $track": {
      backgroundColor: deepPurple[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

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
      borderColor: "#7CB2F1"
    }
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
    color: "#756e6e",
    fontWeight: "bold",
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
  },
  menuItem: {
    width: "150px",
    padding: "6px 16px",
    fontWeight: "bold",
    textAlign: "left"
  },
  pageTitle: {
    fontSize: "1.8rem",
    color: "#122740",
    textAlign: "center",
    marginBottom: "5px",
    fontWeight: "bolder"
  },
  breadCrumb: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "60px"
  },
  textField: {
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "80%",
    margin: "auto",
    padding: "10px",
    fontWeight: "bold"
  }
}));

function PaperComponent(props) {
  return <Paper style={{ borderRadius: "12px", padding: "12px" }} {...props} />;
}

const TableForm = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();

  const [state, setState] = React.useState({
    table_id: (props.table && props.table.table_id) || "",
    n_seats: (props.table && props.table.n_seats) || ""
  });

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.id]: evt.target.value
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

const Table = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const matchesQrDim = useMediaQuery("(max-width:500px)");
  const gutterStyles = usePushingGutterStyles();

  const [state, setState] = React.useState({
    dialog_open: false,
    anchorEl: null,
    dialog2_open: false,
    status: true
  });

  const downloadQR = table_id => {
    const canvas = document.getElementById(table_id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${table_id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDialogOpen = content => {
    setState({
      ...state,
      [content]: true,
      anchorEl: null
    });
  };

  const handleDialogClose = content => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false
    });
  };

  const handleClick = event => {
    setState({
      ...state,
      anchorEl: event.currentTarget
    });
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.name]: evt.target.checked
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  const updateTable = newTable => {
    setState({
      ...state,
      dialog_open: false
    });
    props.updateTable(newTable, props.table.table_id);
  };

  const deleteTable = () => {
    setState({
      ...state,
      dialog2_open: false
    });
    props.deleteTable(props.table.table_id);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        textAlign: "center",
        width: "80%"
        // height: "450px"
      }}
      className={classes.card}
    >
      <div>
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog_open}
          fullWidth={true}
          maxWidth={"sm"}
          scroll="body"
          onClose={() => handleDialogClose("dialog_open")}
          PaperComponent={PaperComponent}
        >
          <TableForm
            table={props.table ? props.table : {}}
            isEdit={true}
            handleDialogClose={() => handleDialogClose("dialog_open")}
            updateTable={updateTable}
          />
        </Dialog>
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog2_open}
          fullWidth={true}
          maxWidth={"xs"}
          scroll="body"
          onClose={() => handleDialogClose("dialog2_open")}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            <span className={classes.cardTitle}>
              <i
                style={{ margin: "8px" }}
                className="fas fa-exclamation-triangle"
              ></i>
              Confirmation
            </span>
          </DialogTitle>

          <DialogContent>
            <Typography className={classes.cardDesc}>
              Do yo really want to delete the table "{props.table.table_id}" ?
            </Typography>
          </DialogContent>

          <DialogActions className={gutterStyles.parent}>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={deleteTable}
            >
              Yes
            </Button>
            <Button
              style={{ margin: "10px", fontWeight: "bold" }}
              classes={styles}
              variant={"contained"}
              color={"primary"}
              onClick={() => handleDialogClose("dialog2_open")}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <i
          aria-controls="simple-menu"
          aria-haspopup="true"
          style={{ float: "right", fontSize: "17px" }}
          className="fas fa-ellipsis-v"
          onClick={handleClick}
        ></i>
        <MaterialMenu
          id="simple-menu"
          // className={classes.materialMenu}
          // style={{ backgroundColor: "white" }}
          anchorEl={state.anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(state.anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            className={classes.menuItem}
            // onClick={handleClose}
          >
            <FormControlLabel
              style={{ fontWeight: "bold" }}
              control={
                <PurpleSwitch
                  checked={state.status}
                  onChange={handleChange}
                  name="status"
                />
              }
              label={
                <span style={{ fontWeight: "bold" }}>{`${
                  state.status ? "Online" : "Offline"
                }`}</span>
              }
            />
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => handleDialogOpen("dialog_open")}
          >
            <i style={{ margin: "8px" }} className="fas fa-pen"></i>
            Edit
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => handleDialogOpen("dialog2_open")}
          >
            <i style={{ margin: "8px" }} className="fas fa-trash-alt"></i>
            Delete
          </MenuItem>
        </MaterialMenu>
      </div>
      <div>
        <Logo width="100px" height="50px" />
      </div>
      <div>
        <QRCode
          id={props.table ? props.table.table_id : "no-id"}
          style={{
            padding: "4px",
            borderRadius: 8,
            border: "3px solid",
            borderLeftColor: "#736E60",
            borderRightColor: "#736E60",
            borderTopColor: "#F0CC03",
            borderBottomColor: "#F0CC03",
            margin: "16px 0"
          }}
          value={`${props.rest_id}/${props.table.table_id}`}
          size={matchesQrDim ? 150 : 200}
          level={"H"}
          includeMargin={true}
        />
      </div>
      <Typography style={{ textAlign: "center" }} className={classes.cardTitle}>
        {props.table.table_id ? props.table.table_id : " T-ID"}
      </Typography>
      <Typography className={classes.cardDesc}>
        {" "}
        {props.table && props.table.n_seats ? props.table.n_seats : " - seats"}
        {" seats"}
      </Typography>

      <div style={{ marginTop: "15px" }} className={gutterStyles.parent}>
        {/* <Button
          style={{ marginLeft: "10px", fontWeight: "bold" }}
          classes={styles}
          variant={"contained"}
          color={"primary"}
          onClick={() => handleDialogOpen("dialog_open")}
        >
          <i style={{ margin: "8px" }} className="fas fa-edit"></i>
          Edit
        </Button> */}

        <Button
          style={{ marginLeft: "10px", fontWeight: "bold" }}
          classes={styles}
          variant={"contained"}
          color={"primary"}
          onClick={() =>
            downloadQR(props.table ? props.table.table_id : "123456")
          }
        >
          <i style={{ margin: "8px" }} className="fas fa-download"></i>
          Download QR
        </Button>
      </div>
    </div>
  );
};

const TableList = props => {
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
        // <Fade
        //   in={true}
        //   style={{ transformOrigin: "0 0 0" }}
        //   {...(true ? { timeout: idx + 1000 } : {})}
        // >
        <Grid key={idx} item xs={12} sm={12} md={6}>
          <Table
            rest_id={props.rest_id}
            table={table}
            updateTable={props.updateTable}
            deleteTable={props.deleteTable}
          />
        </Grid>
        // </Fade>
      ))}
    </Grid>
  );
};

const Orientation = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const matchesSm = useMediaQuery(theme => theme.breakpoints.up("sm"));
  const gutterStyles = usePushingGutterStyles();
  const [state, setState] = React.useState({
    dialog_open: false,
    show_options: false,
    loading: false
  });

  useEffect(() => {
    if (props.isUpdated) {
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          loading: false
        }));
      }, 500);
    }
  }, [props.isUpdated]);

  //   const handleTab = (evt, newValue) => {
  //     setState({
  //       ...state,
  //       tab: newValue
  //     });
  //   };

  const handleDialogOpen = content => {
    setState({
      ...state,
      [content]: true,
      anchorEl: null
    });
  };

  const handleDialogClose = content => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false
    });
  };

  const handleMouseIn = () => {
    setState({
      ...state,
      show_options: true
    });
  };

  const handleMouseOut = () => {
    setState({
      ...state,
      show_options: false
    });
  };

  const addTable = newTable => {
    setState({
      ...state,
      dialog_open: false
    });

    props.addTable(newTable);
  };

  const upload = () => {
    setState({
      ...state,
      loading: true
    });
    props.upload("orientation");
  };

  return (
    <div>
      <div className="all_dialogs">
        <Dialog
          // Please Keep Dialogs Code outside any other modal like MenuItem, Menu, Another dialog etc.
          open={state.dialog_open}
          fullWidth={true}
          maxWidth={"sm"}
          scroll="body"
          onClose={() => handleDialogClose("dialog_open")}
          PaperComponent={PaperComponent}
        >
          <TableForm
            table={props.table ? props.table : {}}
            isEdit={false}
            handleDialogClose={() => handleDialogClose("dialog_open")}
            updateTable={addTable}
          />
        </Dialog>
      </div>
      <div className={classes.breadCrumb}>
        <div>
          {matchesSm && (
            <span>
              <span
                style={{
                  padding: "5px 10px ",
                  color: "#282C34",
                  borderRadius: "5px",
                  fontWeight: "bold"
                }}
              >
                Dashboard
              </span>

              <b>/</b>
              <span
                style={{
                  padding: "5px 10px ",
                  color: "#282C34",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  textDecoration: "underline"
                }}
              >
                Menu
              </span>
            </span>
          )}
        </div>
        <div>
          {!state.loading ? (
            <span
              style={{
                display: "inline-block",
                marginBottom: "10px"
              }}
              className={gutterStyles.parent}
            >
              <Button
                style={{ fontWeight: "bold", marginLeft: "10px" }}
                classes={styles}
                variant={"contained"}
                color={"primary"}
                disabled={!props.isEdited}
                onClick={upload}
              >
                <i style={{ margin: "6px" }} className="fas fa-upload"></i>
                Upload
              </Button>
              <Button
                variant="default"
                color="primary"
                onClick={props.clearChanges}
                disabled={!props.isEdited}
              >
                <span style={{ fontWeight: "bold" }}>Clear</span>
              </Button>
            </span>
          ) : (
            <span
              style={{
                fontWeight: "bold",
                color: "#0388CA",
                float: "right",
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center"
              }}
            >
              {" "}
              <FbSpinner /> <span style={{ margin: "5px" }}>
                Uploading...
              </span>{" "}
            </span>
          )}
        </div>
      </div>
      <Card
        className={classes.section}
        style={{
          minWidth: "350px",
          paddingBottom: "25px",
          borderRadius: "16px",
          marginTop: "10px"
        }}
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}
      >
        <div>
          <Typography className={classes.pageTitle}>
            <img
              style={{ width: "4rem", verticalAlign: "middle" }}
              alt="Table Icon"
              src="https://img.icons8.com/clouds/100/000000/qr-code.png"
              // src="https://img.icons8.com/plasticine/100/000000/qr-code.png"
            />
            <span> Tables </span>
            {/* <img
              style={{ width: "4rem", verticalAlign: "middle" }}
              src="https://img.icons8.com/clouds/100/000000/grid.png"
              alt="Table Icon"
            /> */}
            <span style={{ float: "right", marginRight: "20px" }}>
              <Tooltip title="Add Table" arrow>
                <button
                  style={{
                    margin: "0px 8px",
                    width: "50px",
                    border: "none",
                    textAlign: "center",
                    borderRadius: "4px",
                    backgroundColor: "#039be5",
                    color: "white",
                    padding: "4px"
                  }}
                  onClick={() => handleDialogOpen("dialog_open")}
                >
                  <i
                    style={{
                      margin: "4px",
                      fontSize: "16px"
                    }}
                    className="fas fa-plus"
                  ></i>
                </button>
              </Tooltip>
            </span>
          </Typography>
          {/* <Tabs
            value={state.tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTab}
            aria-label="tabs"
            centered
          >
            <Tab label={`Info`} />

            <Tab label={`Tables`} />

           
          </Tabs> */}
        </div>
        <div>
          {props.restaurant &&
            props.restaurant.orientation &&
            props.restaurant.orientation.tables && (
              <TableList
                rest_id={props.restaurant._id}
                tables={props.restaurant.orientation.tables}
                updateTable={props.updateTable}
                deleteTable={props.deleteTable}
              />
            )}
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  // isAuthenticated: state.rest_auth.isAuthenticated,
  isUpdated: state.rest_auth.isUpdated
});

export default connect(mapStateToProps)(Orientation);

// export default Orientation;
