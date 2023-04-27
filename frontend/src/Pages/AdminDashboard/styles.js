const mainDiv = {
    width: { md: "95%", xs: "100%" },
    height: "auto",
    display: "flex",
    margin: "auto",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid whitesmoke",
    borderRadius: "20px",
    boxShadow: { md: "0 1px 5px 1px gray", xs: "none" },
  },
  headerText = {
    fontSize: "2em",
    fontWeight: "600",
    margin: "1%",
  },
  stats = {
    display: "flex",
    flexWrap: "wrap",
    width: "95%",
    margin: "auto",
    justifyContent: "space-evenly",
    borderBottom: "1px solid lightgray",
  },
  tableDiv = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    margin: "1% auto",
  }

export { mainDiv, headerText, stats, tableDiv };
