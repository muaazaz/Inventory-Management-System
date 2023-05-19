import { Alert, Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "../../Components/Shared/Input/Input";
import Select from "../../Components/Shared/Select/Select";
import { getCities, getCountries } from "../../utils/addressRequests";
import { useDispatch, useSelector } from "react-redux"
import { createOrganization } from "../../Redux/organization/organizationAction";
import { useNavigate } from "react-router-dom"
import { CancelButton, HeaderStyles, HeaderTextStyles, MainStyles, SaveButton, imageTextStyles, imageUploadStyles } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoUpload from "../../Components/Shared/PhotoUpload/PhotoUpload";

const CreateOrg = ( ) => {
  const [formData, setFormData] = useState({
      name: "",
      image: "",
      email: "",
      bio: "",
      address: "",
      country: "",
      city: "",
      zip: "",
      representativeName: "",
      representativeContactNo: "",
    }),
    [cities, setCities] = useState([]),
    [error, setError] = useState(""),
    [disabled, setDisabled] = useState(true),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    {orgData} = useSelector((state)=>state)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createOrganization(formData))
    navigate(-1)
  };

  const handleCountrySelect = (e) => {
    const country = e.target.value.split("-");
    setFormData({...formData, city: ""})
    setCities(getCities(country[0]));
    setDisabled(false)
    setFormData({
      ...formData,
      country: country[1],
    });
  };

  useEffect(() => {
    if(orgData.error){
      setError(orgData.error)
    }else{
      setError("")
    }
  },[cities, dispatch]);

  return (
    <Box component="form" id="create-organization" sx={MainStyles} onSubmit={handleSubmit}>
      <Box sx={HeaderStyles}>
        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          sx={{ color: "GrayText", marginRight: "2%" }}
          onClick={() => {
           navigate(-1)
          }}
        >
          Back
        </Button>
        <Typography variant="h3" sx={HeaderTextStyles}>
          Add New {" Organization"}
        </Typography>
        <Button
          sx={CancelButton}
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={SaveButton}
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider sx={{ margin: "2% 0" }} />
      <Box sx={imageUploadStyles}>
        <Avatar
          src={formData.image ? formData.image : "/Upload.png"}
          variant="rounded"
          sx={{ width: "8%", height: "8%" }}
        ></Avatar>
        <Box sx={imageTextStyles}>
          <Typography sx={{ fontWeight: "700" }} variant="h5" noWrap>
            {"Organization's Logo"}
            <span className="asteric">*</span>
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="caption" noWrap>
            {"Upload a high res picture for organization logo"}
          </Typography>
        </Box>
        <PhotoUpload setImage={(value)=>setFormData({
          ...formData,
          image: value
        })}/>
      </Box>
      <Divider />
      {error && <Alert severity="error">{error}</Alert>}
      <Input
        name={"name"}
        label={"Name of Organization"}
        placeHolder={"Name of Organization"}
        setFormData={setFormData}
      />
      <Input
        name={"email"}
        label={"Email Address"}
        placeHolder={"Email Address"}
        setFormData={setFormData}
      />
      <Input
        textarea={true}
        name={"bio"}
        label={"Bio"}
        rows={"10"}
        columns={"63"}
        placeHolder={"Short Bio here..."}
        setFormData={setFormData}
      />
      <Input
        name={"Address"}
        placeHolder={"Address"}
        divider={false}
        setFormData={setFormData}
      />
      <Select
        country={true}
        defaultValue={formData.country}
        menuItems={getCountries()}
        label={"Country"}
        onChange={handleCountrySelect}
      />
      <Select
        menuItems={cities}
        label={"City"}
        name={"city"}
        disabled={disabled}
        defaultValue={formData.city}
        value={"name"}
        html={"name"}
        setFormData={setFormData}
      />
      <Input 
        name={"zip"} 
        label={"Zip Code"} 
        placeHolder={"Zip Code"} 
        setFormData={setFormData}
      />
      <Input
        placeHolder={"Representative Name"}
        label={"Representative Name"}
        name={"representativeName"}
        setFormData={setFormData}
      />
      <Input
        placeHolder={"Representative Contact No."}
        label={"Representative Contact No."}
        name={"representativeContactNo"}
        divider={false}
        setFormData={setFormData}
      />
    </Box>
  );
};

export default CreateOrg;
