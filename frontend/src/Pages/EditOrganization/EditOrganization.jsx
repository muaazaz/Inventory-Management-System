import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../Components/Shared/Input/Input";
import Select from "../../Components/Shared/Select/Select";
import { editOrganization, getOrganizationDetails } from "../../Redux/organization/organizationAction";
import { getCities, getCountries } from "../../utils/addressRequests";
import { CancelButton, HeaderStyles, imageTextStyles, imageUploadStyles, mainDiv, SaveButton } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoUpload from "../../Components/Shared/PhotoUpload/PhotoUpload";

const EditOrganization = ({ image, setFormId }) => {
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
    [disabled, setDisabled] = useState(true),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    {id}= useParams(),
    {orgData} = useSelector((state)=>state)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editOrganization({id, formData}))
    navigate(-1)
  };

  const handleCountrySelect = (e) => {
    const country = e.target.value.split("-");
    setCities(getCities(country[0]));
    setDisabled(false)
    setFormData({
      ...formData,
      country: country[1],
    });
  };

  useEffect(() => {
    dispatch(getOrganizationDetails(id))
    if(orgData.organizationDetail){
        const location = orgData.organizationDetail.address.split(',')
        setFormData({
            ...formData,
            name: orgData.organizationDetail.name,
            image: orgData.organizationDetail.photo,
            email: orgData.organizationDetail.email,
            bio: orgData.organizationDetail.bio,
            address: location[0],
            city: location[1],
            country: location[2],
            zip: location[3],
            representativeName: orgData.organizationDetail.representativeName,
            representativeContactNo: orgData.organizationDetail.representativeContactNo
        })
    }
  },[dispatch]);

  return (
    <Box component="form" sx={mainDiv} onSubmit={handleSubmit}>
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
            {"Organization Logo"}
            <span className="asteric">*</span>
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="caption" noWrap>
            {"Upload image with minimum resolution of 800x800px."}
          </Typography>
        </Box>
        <PhotoUpload setImage={(image)=>{setFormData({
          ...formData,
          image: image
        })}}/>
      </Box>
      <Divider sx={{ margin: "2% 0" }} />
      <Input
        name={"Name of Organization"}
        placeHolder={"Name of Organization"}
        value={formData.name}
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
        value={formData.email}
        onChange={(e) => {
          setFormData({
            ...formData,
            email: e.target.value,
          });
        }}
      />
      <Input
        textarea={true}
        name={"Bio"}
        rows={"10"}
        columns={"63"}
        value={formData.bio}
        placeHolder={"Short Bio here..."}
        onChange={(e) => {
          setFormData({
            ...formData,
            bio: e.target.value,
          });
        }}
      />
      <Input
        name={"Address"}
        placeHolder={"Address"}
        value={formData.address}
        divider={false}
        onChange={(e) => {
          setFormData({
            ...formData,
            address: e.target.value,
          });
        }}
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
        defaultValue={formData.city}
        label={"City"}
        disabled={disabled}
        value={"name"}
        html={"name"}
        onChange={(e) => {
          setFormData({
            ...formData,
            city: e.target.value,
          });
        }}
      />
      <Input
        name={"Zip Code"} 
        value={formData.zip}
        placeHolder={"Zip Code"} 
        onChange={(e) => {
          setFormData({
            ...formData,
            zip: e.target.value,
          });
        }}/>
      <Input
        value={formData.representativeName}
        placeHolder={"Representative Name"}
        label={true}
        name={"Representative Name"}
        onChange={(e) => {
          setFormData({
            ...formData,
            representativeName: e.target.value,
          });
        }}
      />
      <Input
        value={formData.representativeContactNo}
        placeHolder={"Representative Contact No."}
        label={true}
        name={"Representative Contact No."}
        divider={false}
        onChange={(e) => {
          setFormData({
            ...formData,
            representativeContactNo: e.target.value,
          });
        }}
      />
    </Box>
  );
};

export default EditOrganization;
