const mainDiv = {
    display: { md: "flex", xs: "none" },
    flexGrow: "1",
},
responsiveDiv = {
    color: "#007AFF",
    display: { xs: "flex", md: "none" },
    flexGrow: "1",
},
appBar = {
    backgroundColor: "white",
    marginBottom: "3%",
}
,responsiveNavStyles={ 
    color: "gray", 
    textDecoration: "none" 
}
,avatarDiv={
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center"
}
,NavStyles = ({ isActive }) => {
    return {
      color: isActive ? "black" : "gray",
      borderBottom: isActive ? "4px solid #007AFF" : "none",
      textDecoration: "none",
      marginTop: "3%",
      marginLeft: "4%",
    };
  };

export {
    mainDiv,
    responsiveDiv,
    NavStyles,
    appBar,
    responsiveNavStyles,
    avatarDiv
}
