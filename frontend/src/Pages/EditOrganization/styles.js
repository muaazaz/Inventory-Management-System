const mainDiv = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: {md: "10px", xs: "none"},
    boxShadow: {md: "1px 1px 10px 1px grey", xs: "none"},
    width: {md: "90%", xs: "100%"},
    margin: "auto",
    position: "relative",
    padding: "1%"
},
imageUploadStyles = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  mb: 4,
},
imageTextStyles = {
  display: "flex",
  flexDirection: "column",
  margin: "0 1%",
},
HeaderTextStyles = {
  display: "flex",
  flexWrap: "wrap",
  fontWeight: "600",
},
HeaderStyles = {
  display: "flex",
  flexWrap: "wrap"
},
CancelButton = {
  color: "GrayText",
  backgroundColor: "lightGray",
  width: "5%",
  height: "3%",
  padding: "0.8%",
  position: { md: "absolute", xs: "static" },
  right: "10%",
},
SaveButton = {
  backgroundColor: "#00A572",
  width: "5%",
  height: "3%",
  padding: "0.8%",
  position: { md: "absolute", xs: "static" },
  right: "2%",
};


export {
    mainDiv,
    SaveButton,
    CancelButton,
    HeaderStyles,
    HeaderTextStyles,
    imageTextStyles,
    imageUploadStyles
}