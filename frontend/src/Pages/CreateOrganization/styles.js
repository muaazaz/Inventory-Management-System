const MainStyles = {
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
  HeaderTextStyles = {
    display: "flex",
    flexWrap: "wrap",
    fontWeight: "600",
  },
  HeaderStyles = {
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
  },
  CancelButton = {
    color: "GrayText",
    backgroundColor: "lightGray",
    width: "8%",
    padding: "0.8%",
    position: { md: "absolute", xs: "static" },
    right: "10%",
  },
  SaveButton = {
    backgroundColor: "#00A572",
    marginLeft: "2%",
    width: "8%",
    padding: "0.8%",
    position: { md: "absolute", xs: "static" },
    right: "0",
  };

export {
  CancelButton,
  HeaderStyles,
  MainStyles,
  imageTextStyles,
  imageUploadStyles,
  HeaderTextStyles,
  SaveButton,
};
