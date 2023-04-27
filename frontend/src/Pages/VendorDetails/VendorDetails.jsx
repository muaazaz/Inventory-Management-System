import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  headerDiv,
  headerText,
  mainDiv,
  subCategoryName,
  viewButton,
} from "./styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVendor,
  getVendorDetails,
} from "../../Redux/vendor/vendorAction";

const VendorDetails = () => {
  const [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    navigate = useNavigate(),
    { id } = useParams(),
    dispatch = useDispatch(),
    { vendorDetail } = useSelector((state) => state.vendorData);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getVendorDetails(id));
  }, [dispatch]);
  return (
    <>
      {vendorDetail && (
        <Box sx={mainDiv}>
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
            <Button variant="contained" sx={viewButton} onClick={handleClick}>
              <MoreVertIcon />
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem>
                <Button
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => {
                    navigate("/vendors/edit/" + id);
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
                    dispatch(deleteVendor(id));
                    navigate("/vendors")
                  }}
                >
                  Delete
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Divider sx={{ m: 3 }} />
          {Object.entries(vendorDetail).map(([key, val], i) => (
            <Box key={i}>
              {key !== "subCategory" && (
                <ViewContent label={key} detail={val} divider={true} />
              )}
            </Box>
          ))}
          <Typography sx={headerText}>Sub Categories:</Typography>
          <Box sx={subCategoryName}>
            <Typography variant="content">
              {vendorDetail.subCategory}
            </Typography>
          </Box>
          <Divider sx={{ m: "2% 0" }} />
        </Box>
      )}
    </>
  );
};

export default VendorDetails;
