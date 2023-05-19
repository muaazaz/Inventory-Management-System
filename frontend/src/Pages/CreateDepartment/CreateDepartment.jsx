import { Alert, Box, Button, Divider, Typography } from "@mui/material";
import { createMainDiv, header, headerText, saveButton, cancelButton } from "./styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Input from "../../Components/Shared/Input/Input";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { createDepartment } from "../../Redux/department/departmentAction";

const CreateDepartment = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      name: "",
      email: "",
      contactNo: ""
    }),
    [error, setError] = useState("Some Error"),
    dispatch = useDispatch(),
    {departmentData} = useSelector((state)=>state)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDepartment(formData))
    navigate(-1)
  };
  useEffect(()=>{
    if(departmentData.error){
      setError(departmentData.error)
    }else{
      setError("")
    }
  },[dispatch])
  return (
    <Box sx={createMainDiv}>
      <Box sx={header}>
        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          sx={{ color: "GrayText", marginRight: "2%" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <Typography variant="content" sx={headerText}>
          Add New Department
        </Typography>
        <Button
          sx={cancelButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={saveButton}
          form="department-form"
          type="submit"
        >
          Save
        </Button>
      </Box>
      {error && <Alert sx={{m: 3}} severity="error">{error}</Alert>}
      <Divider sx={{margin: "2% 0"}}/>
      <Box component="form" id="department-form" onSubmit={handleSubmit}>
        <Input
          name={"name"}
          label={"Name"}
          placeHolder={"name of department"}
          setFormData={setFormData}
        />
        <Input
          name={"email"}
          label={"Email Address"}
          placeHolder={"Email Address"}
          setFormData={setFormData}
        />
        <Input
          name={"Contact No."}
          placeHolder={"Contact No."}
          setFormData={setFormData}
        />
      </Box>
    </Box>
  );
};

export default CreateDepartment;
