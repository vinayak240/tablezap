import { v4 as uuidv4 } from "uuid";
import { clone } from "ramda";
import { storage } from "./index";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/actions/alert";

const uploadFiles = async fileLst => {
  const taskLst = fileLst.map(obj =>
    storage.ref(`images/${obj.name}`).put(obj.file)
  );
  await Promise.all(taskLst);
};

const getURL = async name => {
  let url = await storage
    .ref("images")
    .child(name)
    .getDownloadURL();
  return url;
};

const uploadRestImages = async restObj => {
  let imgLst = [];
  //   const dispatch = useDispatch();

  for (const key in restObj) {
    if (restObj.hasOwnProperty(key)) {
      if (key === "display_images") {
        restObj.display_images = restObj.display_images.map(ele => {
          let obj = {};
          obj.file = ele.file;
          obj.name = `restaurant-display-${uuidv4()}`;
          imgLst.push(obj);
          return { name: obj.name, imgURL: "" };
        });
      }

      if (key === "menu") {
        restObj.menu.food = restObj.menu.food.map(categ => {
          categ.items = categ.items.map(item => {
            let obj = {};
            obj.file =
              item.item_img && item.item_img.file ? item.item_img.file : "";
            obj.name = `restaurant-menu-food-${uuidv4()}`;
            item.item_img && item.item_img.file && imgLst.push(obj);
            return item.item_img && item.item_img.file
              ? { ...item, item_img: { name: obj.name, imgURL: "" } }
              : { ...item };
          });
          return categ;
        });

        restObj.menu.bar = restObj.menu.bar.map(categ => {
          categ.items = categ.items.map(item => {
            let obj = {};
            obj.file =
              item.item_img && item.item_img.file ? item.item_img.file : "";
            obj.name = `restaurant-menu-bar-${uuidv4()}`;
            item.item_img && item.item_img.file && imgLst.push(obj);
            return item.item_img && item.item_img.file
              ? { ...item, item_img: { name: obj.name, imgURL: "" } }
              : { ...item };
          });
          return categ;
        });

        restObj.menu.buffet = restObj.menu.buffet.map(categ => {
          categ.items = categ.items.map(item => {
            let obj = {};
            obj.file =
              item.item_img && item.item_img.file ? item.item_img.file : "";
            obj.name = `restaurant-menu-buffet-${uuidv4()}`;
            item.item_img && item.item_img.file && imgLst.push(obj);
            return item.item_img && item.item_img.file
              ? { ...item, item_img: { name: obj.name, imgURL: "" } }
              : { ...item };
          });
          return categ;
        });
      }
    }
  }

  try {
    // const taskLst = imgLst.map(obj =>
    //   storage.ref(`images/${obj.name}`).put(obj.file)
    // );
    // await Promise.all(taskLst);

    await uploadFiles(imgLst);
    console.log("After upload");

    for (const key in restObj) {
      if (restObj.hasOwnProperty(key)) {
        if (key === "display_images") {
          restObj.display_images = await Promise.all(
            restObj.display_images.map(async ele => {
              let url = await storage
                .ref("images")
                .child(ele.name)
                .getDownloadURL();

              return { name: ele.name, imgURL: url };
            })
          );
        }

        if (key === "menu") {
          restObj.menu.food = await Promise.all(
            restObj.menu.food.map(async categ => {
              categ.items = await Promise.all(
                categ.items.map(async item => {
                  let url = "";
                  if (item.item_img && item.item_img.name) {
                    url = await storage
                      .ref("images")
                      .child(item.item_img.name)
                      .getDownloadURL();
                  }

                  return item.item_img && item.item_img.name
                    ? {
                        ...item,
                        item_img: { name: item.item_img.name, imgURL: url }
                      }
                    : { ...item };
                })
              );
              return categ;
            })
          );

          restObj.menu.bar = await Promise.all(
            restObj.menu.bar.map(async categ => {
              categ.items = await Promise.all(
                categ.items.map(async item => {
                  let url = "";
                  if (item.item_img && item.item_img.name) {
                    url = await storage
                      .ref("images")
                      .child(item.item_img.name)
                      .getDownloadURL();
                  }

                  return item.item_img && item.item_img.name
                    ? {
                        ...item,
                        item_img: { name: item.item_img.name, imgURL: url }
                      }
                    : { ...item };
                })
              );
              return categ;
            })
          );

          restObj.menu.buffet = await Promise.all(
            restObj.menu.buffet.map(async categ => {
              categ.items = await Promise.all(
                categ.items.map(async item => {
                  let url = "";
                  if (item.item_img && item.item_img.name) {
                    url = await storage
                      .ref("images")
                      .child(item.item_img.name)
                      .getDownloadURL();
                  }

                  return item.item_img && item.item_img.name
                    ? {
                        ...item,
                        item_img: { name: item.item_img.name, imgURL: url }
                      }
                    : { ...item };
                })
              );
              return categ;
            })
          );
        }
      }
    }
    alert("Success!!");
  } catch (err) {
    // dispatch(setAlert("Images cannot be uploaded..", "error"));
    alert("---FAIL---ERR---");
  }

  return clone(restObj);
};

export default uploadRestImages;
