export const mapData = (props) => {
  let data = [];
  if (props.dualLineChart) {
    props.data?.forEach((obj) => {
      data.push([obj[props.defaultOpt], obj[props.opt1], obj[props.opt2]]);
    });
    return (data = props.label?.concat(data));
  } else {
    props.data?.forEach((obj) => {
      data.push([obj.month, obj.count]);
    });
    return (data = props.label?.concat(data));
  }
};
