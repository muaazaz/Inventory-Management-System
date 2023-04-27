const searchStyles = {
    backgroundColor: "white",
    width: "20%",
    height: "50px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: "10px",
    border: "1px solid grey"
},
mainDiv = {
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
addButton = {
    backgroundColor: "#00A572",
    position: {md: "absolute", xs: "static"},
    right: "3%"
},
headerDiv = {
    display: "flex",
    width: "80%",
    flexWrap: {md: "noWrap", xs:"wrap"},
    alignItems: "center"
},
headerText = {
    fontSize: "2em",
    fontWeight: "600",
    margin: "0 2%"
}

export {
    searchStyles,
    mainDiv,
    addButton,
    headerDiv,
    headerText
}