import { Box, Button, Divider, Typography } from "@mui/material";
import { createMainDiv, header, headerText, saveButton, cancelButton } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Input from "../../Components/Shared/Input/Input";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { editDepartment, getDepartmentDetails } from "../../Redux/department/departmentAction";

const EditDepartment = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      name: "",
      email: "",
      contactNo: ""
    }),
    {id} = useParams(),
    dispatch = useDispatch(),
    {departmentData} = useSelector((state)=>state)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDepartment({id, formData}))
    navigate(-1)
  };
  useEffect(()=>{
    if(departmentData.departmentDetail){
      setFormData({
        ...formData,
        name: departmentData.departmentDetail.name,
        email: departmentData.departmentDetail.email,
        contactNo: departmentData.departmentDetail.contactNo
      })
    }
    dispatch(getDepartmentDetails(id))
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
      <Divider sx={{margin: "2% 0"}}/>
      <Box component="form" id="department-form" onSubmit={handleSubmit}>
        <Input
          label={"Name"}
          name={"name"}
          value={formData.name}
          placeHolder={"name of department"}
          setFormData={setFormData}
        />
        <Input
          label={"Email Address"}
          name={"email"}
          placeHolder={"Email Address"}
          value={formData.email}
          setFormData={setFormData}
        />
        <Input
          name={"contactNo"}
          label={"Contact No."}
          placeHolder={"Contact No."}
          value={formData.contactNo}
          setFormData={setFormData}
        />
      </Box>
    </Box>
  );
};

export default EditDepartment;
