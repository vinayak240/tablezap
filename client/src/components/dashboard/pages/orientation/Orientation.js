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
  useMediaQuery,
} from "@material-ui/core";
import MaterialMenu from "@material-ui/core/Menu";
import { deepPurple } from "@material-ui/core/colors";
import Logo from "../../../logos/Logo";
import QRCode from "qrcode.react";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import FbSpinner from "../../../layout/FbSpinner";
import useStyles, { useFirebaseBtnStyles } from "./styles/main";
import PaperComponent from "./components/PaperComponent";
import PurpleSwitch from "./components/PurpleSwitch";
import Table from "./components/Table";
import TableList from "./components/TableList";
import TableForm from "./forms/TableForm";

const Orientation = (props) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const matchesSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const gutterStyles = usePushingGutterStyles();
  const [state, setState] = React.useState({
    dialog_open: false,
    show_options: false,
    loading: false,
  });

  useEffect(() => {
    if (props.isUpdated) {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
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

  const handleDialogOpen = (content) => {
    setState({
      ...state,
      [content]: true,
      anchorEl: null,
    });
  };

  const handleDialogClose = (content) => {
    // console.log("Closed - ", state.dialog_open);
    setState({
      ...state,
      [content]: false,
    });
  };

  const handleMouseIn = () => {
    setState({
      ...state,
      show_options: true,
    });
  };

  const handleMouseOut = () => {
    setState({
      ...state,
      show_options: false,
    });
  };

  const addTable = (newTable) => {
    setState({
      ...state,
      dialog_open: false,
    });

    props.addTable(newTable);
  };

  const upload = () => {
    setState({
      ...state,
      loading: true,
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
                  fontWeight: "bold",
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
                  textDecoration: "underline",
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
                marginBottom: "10px",
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
                alignContent: "center",
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
          marginTop: "10px",
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
                    padding: "4px",
                  }}
                  onClick={() => handleDialogOpen("dialog_open")}
                >
                  <i
                    style={{
                      margin: "4px",
                      fontSize: "16px",
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

const mapStateToProps = (state) => ({
  // isAuthenticated: state.rest_auth.isAuthenticated,
  isUpdated: state.rest_auth.isUpdated,
});

export default connect(mapStateToProps)(Orientation);

// export default Orientation;
