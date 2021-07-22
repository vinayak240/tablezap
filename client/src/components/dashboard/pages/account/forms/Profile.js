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
        padding: "0px 0px 22px 0px",
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
      >
        {/* <div style={{ width: "95%", margin: "auto", maxHeight: "500px" }}> */}
        {/* <ImageSlider imgList={props.restaurant.display_images} /> */}
        {/* </div> */}
      </div>

      <div>
        <Grid
          // className={classes.section}
          style={{ marginTop: "7px", padding: "15px 10px" }}
          container
          // spacing={1}
          direction="row"
          alignItems="center"
          justify="flex-start"
        >
          <Grid style={{ paddingRight: "8px" }} item xs={3} sm={2} md={1}>
            <RestLogo height="35px" width="35px" />
          </Grid>

          <Grid style={{ paddingRight: "8px" }} item xs={9} sm={10} md={11}>
            <Typography
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                // textDecoration: "underline"
              }}
              // align={"center"}
            >
              {props.restaurant ? props.restaurant.rest_name : "Restaurant"}
            </Typography>
            <Typography>
              <span
                style={{
                  borderRadius: "6px",
                  padding: "3px",
                  backgroundColor: "#cdefc9",
                  textDecoration: "underline",
                  color: "green",
                  marginTop: "10x",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                <img
                  style={{
                    width: "13px",
                    verticalAlign: "middle",
                    margin: "3px",
                    // float: "left"
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
