import { Card, CardContent, Typography } from "@mui/material";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import "./cards.css"

const Cards = ({title, amount, info, color}) => {
    return ( 
        <>
            <Card id="stats-card">
                <CardContent>
                    <Typography 
                    gutterBottom
                    variant="p"
                    color="InfoText"
                    >
                    {title}
                    </Typography>
                    
                    <Typography 
                    gutterBottom
                    variant="h2"
                    color="MenuText"
                    >
                    {amount} <ArrowDropUpRoundedIcon fontSize="larger" color={color}/>
                    </Typography>
                    <Typography 
                    variant="span"
                    color="GrayText"
                    >
                    {info}
                    </Typography>
                </CardContent> 
            </Card>
        </>
     );
}
 
export default Cards;