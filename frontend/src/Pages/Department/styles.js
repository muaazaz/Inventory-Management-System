const main = {
    display: "flex", 
    flexDirection: "column", 
    width: {md: "85%", xs: "auto"},
    margin: {md: "auto", xs: "0"},
    backgroundColor: "white",
    boxShadow: {md: "1px 0px 20px 1px grey", xs:"none"},
    borderRadius: "10px",
    position: "relative",
    padding: "1%"
},
 addButton = {
    backgroundColor: "#00A572",
    position: {md: "absolute", xs: "static"}, 
    right: "5%"
},
 divider = {
    margin: "1% 0"
},
 searchStyles = {
    backgroundColor: "white",
    width: "20%",
    height: "50px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "10px",
    border: "1px solid grey"
},
headerDiv = {
    display: "flex",
    flexWrap: {md: "noWrap", xs:"wrap"},
},
headerText = {
    fontSize: "2em",
    fontWeight: "500",
    mr: 4
}

export{
    main,
    addButton,
    divider,
    searchStyles,
    headerDiv,
    headerText
}