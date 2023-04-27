const main = {
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
  headerDiv = {
    display: "flex",
    width: "80%",
    flexWrap: {md: "noWrap", xs:"wrap"},
    justifyContent: "space-between",
    alignItems: "center"
  },
  addButton = {
    backgroundColor: "#00A572",
    position: {md: "absolute", xs: "static"}, 
    right: "2%",
  },
  divider = {
    margin: "2% 0",
  },
  headerText = {
    fontSize: "2em",
    fontWeight: "600",
  },
  searchStyles = {
    backgroundColor: "white",
    width: "20%",
    height: "50px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "10px",
    border: "1px solid grey",
  },
  headerSelects = {
    display: "flex",
    width : "60%"
  };

export {
  main,
  addButton,
  divider,
  headerText,
  headerDiv,
  searchStyles,
  headerSelects,
};
