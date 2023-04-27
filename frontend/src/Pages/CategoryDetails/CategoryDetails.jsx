import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { headerDiv, headerText, mainDiv, viewButton } from "./styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import { subCategoryDetails, vendors } from "../../Constant/dummyData";

const CategoryDetails = () => {
  const [open, setOpen] = useState(false),
    {id} = useParams(),
    [anchorEl, setAnchorEl] = useState(null),
    navigate = useNavigate();
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
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
            <Button startIcon={<EditOutlinedIcon />} onClick={()=>{navigate("/categories/edit/"+id)}}>Edit</Button>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Button startIcon={<DeleteOutlineOutlinedIcon />} color="error">
              Delete
            </Button>
          </MenuItem>
        </Menu>
      </Box>
      <Divider sx={{ m: 3 }} />
      {Object.entries(subCategoryDetails).map(([key, val])=>(
        <ViewContent 
            label={key}
            detail={val}
            divider={true}
        />
      ))}
      <Typography sx={headerText}>Vendors</Typography>
      {vendors.map((vendor) => (
        <Box sx={{ display: "flex" }}>
          <ViewContent label={"Name"} detail={vendor.Name} />
          <ViewContent
            label={"Contact Number"}
            detail={vendor["Contact Number"]}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CategoryDetails;
