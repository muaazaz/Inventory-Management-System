import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import ReactFileReader from "react-file-reader";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
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
import { useState } from "react";
import Input from "../../Components/Shared/Input/Input";
import Select from "../../Components/Shared/Select/Select";
import { data, dummySelect, ownInventoryLabel } from "../../Constant/dummyData";
import Tables from "../../Components/Shared/Tables/Tables";

const EmployeeEdit = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      image: "",
      name: "",
      email: "",
      designation: "",
      department: "",
      contactNo: "",
      education: "",
      companyExperience: "",
      totalExperience: "",
    });
  const handleFile = (file) => {
    setFormData({
      ...formData,
      image: file.base64,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        <ReactFileReader
          fileTypes={[".jpg", ".png", ".jpeg"]}
          base64={true}
          multipleFiles={false}
          handleFiles={handleFile}
        >
          <Button
            className="btn"
            startIcon={<AddPhotoAlternateOutlinedIcon />}
            variant="contained"
          >
            Upload
          </Button>
        </ReactFileReader>
      </Box>
      <Divider/>
      <Box component="form" id="employee-form" onSubmit={handleSubmit}>
        <Input
          name={"Full Name"}
          placeHolder={"Full Name"}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
        />
        <Input
          name={"Email Address"}
          placeHolder={"Email Address"}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value,
            });
          }}
        />
        <Input
          name={"Designation"}
          placeHolder={"Enter your designation"}
          onChange={(e) => {
            setFormData({
              ...formData,
              designation: e.target.value,
            });
          }}
        />
        <Select
          label={"Department"}
          menuItems={dummySelect}
          value={"name"}
          html={"name"}
          divider={true}
          onChange={(e) => {
            setFormData({
              ...formData,
              department: e.target.value,
            });
          }}
        />
        <Input
          name={"Contact Number"}
          placeHolder={"Contact Number"}
          onChange={(e) => {
            setFormData({
              ...formData,
              contactNo: e.target.value,
            });
          }}
        />
        <Input
          name={"Education"}
          placeHolder={"Enter you education"}
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
        data={data}
        view={false}
      />
    </Box>
  );
};

export default EmployeeEdit;
