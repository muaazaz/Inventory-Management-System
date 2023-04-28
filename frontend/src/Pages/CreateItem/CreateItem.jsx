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
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCategoriesSelect } from "../../Redux/category/categoryAction";
import { getVendors } from "../../Redux/vendor/vendorAction";
import { createItem } from "../../Redux/item/itemAction";

const CreateItem = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      name: "",
      serialNo: "",
      description: "",
      price: "",
      categoryId: "",
      subCategoryId: "",
      vendorId: ""
    }),
    [subCategories, setSubCategories] = useState([]),
    [disabled, setDisabled] = useState(true),
    dispatch = useDispatch(),
    {categoryData, vendorData} = useSelector((state)=>state)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createItem(formData))
    navigate("/inventory")
  };
  useEffect(()=>{
    dispatch(getCategoriesSelect())
    if(formData.categoryId){
      categoryData.categories.forEach((category)=>{
        if(category.id === formData.categoryId) setSubCategories(category.childern)
      })
    }
    if(formData.subCategoryId){
      dispatch(getVendors(formData.subCategoryId))
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
          form={"item-form"}
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider sx={dividerStyles} />
      <Box component="form" onSubmit={handleSubmit} id="item-form">
        <Input
          name={"Item Name"}
          placeHolder={"Item Name"}
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
        <Select
            label={"Category"}
            menuItems={categoryData?.categories}
            defaultValue={formData.categoryId}
            value={"id"}
            html={"name"}
            onChange={(e)=>{
              setFormData({
                ...formData,
                categoryId: e.target.value
              })
              setDisabled(false)
          }}
        />
         <Select
            label={"Sub Category"}
            menuItems={subCategories}
            defaultValue={formData.subCategoryId}
            value={"value"}
            html={"label"}
            disabled={disabled}
            divider={true}
            onChange={(e)=>{setFormData({
                ...formData,
                subCategoryId: e.target.value
            })}}
        />
        <Input
          name={"Price"}
          placeHolder={"Enter item price"}
          onChange={(e) => {
            setFormData({
              ...formData,
              price: parseInt(e.target.value),
            });
          }}
        />
         <Select
            label={"Vendor"}
            menuItems={vendorData?.vendors? vendorData.vendors : []}
            disabled={vendorData?.vendors ? false : true}
            defaultValue={formData.vendorId}
            value={"id"}
            html={"name"}
            divider={true}
            onChange={(e)=>{setFormData({
                ...formData,
                vendorId: e.target.value
            })}}
        />
      </Box>
    </Box>
  );
};

export default CreateItem;
