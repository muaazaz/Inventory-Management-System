import { Box, Divider, Typography } from "@mui/material";
import { detailsDiv, nameText, textContent } from "./styles";
import "./viewImage.css";

const ViewImage = ({ image, name, details, divider }) => {
  return (
    <>
      <Box sx={detailsDiv}>
        <img src={image ? image : "/Upload.png"} alt="" className="image"></img>
        <Box sx={textContent}>
          <Typography sx={nameText}>{name}</Typography>
          {details.map((item, i) => (
            <Typography key={i} variant="content">
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
      {divider && <Divider sx={{ mt: 4, mb: 2 }} />}
    </>
  );
};
ViewImage.defaultProps = {
  divider: false
}

export default ViewImage;
