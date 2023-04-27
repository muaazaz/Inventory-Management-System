const createMainDiv = {
    display: "flex",
    flexDirection: "column",
    width: { md: "85%", xs: "auto" },
    margin: { md: "auto", xs: "0" },
    backgroundColor: "white",
    boxShadow: { md: "1px 0px 20px 1px grey", xs: "none" },
    borderRadius: "10px",
    position: "relative",
    padding: "1%",
  },
  header = {
    display: "flex",
    alignitems: "center",
    flexWrap: {md: "noWrap", xs:"wrap"},
  },
  headerText = {
    fontSize: "1.5em",
    fontWeight: "500",
  },
  saveButton = {
    backgroundColor: "#00A572",
    position: { md: "absolute", xs: "static" },
    right: "5%",
  },
  cancelButton = {
    color: "GrayText",
    backgroundColor: "lightGray",
    position: { md: "absolute", xs: "static" },
    right: "10%",
  };

export { createMainDiv, headerText, saveButton, header, cancelButton };
