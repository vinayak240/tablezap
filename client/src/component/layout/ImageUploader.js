import React from "react";
import { clone } from "ramda";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Switch,
  withStyles,
  FormControlLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
    // overflow: "auto",
    "&:hover": {
      borderColor: "#7CB2F1"
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  photo: {
    backgroundColor: "white",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "bold",
    border: "1px solid lightgray",
    padding: "5px",
    borderRadius: "8px"
  }
}));

const PurpleSwitch = withStyles({
  switchBase: {
    color: "rgb(84, 187, 234)",
    "&$checked": {
      color: "rgba(3, 155, 229, 1)"
    },
    "&$checked + $track": {
      backgroundColor: "rgba(3, 155, 229, 1)"
    }
  },
  checked: {},
  track: {}
})(Switch);

const ImageUploader = props => {
  const classes = useStyles();
  const hiddenFileInput = React.useRef(null);
  const [state, setState] = React.useState({
    imgList: [],
    show_img: false
  });

  const handleClick = () => {
    // console.log(hiddenFileInput.current);

    hiddenFileInput.current.click();
  };

  const deleteImg = (id, name) => {
    hiddenFileInput.current.files = null;
    hiddenFileInput.current.value = null;

    setState({
      ...state,
      imgList: state.imgList.filter(ele => ele.id !== id)
    });
  };

  const handleImgChange = e => {
    // if (e.target.files.length) {
    const arrFiles = Array.from(e.target.files);
    let files = arrFiles.map((file, index) => {
      //   file here is the payload to be sent to the server
      const src = window.URL.createObjectURL(file);
      // src here can be used for the <img /> tag locally
      return { file, id: file.name, src };
    });

    files = files.filter(ele => {
      return !state.imgList.find(
        (obj, index) => obj.file.name === ele.file.name
      );
    });
    //   console.log(files);
    setState({
      ...state,
      imgList: clone(props.multiple ? [...state.imgList, ...files] : files)
    });
    // }
  };

  const handleChange = evt => {
    setState({
      ...state,
      [evt.target.name]: evt.target.checked
    });
  };

  return (
    <div className={classes.card}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <Typography
          style={{
            textAlign: "left",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: "bold",
            color: "#5b5959",
            fontSize: "19px"
          }}
        >
          <i style={{ margin: "8px" }} className="fas fa-images"></i>
          Upload Images
        </Typography>
        <div>
          <input
            name="image-input"
            style={{ display: "none" }}
            ref={hiddenFileInput}
            accept="image/*"
            type="file"
            onChange={handleImgChange}
            multiple={props.multiple}
          />
          <Button
            style={{
              // float: "right",
              backgroundColor: "#039be5",
              color: "white",
              borderRadius: "6px"
            }}
            onClick={handleClick}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                textTransform: "capitalize"
              }}
            >
              Browse
            </span>
          </Button>
        </div>
      </div>
      {state.imgList.length > 0 && (
        <div style={{ marginTop: "18px", marginBottom: "8px" }}>
          {" "}
          <FormControlLabel
            // style={{ fontWeight: "bold" }}
            control={
              <PurpleSwitch
                checked={state.show_img}
                onChange={handleChange}
                name="show_img"
              />
            }
            label={
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                Show images
              </span>
            }
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          flexWrap: "wrap"
        }}
      >
        {state.imgList.map(({ file, src, id }, index) =>
          state.show_img ? (
            <div
              style={{ margin: "10px" }}
              className={classes.photo}
              key={`file-row${index}`}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  padding: "0 6px",
                  marginTop: "3px"
                }}
              >
                <i
                  style={{ color: "#514f4f" }}
                  className="fas fa-times"
                  onClick={() => deleteImg(id, file.name)}
                ></i>
              </div>
              <img
                style={{
                  width: "90%",
                  margin: "8px",
                  maxHeight: "140px",
                  maxWidth: "140px",
                  borderRadius: "6px",
                  marginTop: "4px"
                  // boxShadow: "3px 3px 3px lightgray"
                }}
                src={src}
                alt={id}
              />
              <Typography
                style={{
                  textAlign: "center",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: "bold",
                  color: "#514f4f"
                }}
              >
                {file.name}
              </Typography>
            </div>
          ) : (
            <div
              key={`file-row-img-${index}`}
              style={{
                padding: "10px",
                border: "1px solid lightgray",
                borderRadius: "5px",
                margin: "4px 8px 4px 0px"
              }}
            >
              <span>
                <i
                  style={{ color: "#dc4c40", marginRight: "10px" }}
                  className="fas fa-image"
                ></i>
              </span>
              <span
                style={{
                  textAlign: "center",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: "bold",
                  color: "#514f4f"
                }}
              >
                {file.name}
              </span>
              <span>
                {" "}
                <i
                  style={{
                    color: "#514f4f",
                    marginLeft: "10px"
                  }}
                  className="fas fa-times"
                  onClick={() => deleteImg(id, file.name)}
                ></i>
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
