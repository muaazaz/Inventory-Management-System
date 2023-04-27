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
uploadDiv={
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "1%"
  },
  uploadImage={
      width: "8%",
      height: "100px",
      margin: "0.5%"
  },
saveButton = {
    backgroundColor: "#00A572",
    position: { md: "absolute", xs: "static" },
    right: "3%",
  },
  cancelButton = {
    color: "GrayText",
    backgroundColor: "lightGray",
    position: { md: "absolute", xs: "static" },
    right: "10%",
  },  header = {
    display: "flex",
    alignitems: "center",
    flexWrap: {md: "noWrap", xs:"wrap"},
  },
  imageUploadDiv = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  }
export {
    main,
    saveButton,
    cancelButton,
    header,
    imageUploadDiv,
    uploadDiv,
    uploadImage
}