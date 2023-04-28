import { Box, Button, Divider, Typography } from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import {
  cancelButton,
  dividerStyles,
  headerDiv,
  headerText,
  mainDivStyles,
  multiSelectDiv,
  multiSelectLabel,
  saveButton,
} from "./styles";
import "./createVendor.css"
import Input from "../../Components/Shared/Input/Input";
import Select from "../../Components/Shared/Select/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesSelect } from "../../Redux/category/categoryAction";
import { createVendor } from "../../Redux/vendor/vendorAction";

const CreateVendor = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      name: "",
      contactNo: "",
      categoryId: ""
    }),
    [subCategories, setSubCategories] = useState([]),
    [subCategroiesSelect, setSubCategoriesSelect] = useState([]),
    [disabled, setDisabled] = useState(true),
    dispatch = useDispatch(),
    {categoryData, vendorData} = useSelector((state)=>state)

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempArray = []
    subCategories.forEach((category)=>{
      tempArray.push(category.value)
    })
    dispatch(createVendor({...formData, categoriesId: tempArray}))
    navigate("/vendors")
  }

  useEffect(()=>{
    dispatch(getCategoriesSelect())
    if(formData.categoryId){
      categoryData.categories.forEach((category)=>{
        if(category.id === formData.categoryId) setSubCategoriesSelect(category.childern)
      })
    }
  },[dispatch, formData])

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
        <Typography sx={headerText}>Add Vendor</Typography>
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
          form={"vendor-form"}
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider sx={dividerStyles} />
      <Box component="form" onSubmit={handleSubmit} id="vendor-form">
        <Input
          name={"Name"}
          placeHolder={"vendor name"}
          divider={true}
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
          divider={true}
          onChange={(e) => {
            setFormData({
              ...formData,
              contactNo: e.target.value,
            });
          }}
        />
        <Select
          label={"Category"}
          menuItems={categoryData.categories}
          defaultValue={formData.categoryId}
          value={"id"}
          html={"name"}
          divider={true}
          onChange={(e) => {
            setFormData({
              ...formData,
              categoryId: e.target.value,
            });
            setDisabled(false)
          }}
        />
        <Box sx={multiSelectDiv}>
        <Typography sx={multiSelectLabel}>Sub Categories</Typography>
        <MultiSelect
          options={subCategroiesSelect}
          disabled={disabled}
          value={subCategories}
          onChange={setSubCategories}
          labelledBy="Sub Categories"
          className="Sub-Categories"
        />
        </Box>
        <Divider sx={{m: "2% 0"}}/>
      </Box>
    </Box>
  );
};

export default CreateVendor;
