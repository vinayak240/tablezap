import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  section: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "10px",
    margin: "auto",
    marginTop: "24px",
    marginBottom: "20px",
    backgroundColor: "white",
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
    boxShadow: "0px 2px 11px -5px rgba(0,0,0,0.45)",
    wordWrap: "break-word",
    "&:focus": {
      borderRadius: 12,
      background: "white",
      borderColor: deepPurple[100],
    },
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
      borderColor: "#7CB2F1",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cardTitle: {
    fontSize: "1.17rem",
    color: "#122740",
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bolder",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  cardSub: {
    fontSize: "0.80rem",
    color: "#756e6e",
    borderRadius: "5px",
    fontWeight: "bold",
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
  },
  itemImage: {
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "20px",
    "&:hover": {
      boxShadow: `1px 1px 5px ${deepPurple[400]}`,
    },
  },
  cardDesc: {
    // backgroundColor: "#EBEDE8",
    // border: "2px solid #E7EDF3",
    // borderRadius: 5,
    // padding: "12px"
    // padding: "5px 20px ",
    // backgroundColor: "#b8f2ab",
    fontSize: "13px",
    color: "#756e6e",
    // borderRadius: "5px",
    // border: "1px solid lightgray",
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
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
      backgroundColor: "#ffffff",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#ffffff",
      paddingTop: "10px",
      paddingBottom: "20px",

      "&:hover": {
        backgroundColor: "#F4F7FA",
      },
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: deepPurple[300],
      borderRadius: "16px",
      border: "5px solid white",
      "&:hover": {
        backgroundColor: deepPurple[400],
        border: "5px solid #F4F7FA",
      },
    },
    "&::-webkit-scrollbar-button": {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "10px",
    },
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
    maxWidth: "80%",
  },
  menuItem: {
    width: "150px",
    padding: "6px 16px",
    fontWeight: "bold",
    textAlign: "left",
  },
  breadCrumb: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "60px",
  },
  textField: {
    fontFamily: "'Nunito', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    border: "1px solid lightgray",
    width: "80%",
    margin: "auto",
    padding: "10px",
    fontWeight: "bold",
  },
  paper: {
    width: "750px",
  },
  dialog_form: {
    width: "80%",
    minWidth: "350px",
  },
  dialog_paper: {
    borderRadius: "12px",
    padding: "12px",
    ["@media (max-width:600px)"]: {
      // eslint-disable-line no-useless-computed-key
      borderRadius: "none",
    },
  },
  cust_ctrl_btns: {
    margin: "0px 8px",
    minWidth: "unset",
    fontWeight: "bold",
    float: "right",
    border: "none",
    textAlign: "center",
    borderRadius: "4px",
    backgroundColor: "#039be5",
    padding: "4px",

    "&:hover": {
      backgroundColor: "#0388ca",
      boxShadow: "none",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "#0388ca",
      },
    },
  },
  itemImgGrid: {
    ["@media (max-width:1000px)"]: {
      // eslint-disable-line no-useless-computed-key
      maxWidth: "35%",
      flexBasis: "35%",
    },
    ["@media (max-width:600px)"]: {
      // eslint-disable-line no-useless-computed-key
      maxWidth: "50%",
      flexBasis: "50%",
    },
  },
  itemContentGrid: {
    ["@media (max-width:1000px)"]: {
      // eslint-disable-line no-useless-computed-key
      maxWidth: "65%",
      flexBasis: "65%",
    },
    ["@media (max-width:600px)"]: {
      // eslint-disable-line no-useless-computed-key
      maxWidth: "50%",
      flexBasis: "50%",
    },
  },
  noImgItemContentGrid: {
    ["@media (max-width:600px)"]: {
      // eslint-disable-line no-useless-computed-key
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
}));

export const useFirebaseBtnStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    borderRadius: 8,
  },
  text: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  contained: {
    boxShadow: "none",
    "&:active": {
      boxShadow: shadows[0],
    },
  },
  containedPrimary: {
    backgroundColor: "#039be5",
    color: palette.common.white,
    "&:hover": {
      backgroundColor: "#0388ca",
      boxShadow: "none",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "#0388ca",
      },
    },
  },
  label: {
    textTransform: "none",
    letterSpacing: "0.5px",
    fontWeight: "bold",
  },
}));

export default useStyles;
