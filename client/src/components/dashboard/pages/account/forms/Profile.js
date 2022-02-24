import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import RestLogo from "../../../../logos/RestLogo";
import useStyles from "../styles/main";

const Profile = (props) => {
  const classes = useStyles();
  return (
    <div
      className={classes.card}
      style={{
        background: "white",
        width: "100%",
        padding: "0px",
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 16,
          backgroundColor: "lightsteelblue",
          margin: "auto",
          padding: "10px 10px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          height: "30px",
        }}
      ></div>

      <div>
        <Grid
          style={{ padding: "15px 22px" }}
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <Grid style={{ paddingRight: "8px" }} item xs={12}>
            <Typography
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              {props.restaurant ? props.restaurant.rest_name : "Restaurant"}
            </Typography>
            <Typography>
              <span
                style={{
                  textDecoration: "underline",
                  marginTop: "12x",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                <img
                  style={{
                    width: "13px",
                    verticalAlign: "middle",
                    margin: "3px",
                  }}
                  src="https://img.icons8.com/fluent/48/000000/verified-account.png"
                  alt="ID"
                />
                {props.restaurant ? props.restaurant.rest_id : "123"}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
