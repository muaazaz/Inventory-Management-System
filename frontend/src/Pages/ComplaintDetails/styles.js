const complaintMainStyles = {
    display: "flex",
    flexDirection: "column",
    width: { md: "85%", xs: "auto" },
    margin: { md: "auto", xs: "0" },
    backgroundColor: "white",
    boxShadow: { md: "1px 0px 20px 1px grey", xs: "none" },
    borderRadius: "10px",
    padding: "1%",
    position: "relative",
  },
  complaintViewText = {
    fontSize: "2em",
    fontWeight: "500",
  },
  complaintButton = {
    width: "15%",
    position: {md: "absolute", xs: "static"}, 
    right: "2%",
    backgroundColor: "#00A572",
  },
  complaintViewHeader = {
    display: "flex",
    position: "relative",
    flexWrap: {md: "noWrap", xs:"wrap"},
  },
  complaintUserText = {
    fontSize: "1.5em",
    fontWeight: "500",
  },
  attachmentsContent = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: {md: "noWrap", xs:"wrap"},
    m: 4,
  },
  complaintAttachmentDiv = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",    flexWrap: {md: "noWrap", xs:"wrap"},
  },
  pendingStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ml: 3,
    width: "5%",
    backgroundColor: "#1974D2",
    textAlign: "center",
    color: "white",
    fontWeight: 600,
    borderRadius: "10px",
  },
  dateStyles = {
    display: "flex",
    alignItems: "center",
    margin: "0 1%"
  },
  attachmentText = {
    margin: "1%"
  }

export {
  complaintMainStyles,
  complaintViewText,
  complaintButton,
  complaintViewHeader,
  complaintUserText,
  complaintAttachmentDiv,
  attachmentsContent,
  pendingStyles,
  dateStyles,
  attachmentText
};
