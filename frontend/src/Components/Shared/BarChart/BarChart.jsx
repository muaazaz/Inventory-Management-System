import { Chart } from "react-google-charts";
import { Box, CircularProgress } from "@mui/material";
import { mainDiv } from "./styles";
import "./barChart.css";
import { useEffect, useState } from "react";

const BarChart = (props) => {
  let colors = props.dualLineChart ? ["#007FFF", "#00A572"] : ["#007FFF"];
  const [loading, setLoading] = useState(true);

  const callLoading = () =>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  }

  useEffect(() => {
    callLoading()
  }, []);

  const options = {
    chart:{
      title: "Analytics",
    },
    colors,
    width: "100%",
    height: 500,
    bar: {groupWidth: "20%"}
  };

  return (
    <Box sx={mainDiv}>
      {loading ? (
        <CircularProgress sx={{margin: "auto"}}/>
      ) : (
        <Chart data={props.data} options={options} chartType="Bar" legendToggle />
      )}
    </Box>
  );
};

export default BarChart;
