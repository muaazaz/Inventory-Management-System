import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "../../Components/Shared/Input/Input";
import "./editUser.css";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editUser, getUserDetails } from "../../Redux/user/userAction";
import { imageTextStyles, imageUploadStyles, registerCancelButton, registerHeaderStyles, registerMainStyles, registerSaveButton } from "./styles";
import PhotoUpload from "../../Components/Shared/PhotoUpload/PhotoUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const EditUser = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
  }),
    [error, setError] = useState(""),
    { id } = useParams(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { userData } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getUserDetails(id))
    if (userData.userDetails) {
      setFormData({
        ...formData,
        name: userData.userDetails.name,
        image: userData.userDetails.photo,
        email: userData.userDetails.email,
        contactNo: userData.userDetails.contactNo
      })
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({ id, formData }))
    navigate(-1)
  };
  return (
    <>
      {userData.userDetails &&
        <Box component="form" id="create-user" sx={registerMainStyles} onSubmit={handleSubmit}>
          <Box sx={registerHeaderStyles}>
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
              sx={registerCancelButton}
              onClick={() => {
                navigate(-1)
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={registerSaveButton}
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
                {"Profile  Photo"}
                <span className="asteric">*</span>
              </Typography>
              <Typography sx={{ textAlign: "center" }} variant="caption" noWrap>
                {"Upload a high res picture with clear face"}
              </Typography>
            </Box>
            <PhotoUpload setImage={(value) => setFormData({
              ...formData,
              image: value
            })} />
          </Box>
          <Divider />
          {error && <Typography variant="content">Error: {error}</Typography>}
          <Input
            name={"Name"}
            placeHolder={"Full Name"}
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
              setError("")
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
              setError("")
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
              setError("")
            }}
          />
          <Box>
          </Box>
        </Box>
      }
    </>
  );
};

export default EditUser;
