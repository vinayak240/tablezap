import React, { useEffect } from "react";
import { connect } from "react-redux";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import FbSpinner from "../../../layout/FbSpinner";
import useStyles, { useFirebaseBtnStyles } from "./styles/main";
import Profile from "./forms/Profile";
import OwnerDetails from "./forms/OwnerDetails";
import RestaurantDetails from "./forms/RestaurantDetails";
import Credentials from "./forms/Credentials";
import { Collapse, Grid, Button, useMediaQuery } from "@material-ui/core";

const Account = (props) => {
  const classes = useStyles();
  const styles = useFirebaseBtnStyles();
  const matchesSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const gutterStyles = usePushingGutterStyles();
  const [state, setState] = React.useState({
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

  const {
    rest_id,
    rest_name,
    rest_email,
    rest_addr,
    rest_no,
    rest_type,
    rest_timing_start,
    rest_timing_end,
    rest_tags,
    dine_type,
    is_alcohol,
    owner_name,
    owner_email,
    owner_no,
  } = props.restaurant;
  const data = {
    rest_id,
    rest_name,
    rest_email,
    rest_addr,
    rest_no,
    rest_type,
    rest_timing_start,
    rest_timing_end,
    rest_tags,
    dine_type,
    is_alcohol,
    owner_name,
    owner_email,
    owner_no,
  };

  const upload = () => {
    setState({
      ...state,
      loading: true,
    });
    props.upload("main");
  };

  return (
    <div>
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

      {props.restaurant && (
        <div className="content">
          <Profile restaurant={props.restaurant} />
          <Credentials
            rest_id={props.restaurant.rest_id}
            rest_psswd={props.restaurant.rest_psswd}
            // updateInfo={props.updateInfo}
            resetPsswd={props.resetPsswd}
          />
          <RestaurantDetails data={data} updateInfo={props.updateInfo} />
          <OwnerDetails data={data} updateInfo={props.updateInfo} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  // isAuthenticated: state.rest_auth.isAuthenticated,
  isUpdated: state.rest_auth.isUpdated,
});

export default connect(mapStateToProps)(Account);

// export default Account;
