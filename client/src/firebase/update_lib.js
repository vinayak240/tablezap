import { v4 as uuidv4 } from "uuid";
import { clone } from "ramda";
import { storage } from "./index";
// import { useDispatch } from "react-redux";
// import { setAlert } from "../redux/actions/alert";

const uploadFiles = async fileLst => {
  await Promise.all(
    fileLst.map(obj => storage.ref(`images/${obj.name}`).put(obj.file))
  );
};

const deleteFiles = async nameLst => {
  await Promise.all(
    nameLst.map(name => storage.ref(`images/${name}`).delete())
  );
};

const getURL = async name => {
  let url = await storage
    .ref("images")
    .child(name)
    .getDownloadURL();
  return url;
};

const updateRestImages = async restObj => {
  let imgLst = [];
  let deleteNameLst = [];
  //   const dispatch = useDispatch();

  for (const key in restObj) {
    if (restObj.hasOwnProperty(key)) {
      if (key === "display_images") {
        restObj.display_images = restObj.display_images.map(ele => {
          if (ele.updated) {
            let obj = {};
            obj.file = ele.file;
            obj.name = `restaurant-display-${uuidv4()}`;
            imgLst.push(obj);
            deleteNameLst.push(ele.id);
            return { name: obj.name, imgURL: "", updated: true };
          }

          return ele;
        });
      }

      if (key === "menu") {
        restObj.menu.food = restObj.menu.food.map(categ => {
          categ.items = categ.items.map(item => {
            if (item.item_img && item.item_img.updated) {
              let obj = {};
              obj.file =
                item.item_img && item.item_img.file ? item.item_img.file : "";
              obj.name = `UPDATED-restaurant-menu-food-${uuidv4()}`;

              item.item_img && item.item_img.file && imgLst.push(obj);
              item.item_img &&
                item.item_img.preID &&
                deleteNameLst.push(item.item_img.preID);

              return item.item_img && item.item_img.file
                ? {
                    ...item,
                    item_img: { name: obj.name, imgURL: "", updated: true }
                  }
                : { ...item };
            }

            return { ...item };
          });
          return categ;
        });

        restObj.menu.bar = restObj.menu.bar.map(categ => {
          categ.items = categ.items.map(item => {
            if (item.item_img && item.item_img.updated) {
              let obj = {};
              obj.file =
                item.item_img && item.item_img.file ? item.item_img.file : "";
              obj.name = `UPDATED-restaurant-menu-bar-${uuidv4()}`;

              item.item_img && item.item_img.file && imgLst.push(obj);
              item.item_img &&
                item.item_img.preID &&
                deleteNameLst.push(item.item_img.preID);

              return item.item_img && item.item_img.file
                ? {
                    ...item,
                    item_img: { name: obj.name, imgURL: "", updated: true }
                  }
                : { ...item };
            }

            return { ...item };
          });
          return categ;
        });

        restObj.menu.buffet = restObj.menu.buffet.map(categ => {
          categ.items = categ.items.map(item => {
            if (item.item_img && item.item_img.updated) {
              let obj = {};
              obj.file =
                item.item_img && item.item_img.file ? item.item_img.file : "";
              obj.name = `UPDATED-restaurant-menu-buffet-${uuidv4()}`;

              item.item_img && item.item_img.file && imgLst.push(obj);
              item.item_img &&
                item.item_img.preID &&
                deleteNameLst.push(item.item_img.preID);

              return item.item_img && item.item_img.file
                ? {
                    ...item,
                    item_img: { name: obj.name, imgURL: "", updated: true }
                  }
                : { ...item };
            }

            return { ...item };
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
    await deleteFiles(deleteNameLst);
    await uploadFiles(imgLst);
    console.log("After upload");

    for (const key in restObj) {
      if (restObj.hasOwnProperty(key)) {
        if (key === "display_images") {
          restObj.display_images = await Promise.all(
            restObj.display_images.map(async ele => {
              if (ele.updated) {
                let url = await getURL(ele.name);

                return { name: ele.name, imgURL: url };
              }

              return { ...ele };
            })
          );
        }

        if (key === "menu") {
          restObj.menu.food = await Promise.all(
            restObj.menu.food.map(async categ => {
              categ.items = await Promise.all(
                categ.items.map(async item => {
                  if (item.item_img && item.item_img.updated) {
                    let url = "";
                    if (item.item_img && item.item_img.name) {
                      url = await getURL(item.item_img.name);
                    }

                    return item.item_img && item.item_img.name
                      ? {
                          ...item,
                          item_img: { name: item.item_img.name, imgURL: url }
                        }
                      : { ...item };
                  }

                  return { ...item };
                })
              );
              return categ;
            })
          );

          restObj.menu.bar = await Promise.all(
            restObj.menu.bar.map(async categ => {
              categ.items = await Promise.all(
                categ.items.map(async item => {
                  if (item.item_img && item.item_img.updated) {
                    let url = "";
                    if (item.item_img && item.item_img.name) {
                      url = await getURL(item.item_img.name);
                    }

                    return item.item_img && item.item_img.name
                      ? {
                          ...item,
                          item_img: { name: item.item_img.name, imgURL: url }
                        }
                      : { ...item };
                  }

                  return { ...item };
                })
              );
              return categ;
            })
          );

          restObj.menu.buffet = await Promise.all(
            restObj.menu.buffet.map(async categ => {
              categ.items = await Promise.all(
                categ.items.map(async item => {
                  if (item.item_img && item.item_img.updated) {
                    let url = "";
                    if (item.item_img && item.item_img.name) {
                      url = await getURL(item.item_img.name);
                    }

                    return item.item_img && item.item_img.name
                      ? {
                          ...item,
                          item_img: { name: item.item_img.name, imgURL: url }
                        }
                      : { ...item };
                  }

                  return { ...item };
                })
              );
              return categ;
            })
          );
        }
      }
    }
    // alert("Success!!");
  } catch (err) {
    //this is just trial add CleanUP here by deleting the partially uploaded unwanted images...
    throw err;
  }

  return clone(restObj);
};

export default updateRestImages;
