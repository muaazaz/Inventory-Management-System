import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  dividerStyles,
  header,
  headerText,
  mainDiv,
  viewButton,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import { useDispatch, useSelector } from "react-redux";
import { deleteDepartment, getDepartmentDetails } from "../../Redux/department/departmentAction";

const DepartmentDetails = () => {
  const navigate = useNavigate(),
    [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    { id } = useParams(),
    { departmentData } = useSelector((state) => state),
    dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getDepartmentDetails(id));
  }, [dispatch]);
  return (
    <Box sx={mainDiv}>
      <Box sx={header}>
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
        <Typography sx={headerText}>Department Details</Typography>
        <Button variant="contained" sx={viewButton} onClick={handleClick}>
          <MoreVertIcon />
        </Button>
      </Box>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem>
          <Button
            startIcon={<EditOutlinedIcon />}
            onClick={() => {
              navigate("/departments/edit/" + id);
            }}
          >
            Edit
          </Button>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Button
            startIcon={<DeleteOutlineOutlinedIcon />}
            color="error"
            onClick={() => {
              dispatch(deleteDepartment(id))
              navigate(-1)
            }}
          >
            Delete
          </Button>
        </MenuItem>
      </Menu>
      <Divider sx={dividerStyles} />
      {departmentData.departmentDetail &&
        Object.entries(departmentData?.departmentDetail).map(([key, val]) => (
          <ViewContent key={key} label={key} detail={val} divider={true} />
        ))}
    </Box>
  );
};

export default DepartmentDetails;
