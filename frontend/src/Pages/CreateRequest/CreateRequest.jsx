import { Box, Button, Divider } from "@mui/material";
import {
  cancelButton,
  dividerStyles,
  headerDiv,
  mainDivStyles,
  saveButton,
} from "./styles";
import Input from "../../Components/Shared/Input/Input";
import Select from "../../Components/Shared/Select/Select"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { dummySelect } from "../../Constant/dummyData";

const CreateRequest = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      name: "",
      description: "",
      categoryId: "",
      type: "",
      subCategoryId: "",
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <Box sx={mainDivStyles}>
      <Box sx={headerDiv}>
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
          form={"request-form"}
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider sx={dividerStyles} />
      <Box component="form" onSubmit={handleSubmit} id="request-form">
        <Input
          name={"Item Name"}
          placeHolder={"Enter Item Name"}
          divider={true}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
        />
        <Input
          name={"Serial Number"}
          placeHolder={"Enter Serial Number"}
          divider={true}
          onChange={(e) => {
            setFormData({
              ...formData,
              serialNo: e.target.value,
            });
          }}
        />
        <Select
            label={"Category"}
            menuItems={dummySelect}
            value={"name"}
            html={"name"}
            onChange={(e)=>{setFormData({
                ...formData,
                categoryId: e.target.value
            })}}
        />
         <Select
            label={"Sub Category"}
            menuItems={dummySelect}
            value={"name"}
            html={"name"}
            divider={true}
            onChange={(e)=>{setFormData({
                ...formData,
                subCategoryId: e.target.value
            })}}
        />
         <Select
            label={"Request Type"}
            menuItems={dummySelect}
            value={"name"}
            html={"name"}
            divider={true}
            onChange={(e)=>{setFormData({
                ...formData,
                type: e.target.value
            })}}
        />
        <Input
          textarea={true}
          name={"Description"}
          rows={"10"}
          columns={"63"}
          placeHolder={"Enter description here..."}
          onChange={(e) => {
            setFormData({
              ...formData,
              description: e.target.value,
            });
          }}
        />
      </Box>
    </Box>
  );
};

export default CreateRequest;
