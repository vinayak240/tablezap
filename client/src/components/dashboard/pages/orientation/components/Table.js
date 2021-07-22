import React from "react";
import Typography from "@material-ui/core/Typography";
import { FormControlLabel, Button, useMediaQuery } from "@material-ui/core";
import MaterialMenu from "@material-ui/core/Menu";
import Logo from "../../../../logos/Logo";
import QRCode from "qrcode.react";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";

import useStyles, { useFirebaseBtnStyles } from "../styles/main";
import PaperComponent from "../components/PaperComponent";
import PurpleSwitch from "../components/PurpleSwitch";
import TableForm from "../forms/TableForm";

const Table = (props) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const matchesQrDim = useMediaQuery("(max-width:500px)");
  const gutterStyles = usePushingGutterStyles();

  const [state, setState] = React.useState({
    dialog_open: false,
    anchorEl: null,
    dialog2_open: false,
    status: true,
  });

  const downloadQR = (table_id) => {
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

  const handleClick = (event) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
    });
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.checked,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null,
    });
  };

  const updateTable = (newTable) => {
    setState({
      ...state,
      dialog_open: false,
    });
    props.updateTable(newTable, props.table.table_id);
  };

  const deleteTable = () => {
    setState({
      ...state,
      dialog2_open: false,
    });
    props.deleteTable(props.table.table_id);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        textAlign: "center",
        width: "80%",
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
            margin: "16px 0",
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

export default Table;
