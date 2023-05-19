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
        label={"Name of Organization"}
        name={"name"}
        placeHolder={"Name of Organization"}
        value={formData.name}
        setFormData={setFormData}
        formData={formData}
      />
      <Input
        label={"Email Address"}
        name={"email"}
        placeHolder={"Email Address"}
        value={formData.email}
        setFormData={setFormData}
        formData={formData}
      />
      <Input
        textarea={true}
        label={"Bio"}
        name={"bio"}
        rows={"10"}
        columns={"63"}
        value={formData.bio}
        placeHolder={"Short Bio here..."}
        setFormData={setFormData}
        formData={formData}
      />
      <Input
        name={"address"}
        label={"Address"}
        placeHolder={"Address"}
        value={formData.address}
        divider={false}
        setFormData={setFormData}
        formData={formData}
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
        name={"city"}
        disabled={disabled}
        value={"name"}
        html={"name"}
        setFormData={setFormData}
        formData={formData}
      />
      <Input
        name={"zip"}
        label={"Zip Code"} 
        value={formData.zip}
        placeHolder={"Zip Code"} 
        setFormData={setFormData}
        formData={formData}
      />
      <Input
        value={formData.representativeName}
        placeHolder={"Representative Name"}
        name={"representativeName"}
        label={"Representative Name"}
        setFormData={setFormData}
        formData={formData}
      />
      <Input
        value={formData.representativeContactNo}
        placeHolder={"Representative Contact No."}
        name={"representativeContactNo"}
        label={"Representative Contact No."}
        divider={false}
        setFormData={setFormData}
        formData={formData}
      />
    </Box>
  );
};

export default EditOrganization;
