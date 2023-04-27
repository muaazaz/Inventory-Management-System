import { Chart } from "react-google-charts";
import "./barChart.css"
import { Box } from "@mui/material";
import { mainDiv } from "./styles";

const BarChart = (props) => {
  let data = []
  props.data?.forEach((obj) => {
    data.push([obj.month, obj.count])
  })
  data = props.label?.concat(data)

  const options = {
    chart:{
      title: "Analytics",
    },
    width: "100%",
    height: 500,
    bar: {groupWidth: "20%"},
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
