import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Card, Tabs, Tab, Grid, Button } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import Logo from "../logos/Logo";
import QRCode from "qrcode.react";
// import { useFirebaseBtnStyles } from "@mui-treasury/styles/button/firebase";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";

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
    // backgroundColor: "#EBEDE8",
    // border: "2px solid #E7EDF3",
    // borderRadius: 5,
    // padding: "12px"
    // padding: "5px 20px ",
    // backgroundColor: "#b8f2ab",
    color: "#756e6e",
    // borderRadius: "5px",
    fontWeight: "bold",
    // border: "1px solid lightgray",
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
    // borderBottom: "1px solid lightgray"
  },
  pageTitle: {
    fontSize: "1.8rem",
    color: "#122740",
    textAlign: "center",
    marginBottom: "5px",
    fontWeight: "bolder"
    // textDecoration: "underline"
  },
  breadCrumb: {
    backgroundColor: "#e8eff4",
    border: "1px solid #90caf9",
    fontWeight: "bold",
    padding: "12px",
    borderRadius: 12
  }
}));

const Table = props => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const gutterStyles = usePushingGutterStyles();

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
        <Logo width="100px" height="50px" />
      </div>
      <div>
        <QRCode
          id={props.table ? props.table.table_id : "123456"}
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
          size={200}
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
        <Button
          style={{ marginLeft: "10px", fontWeight: "bold" }}
          classes={styles}
          variant={"contained"}
          color={"primary"}
        >
          <i style={{ margin: "8px" }} className="fas fa-edit"></i>
          Edit
        </Button>

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
        <Grid key={idx} item xs={12} sm={12} md={6}>
          <Table rest_id={props.rest_id} table={table} />
        </Grid>
      ))}
    </Grid>
  );
};

const Orientation = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    tab: 0
  });

  //   const handleTab = (evt, newValue) => {
  //     setState({
  //       ...state,
  //       tab: newValue
  //     });
  //   };

  return (
    <div>
      <div>
        <Typography className={classes.breadCrumb} paragraph>
          <span
            style={{
              padding: "5px 10px ",
              // backgroundColor: "#fce76f",
              color: "#282C34",
              borderRadius: "5px",
              fontWeight: "bold"
              // border: "1px solid lightgray"
            }}
          >
            Dashboard
          </span>

          <b>/</b>
          <span
            style={{
              padding: "5px 10px ",
              // backgroundColor: "#fce76f",
              color: "#282C34",
              borderRadius: "5px",
              fontWeight: "bold",
              textDecoration: "underline"
              // border: "1px solid lightgray"
            }}
          >
            Orientation
          </span>
        </Typography>
      </div>
      <Card
        className={classes.section}
        style={{
          // height: "650px",
          // maxHeight: "560px",
          minWidth: "350px",
          paddingBottom: "25px",
          borderRadius: "16px"
        }}
      >
        <div>
          <Typography className={classes.pageTitle}>
            <img
              style={{ width: "4rem", verticalAlign: "middle" }}
              alt="Table Icon"
              src="https://img.icons8.com/clouds/100/000000/qr-code.png"
            />
            <span> Tables </span>
            {/* <img
              style={{ width: "4rem", verticalAlign: "middle" }}
              src="https://img.icons8.com/clouds/100/000000/grid.png"
              alt="Table Icon"
            /> */}
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
              />
            )}
        </div>
      </Card>
    </div>
  );
};

export default Orientation;
