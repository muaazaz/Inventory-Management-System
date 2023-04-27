const mainDiv = {
    display: "flex", 
    flexDirection: "column", 
    width: {md: "95%", xs: "auto"},
    margin: {md: "auto", xs: "0"},
    backgroundColor: "white",
    boxShadow: {md: "1px 0px 20px 1px grey", xs:"none"},
    borderRadius: "10px",
    padding: "1%"
}, header = {
    display: "flex",
    flexWrap: {md: "noWrap", xs:"wrap"},  
}, viewButton = {
    width: "0.5%",
    position: {md: "absolute", xs: "static"},
    right: "3%"
},
headerText = {
    fontSize: "2em",
    fontWeight: "500"
},
dividerStyles = {
    m: "2% 0"
}


export{
viewButton,
header,
mainDiv,
headerText,
dividerStyles
}