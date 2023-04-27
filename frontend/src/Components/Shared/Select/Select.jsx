import { Box, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { dividerStyles, mainDiv, selectStyles, textDiv } from "./styles";

const Select = ({
  noLabel,
  label,
  menuItems,
  country,
  disabled,
  value,
  defaultValue,
  html,
  onChange,
  selfValue,
  divider,
}) => {
  const width = noLabel ? "100%" : "60%"
  useEffect(() => {}, [menuItems]);
  return (
    <>
      <Box sx={mainDiv}>
        {!noLabel && (
          <Box sx={textDiv}>
            <Typography>{label}</Typography>
          </Box>
        )}
        {menuItems && (
          <Box sx={{ width }}>
            <TextField
              select
              variant="outlined"
              sx={selectStyles}
              defaultValue={""}
              value={defaultValue}
              label={label}
              onChange={onChange}
              name={label}
              disabled={disabled}
            >
              <MenuItem defaultChecked selected value={defaultValue}>{defaultValue}</MenuItem>
              {country &&
                menuItems.map((item, i) => (
                  <MenuItem key={i} value={item.iso2 + "-" + item.name}>
                    {item.name}
                  </MenuItem>
                ))}

              {!country &&
                menuItems.map((item, i) => (
                  <MenuItem key={i} value={selfValue ? item : item[value]}>
                    {selfValue ? item : item[html]}
                  </MenuItem>
                ))}
            </TextField>
          </Box>
        )}
      </Box>
      {divider && <Divider sx={dividerStyles} />}
    </>
  );
};

Select.defaultProps = {
  country: false,
  disabled: false,
  noLabel: false,
  divider: false,
  defaultValue: "",
  selfValue: false
};

export default Select;
