import { Chart } from "react-google-charts";
import "./barChart.css"
import { Box } from "@mui/material";
import { mainDiv } from "./styles";

const BarChart = (props) => {
  let data = []
  let colors = props.dualLineChart ? ["#007FFF", "#00A572"] : []

  if(props.dualLineChart){
    props.data?.forEach((obj) => {
      data.push([obj[props.defaultOpt], obj[props.opt1], obj[props.opt2]])
    })
    data = props.label?.concat(data)
  }else{
    props.data?.forEach((obj) => {
      data.push([obj.month, obj.count])
    })
    data = props.label?.concat(data)
  }
  

  const options = {
    chart:{
      title: "Analytics",
    },
    colors,
    width: "100%",
    height: 500,
    bar: {groupWidth: "20%"},
    vAxis: {
      maxValue: 0,
    },
  }

  return (
    <Box sx={mainDiv}>
      <Chart
        data={data}
        options={options}
        chartType="Bar"
        legendToggle
      />
    </Box>
  );
};

export default BarChart;
