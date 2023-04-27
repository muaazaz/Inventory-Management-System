import { Avatar, Box, Button, Divider, Typography } from "@mui/material";

import {
  cancelButton,
  dividerStyles,
  imageTextStyles,
  imageUploadStyles,
  mainDivStyles,
  saveButton,
  tableHeader,
} from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../../Components/Shared/Input/Input";
import { ownInventoryLabel } from "../../Constant/dummyData";
import Tables from "../../Components/Shared/Tables/Tables";
import PhotoUpload from "../../Components/Shared/PhotoUpload/PhotoUpload";
import "./employeeEdit.css"
import { useDispatch, useSelector } from "react-redux";
import { editUser, getUserDetails } from "../../Redux/user/userAction";
import { getCookiesData } from "../../utils/handleCookies";

const EmployeeEdit = () => {
  const navigate = useNavigate(),
    {id} = getCookiesData(),
    dispatch = useDispatch(),
    {userDetails} = useSelector((state)=>state.userData),
    [formData, setFormData] = useState({
      image: "",
      name: "",
      designation: "",
      contactNo: "",
      education: "",
      companyExperience: "",
      totalExperience: "",
    });

    useEffect(()=>{
      dispatch(getUserDetails(id))
      if(userDetails){
        setFormData({
          ...formData,
          image: userDetails.photo,
          name: userDetails.name,
          contactNo: userDetails.contactNo,
          designation: userDetails.designation,
          education: userDetails.education,
          companyExperience: userDetails.companyExperience,
          totalExperience: userDetails.totalExperience
        })
      }
    },[dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({id, formData}))
    navigate(-1)
  };
  return (
    <Box sx={mainDivStyles}>
      <Box>
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
          form={"employee-form"}
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider sx={dividerStyles} />
      <Box sx={imageUploadStyles}>
        <Avatar
          src={formData.image ? formData.image : "/Upload.png"}
          variant="rounded"
          sx={{ width: "8%", height: "8%" }}
        ></Avatar>
        <Box sx={imageTextStyles}>
          <Typography sx={{ fontWeight: "700" }} variant="h5" noWrap>
            {"Profile Picture"}
            <span className="asteric">*</span>
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="caption" noWrap>
            {"Upload a high res picture with clear face"}
          </Typography>
        </Box>
        <PhotoUpload
          setImage={(image) => {
            setFormData({
              ...formData,
              image,
            });
          }}
        />
      </Box>
      <Divider />
      <Box component="form" id="employee-form" onSubmit={handleSubmit}>
        <Input
          name={"Full Name"}
          placeHolder={"Full Name"}
          value={formData.name}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
        />
        <Input
          name={"Contact Number"}
          placeHolder={"Contact Number"}
          value={formData.contactNo}
          onChange={(e) => {
            setFormData({
              ...formData,
              contactNo: e.target.value,
            });
          }}
        />
        <Input
          name={"Designation"}
          placeHolder={"Enter your designation"}
          value={formData.designation}
          onChange={(e) => {
            setFormData({
              ...formData,
              designation: e.target.value,
            });
          }}
        />
        <Input
          name={"Education"}
          placeHolder={"Enter you education"}
          value={formData.education}
          onChange={(e) => {
            setFormData({
              ...formData,
              education: e.target.value,
            });
          }}
        />
        <Input
          name={"Company Experience(years)"}
          placeHolder={"Company Experience"}
          value={formData.companyExperience}
          onChange={(e) => {
            setFormData({
              ...formData,
              companyExperience: e.target.value + " years",
            });
          }}
        />
        <Input
          name={"Total Experience(years)"}
          placeHolder={"Total Experience"}
          value={formData.totalExperience}
          onChange={(e) => {
            setFormData({
              ...formData,
              totalExperience: e.target.value + " years",
            });
          }}
        />
      </Box>
      <Typography sx={tableHeader}>Inventory</Typography>
      <Tables
        label={ownInventoryLabel}
        rowsPerPage={4}
        hidden={true}
        viewRoute={"/complaints/details/"}
        data={userDetails ? userDetails.inventory : []}
        view={false}
      />
    </Box>
  );
};

export default EmployeeEdit;
