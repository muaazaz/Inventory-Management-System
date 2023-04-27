const mainDivStyles = {
    display: "flex", 
    flexDirection: "column", 
    width: {md: "90%", xs: "auto"},
    margin: {md: "auto", xs: "0"},
    backgroundColor: "white",
    boxShadow: {md: "1px 0px 20px 1px grey", xs:"none"},
    borderRadius: "10px",
    padding: "1%",
    position: "relative"
},
headerDiv = {
    display: "flex",
    flexWrap: {md: "noWrap", xs:"wrap"},
},
headerText = {
    fontSize: "2em",
    fontWeight: "500"
},
saveButton = {
    backgroundColor: "#00A572",
    marginLeft: "2%",  
    width: "6%", 
    padding: "0.8%", 
    position: {md: "absolute", xs: "static"}, 
    right: "3%" 
},
cancelButton = {
    color: "GrayText",
    backgroundColor: "lightGray",
    width: "6%",
    padding: "0.8%",
    position: {md: "absolute", xs: "static"},
    right: "10%"
},
dividerStyles = {
    mt: "2.5%"
},
multiSelectDiv = {
    display: "flex",
    justifyContent: "space-evenly",
    width: "50%",
    ml: 2
},
multiSelectLabel = {
    fontWieght: "500",
    width: "30%"
}
export{
    mainDivStyles,
    headerDiv,
    saveButton,
    cancelButton,
    dividerStyles,
    headerText,
    multiSelectDiv,
    multiSelectLabel
}