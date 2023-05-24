import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./home.css";
import { dashboardRoute } from "../../Constant/componentConstants";

const Home = () => {
  return (
    <div className="home">
      <Box
        sx={{
          display: "flex",
          width: "35%",
          mb: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/gigalabs.png" alt="" />
      </Box>
      <Box>
        <Typography variant="h5" align="center">
          Simple, All-In-One Inventory Management Software
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/IMS_Home1.png" alt=""></img>
        <img src="/IMS_Home2.png" alt=""></img>
      </Box>
      <Link to={dashboardRoute} className="home-link">
        View Inventory
      </Link>
    </div>
  );
};

export default Home;
