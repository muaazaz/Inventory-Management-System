import {
  Alert,
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
import ViewImage from "../../Components/Shared/ViewImage/ViewImage";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getItemDetails } from "../../Redux/item/itemAction";

const ItemDetails = () => {
  const navigate = useNavigate(),
    [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    { id } = useParams(),
    dispatch = useDispatch(),
    { itemData } = useSelector((state) => state);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getItemDetails(id));
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
        <Button variant="contained" sx={viewButton} onClick={handleClick}>
          <MoreVertIcon />
        </Button>
      </Box>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem>
          <Button
            startIcon={<EditOutlinedIcon />}
            onClick={() => {
              navigate("/inventory/edit/" + id);
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
          onClick={()=>{
            dispatch(deleteItem(id))
            navigate(-1)
          }}
          >
            Delete
          </Button>
        </MenuItem>
      </Menu>
      <Divider sx={dividerStyles} />
      {itemData.itemDetails && Object.entries(itemData.itemDetails).map(([key, val], i) => (
        <Box key={i}>
          {key !== "vendor" && key !== "assigned_to" &&(
            <ViewContent label={key} detail={val} divider={true} />
          )}
        </Box>
      ))}
      <Typography sx={headerText}>Vendor</Typography>
      <ViewContent label={"Name"} detail={itemData.itemDetails?.vendor?.name} />
      <ViewContent
        label={"Contact No"}
        detail={itemData.itemDetails?.vendor?.contactNo}
        divider={true}
      />
      <Typography sx={headerText}>Assigned To</Typography>
      {itemData.itemDetails?.assigned_to ? (
        <ViewImage
          name={itemData.itemDetails.assigned_to.name}
          details={[
            itemData.itemDetails.assigned_to.email,
            itemData.itemDetails.assigned_to.contactNo,
          ]}
          divider={true}
        />
      ) : (
        <Alert severity="info" sx={{ m: 3 }}>
          Not Assigned Yet
        </Alert>
      )}
    </Box>
  );
};

export default ItemDetails;
