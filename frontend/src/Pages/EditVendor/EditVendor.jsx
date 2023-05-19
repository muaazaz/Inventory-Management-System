import { Box, Button, Divider, Typography } from "@mui/material";
import {
  cancelButton,
  dividerStyles,
  headerDiv,
  headerText,
  mainDivStyles,
  saveButton,
} from "./styles";
import Input from "../../Components/Shared/Input/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editVendor, getVendorDetails } from "../../Redux/vendor/vendorAction";

const EditVendor = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      name: "",
      contactNo: ""
    }),
    {id} = useParams(),
    dispatch = useDispatch(),
    {vendorDetail} = useSelector((state)=>state.vendorData)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editVendor({id, formData}))
    navigate(-1)
  }

  useEffect(()=>{
    dispatch(getVendorDetails(id))
    if(vendorDetail){
      setFormData({
        ...formData,
        name: vendorDetail.name,
        contactNo: vendorDetail.contactNo
      })
    }
  },[dispatch])

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
          name={"name"}
          label={"Name"}
          placeHolder={"vendor name"}
          value={formData.name}
          divider={true}
          setFormData={setFormData}
          formData={formData}
        />
        <Input
          name={"contactNo"}
          label={"Contact Number"}
          placeHolder={"Contact Number"}
          value={formData.contactNo}
          divider={true}
          setFormData={setFormData}
          formData={formData}
        />
      </Box>
    </Box>
  );
};

export default EditVendor;
