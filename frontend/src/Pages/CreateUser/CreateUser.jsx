import { Alert, Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "../../Components/Shared/Input/Input";
import Select from "../../Components/Shared/Select/Select";
import "./createUser.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../../Redux/organization/organizationAction";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../Redux/user/userAction";
import {
  imageTextStyles,
  imageUploadStyles,
  registerCancelButton,
  registerHeaderStyles,
  registerHeaderTextStyles,
  registerMainStyles,
  registerSaveButton,
} from "./styles";
import PhotoUpload from "../../Components/Shared/PhotoUpload/PhotoUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getDepartments } from "../../Redux/department/departmentAction";

const CreateUser = ({ user }) => {
  const [formData, setFormData] = useState({
      name: "",
      image: "",
      email: "",
      password: "",
      contactNo: "",
      privateEmail: "",
      organizationId: "",
      departmentId: "",
    }),
    [error, setError] = useState(""),
    [once, setOnce] = useState(false),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { orgData, userData, userValidation, departmentData } = useSelector(
      (state) => state
    );

  useEffect(() => {
    if(!once){
      userValidation.role === "superadmin"
      ? dispatch(getOrganizations())
      : dispatch(getDepartments());
      setOnce(true)
    }

    if (userData.error) {
      setError(userData.error);
    } else {
      setError("");
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    navigate("/user");
  };
  return (
    <Box
      component="form"
      id="create-user"
      sx={registerMainStyles}
      onSubmit={handleSubmit}
    >
      <Box sx={registerHeaderStyles}>
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
        <Typography variant="h3" sx={registerHeaderTextStyles}>
          Add New {userValidation.role === " admin" ? "Employee" : "Admin"}
        </Typography>
        <Button
          sx={registerCancelButton}
          onClick={() => {
            navigate(-1);
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
            {user + " Photo"}
            <span className="asteric">*</span>
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="caption" noWrap>
            {"Upload a high res picture with clear face"}
          </Typography>
        </Box>
        <PhotoUpload
          setImage={(value) =>
            setFormData({
              ...formData,
              image: value,
            })
          }
        />
      </Box>
      <Divider />
      {error && (
        <Alert sx={{ m: 3 }} severity="error">
          {error}
        </Alert>
      )}
      <Input
        name={"Name"}
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
            privateEmail: e.target.value,
          });
        }}
      />
      {user === "Admin's" ? (
        <Select
          label={"Organization"}
          menuItems={orgData.organizations}
          value={"id"}
          defaultValue={formData.organizationId}
          html={"name"}
          onChange={(e) => {
            setFormData({
              ...formData,
              organizationId: e.target.value,
            });
          }}
        />
      ) : (
        <Select
          label={"Department"}
          menuItems={departmentData.departments}
          defaultValue={formData.departmentId}
          value={"id"}
          html={"name"}
          onChange={(e) => {
            setFormData({
              ...formData,
              departmentId: e.target.value,
            });
          }}
        />
      )}

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
      <Box>
        <Typography sx={{ fontWeight: "900", fontSize: "1.5em" }}>
          Credentials
        </Typography>
        <Typography variant="caption">
          Below are the one-time created credentials. These will be sent to the
          mentioned email.
        </Typography>
      </Box>
      <Input
        name={"Email Address"}
        placeHolder={"Email Address"}
        divider={false}
        onChange={(e) => {
          setFormData({
            ...formData,
            email: e.target.value,
          });
        }}
      />
      <Input
        name={"Password"}
        placeHolder={"Password"}
        type={"password"}
        onChange={(e) => {
          setFormData({
            ...formData,
            password: e.target.value,
          });
        }}
      />
    </Box>
  );
};

export default CreateUser;
