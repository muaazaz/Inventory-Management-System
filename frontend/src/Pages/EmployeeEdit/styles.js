const mainDivStyles = {
    display: "flex",
    flexDirection: "column",
    width: { md: "90%", xs: "auto" },
    margin: { md: "auto", xs: "0" },
    backgroundColor: "white",
    boxShadow: { md: "1px 0px 20px 1px grey", xs: "none" },
    borderRadius: "10px",
    padding: "1%",
    position: "relative",
  },
  tableHeader = {
    fontSize: "1.5em",
    fontWeight: "600",
    m: "1%"
  },
  saveButton = {
    backgroundColor: "#00A572",
    marginLeft: "2%",
    width: "5%",
    height: "50px",
    padding: "0.8%",
    position: { md: "absolute", xs: "static" },
    right: "2%",
  },
  cancelButton = {
    color: "GrayText",
    backgroundColor: "lightGray",
    width: "5%",
    height: "50px",
    padding: "0.8%",
    position: { md: "absolute", xs: "static" },
    right: "10%",
  },
  dividerStyles = {
    m: "3% 0",
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
  };

export {
  mainDivStyles,
  tableHeader,
  saveButton,
  cancelButton,
  dividerStyles,
  imageUploadStyles,
  imageTextStyles,
};
