import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { addButton, divider, headerDiv, headerText, main, searchStyles } from "./styles";
import Tables from "../../Components/Shared/Tables/Tables";
import { departmentLabel } from "../../Constant/tablesData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments, searchDepartments } from "../../Redux/department/departmentAction";

const Department = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    {departmentData} = useSelector((state)=>state)


  useEffect(()=>{
    dispatch(getDepartments())
  },[dispatch])
  
  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
      <Typography sx={headerText}>Departments</Typography>
        <Box component="form" sx={searchStyles}>
          <InputBase
            sx={{ textAlign: "center", m: 1 }}
            placeholder="Search something..."
            onChange={(e) => {
              dispatch(searchDepartments(e.target.value))
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "5%" }}
            color="primary"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Button
          startIcon={<AddIcon />}
          size="large"
          sx={addButton}
          color="success"
          variant="contained"
          disableElevation
          onClick={() => {
            navigate("create");
          }}
        >
          {" "}
          ADD
        </Button>
      </Box>
      <Divider sx={divider} />
      <Tables
        label={departmentLabel}
        rowsPerPage={5}
        hidden={false}
        viewRoute={"details/"}
        data={departmentData.departments ? departmentData.departments : []}
      />
    </Box>
  );
};

export default Department;
