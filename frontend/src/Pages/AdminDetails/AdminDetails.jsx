import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import {
  adminViewButton,
  adminViewHeader,
  adminMainStyles,
  organizationHeader,
} from "./styles";
import ViewImage from "../../Components/Shared/ViewImage/ViewImage";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteUser, getUserDetails } from "../../Redux/user/userAction";

const AdminDetails = () => {
  const navigate = useNavigate(),
    { id } = useParams(),
    [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    dispatch = useDispatch(),
    { userData } = useSelector((state) => state)
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  useEffect(() => {
      dispatch(getUserDetails(id))
  }, [dispatch, id])
  return (
    <>
      {userData.userDetails &&
        <Box sx={adminMainStyles}>
          <Box sx={adminViewHeader}>
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
            <Button variant="contained" sx={adminViewButton} onClick={handleClick}>
              <MoreVertIcon />
            </Button>
          </Box>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem>
              <Button startIcon={<EditOutlinedIcon />} onClick={()=>{navigate('/user/edit/'+id)}}>Edit</Button>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Button startIcon={<DeleteOutlineOutlinedIcon />} color="error" onClick={()=>{
                dispatch(deleteUser(id))
                navigate(-1)
                }}>
                Delete
              </Button>
            </MenuItem>
          </Menu>
          <Divider sx={{ mt: 4, mb: 2 }} />
          <ViewImage
            name={userData.userDetails.name}
            details={[userData.userDetails.email, userData.userDetails.contactNo]}
            image={userData.userDetails.photo}
            divider={true}
          />
          <Typography sx={organizationHeader} variant="content">
            Organization
          </Typography>
          <ViewImage
            name={userData.userDetails.organization.name}
            details={[userData.userDetails.organization.email]}
            image={userData.userDetails.organization.photo}
          />
          {Object.entries(userData.userDetails.organization).map(([key, val], i) => (
            <Box key={i}>
              {key !== 'name' &&
                key !== 'email' &&
                key !== 'photo' &&
                <ViewContent label={key} detail={val} />
              }
            </Box>

          ))}
        </Box>}
    </>
  );
};

export default AdminDetails;
