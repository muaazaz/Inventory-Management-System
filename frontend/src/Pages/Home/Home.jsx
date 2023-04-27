import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [to, setTo] = useState(""),
  data = useSelector((state)=>state.userValidation)
  useEffect(() => {
    if (data.token) {
      setTo("/dashboard");
    } else {
      setTo("/login");
    }
  }, [data, to]);
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
      <Link to={to} className="home-link">
        View Inventory
      </Link>
    </div>
  );
};

export default Home;
