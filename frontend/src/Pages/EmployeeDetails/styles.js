const mainStyles = {
    display: "flex",
    flexDirection: "column",
    width: { md: "95%", xs: "auto" },
    margin: { md: "auto", xs: "0" },
    backgroundColor: "white",
    boxShadow: { md: "1px 0px 20px 1px grey", xs: "none" },
    borderRadius: "10px",
    padding: "1%",
  },
  viewHeader = {
    display: "flex",
    position: "relative",
    flexWrap: {md: "noWrap", xs:"wrap"},
  },
  viewButton = {
    width: "0.5%",
    position: {md: "absolute", xs: "static"}, 
    right: "2%",
  },
  headerDiv = {
    fontSize: "1.8em",
    fontWeight: "400",
    letterSpacing: "-1px",
  };

export { viewButton, viewHeader, mainStyles, headerDiv };
