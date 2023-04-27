const mainDiv = {
    display: "flex",
    flexDirection: "column",
    width: { md: "95%", xs: "auto" },
    margin: { md: "auto", xs: "0" },
    backgroundColor: "white",
    boxShadow: { md: "1px 0px 20px 1px grey", xs: "none" },
    borderRadius: "10px",
    padding: "1%",
  },
  headerDiv = {
    display: "flex",
    position: "relative",
    flexWrap: {md: "noWrap", xs:"wrap"},
  },
  viewButton = {
    width: "0.5%",
    borderRadius: "10px",
    position: {md: "absolute", xs: "static"}, 
    right: "2%",
  },
  headerText = {
    fontSize: "1.5em",
    fontWeight: "600"
  };

export { viewButton, headerDiv, mainDiv, headerText };
