export const images = {
  Cement: require("../../ui/ProductImages/Cement.jpeg"),
  Bricks: require("../../ui/ProductImages/Bricks.jpg"),
  Sand: require("../../ui/ProductImages/Sand.png"),
  Pipe: require("../../ui/ProductImages/Pipe.jpeg"),
  LoginImg: require("../../ui/ProductImages/LoginImage.jpg"),
  Project: require("../../ui/ProductImages/Project.jpg"),
  siteCart: require("../../ui/ProductImages/siteCart.jpg"),
};
export const selectImage = (type) => {
  if (type === "Cement") {
    return images.Cement;
  } else if (type === "Sand") {
    return images.Sand;
  } else if (type === "Bricks") {
    return images.Bricks;
  }
};
