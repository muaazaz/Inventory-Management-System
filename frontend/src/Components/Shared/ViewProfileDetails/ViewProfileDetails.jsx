import { Box, Typography } from "@mui/material";
import { detailStyle, labelStyle, mainDiv } from "./styles";

const ViewProfileDetails = ({label: str, detail}) => {
    const label = str.charAt(0).toUpperCase() + str.slice(1)  
    return ( 
        <Box sx={mainDiv}>
            <Typography sx={labelStyle}>{label}</Typography>
            <Typography sx={detailStyle}>{detail}</Typography>
        </Box>
     );
}
 
export default ViewProfileDetails;