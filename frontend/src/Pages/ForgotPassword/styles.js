const mainDiv = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}, 
contentDiv = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: {md: "50%", xs: "100%"},
    minHeight: "400px",
    margin: "auto",
    boxShadow: {md: "1px 0px 10px 1px grey", xs: "none"},
    backgroundColor: "white",
    borderRadius: "20px"
},
logo = {
    width: "10%",
    height: "auto"
}

export {
    contentDiv,
    logo,
    mainDiv
}