import { Box, Typography } from "@mui/material";
import { detailStyle, labelStyle, mainDiv } from "./styles";

const ViewProfileDetails = ({label, detail}) => {
    return ( 
        <Box sx={mainDiv}>
            <Typography sx={labelStyle} variant="content">{label}</Typography>
            <Typography sx={detailStyle} variant="content">{detail}</Typography>
        </Box>
     );
}
 
export default ViewProfileDetails;