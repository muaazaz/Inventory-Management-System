import { Box, Divider, Typography } from "@mui/material";
import { detailsDiv, div, labelDiv, labelText } from "./styles";

const ViewContent = ({ label: str, detail, divider }) => {
  const label = str.charAt(0).toUpperCase() + str.slice(1)  
  return (
    <>
      <Box sx={div}>
        <Box sx={labelDiv}>
          <Typography variant="content" sx={labelText}>
            {label}
          </Typography>
        </Box>
        <Box sx={detailsDiv}>
          <Typography variant="content">{detail}</Typography>
        </Box>
      </Box>
      {divider && <Divider sx={{ mt: 4, mb: 2 }} />}
    </>
  );
};
ViewContent.defaultProps = {
  divider: false,
};

export default ViewContent;
