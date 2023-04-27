const searchStyles = {
    backgroundColor: "white",
    width: "20%",
    height: "50px",
    display: "flex",
    justifyContent: "space-around",
    borderRadius: "10px",
    border: "1px solid grey",
    margin: "1%"
}, main = {
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
    width: "70%",
    alignItems: "center",
    padding: "1%"
  },
  headerText = {
    fontSize: "2em",
    fontWeight: "600",
    m: "0 2%"
  },
  addButton = {
    backgroundColor: "#00A572",
    position: {md: "absolute", xs: "static"},
    right: "2%",
  }

export { searchStyles, main, headerDiv, addButton, headerText };