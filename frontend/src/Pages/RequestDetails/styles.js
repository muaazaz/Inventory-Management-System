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
    alignItems: "center",
    flexWrap: "wrap"
  },
  headerText = {
    fontSize: "2em",
    fontWeight: "500",
    m: "0 2%",
  },
  acceptButton = {
    backgroundColor: "#00A572",
    position: {md: "absolute", xs: "static"},
    right: "2%",
    borderRadius: "10px"
  },
  rejectButton = {
    position: {md: "absolute", xs: "static"},
    right: "13%",
    borderRadius: "10px"
  },
  pendingStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    m: "0 1%",
    width: "5%",
    padding: "0.3%",
    backgroundColor: "#1974D2",
    textAlign: "center",
    color: "white",
    fontWeight: 600,
    borderRadius: "10px",
  },
  userText = {
    fontSize: "2em",
    fontWeight: "500"
  }

export { main, headerDiv, acceptButton, rejectButton, headerText, pendingStyles, userText };
