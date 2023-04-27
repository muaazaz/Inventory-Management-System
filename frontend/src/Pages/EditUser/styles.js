const registerMainStyles = {
    display: "flex",
    flexDirection: "column",
    width: { md: "90%", xs: "auto" },
    margin: { md: "auto", xs: "0" },
    backgroundColor: "white",
    boxShadow: { md: "1px 0px 20px 1px grey", xs: "none" },
    borderRadius: "10px",
    padding: "1%",
  },
  imageUploadStyles = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    mb: 4,
  },
  imageTextStyles = {
    display: "flex",
    flexDirection: "column",
    margin: "0 1%",
  },
  registerHeaderTextStyles = {
    display: "flex",
    flexWrap: "wrap",
    fontWeight: "600",
  },
  registerHeaderStyles = {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
  },
  registerCancelButton = {
    color: "GrayText",
    backgroundColor: "lightGray",
    width: "8%",
    padding: "0.8%",
    position: { md: "absolute", xs: "static" },
    right: "10%",
  },
  registerSaveButton = {
    backgroundColor: "#00A572",
    marginLeft: "2%",
    width: "8%",
    padding: "0.8%",
    position: { md: "absolute", xs: "static" },
    right: "0",
  };

export {
  registerCancelButton,
  registerHeaderStyles,
  registerMainStyles,
  imageTextStyles,
  imageUploadStyles,
  registerHeaderTextStyles,
  registerSaveButton,
};
