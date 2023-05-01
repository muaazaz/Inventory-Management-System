import {
  Alert,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { headerDiv, headerText, mainDiv, viewButton } from "./styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategoryDetails,
} from "../../Redux/category/categoryAction";

const CategoryDetails = () => {
  const [open, setOpen] = useState(false),
    { id } = useParams(),
    [anchorEl, setAnchorEl] = useState(null),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { categoryDetail } = useSelector((state) => state.categoryData);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategoryDetails(id));
  }, [dispatch]);
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
            <Button
              startIcon={<EditOutlinedIcon />}
              onClick={() => {
                navigate("/categories/edit/" + id);
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
                dispatch(deleteCategory(id));
                navigate(-1);
              }}
            >
              Delete
            </Button>
          </MenuItem>
        </Menu>
      </Box>
      <Divider sx={{ m: 3 }} />
      {categoryDetail &&
        Object.entries(categoryDetail).map(([key, val], i) => (
          <Fragment key={i}>
            {key !== "vendors" && key !== "childern" && (
              <ViewContent label={key} detail={val} divider={true} />
            )}
          </Fragment>
        ))}
      <Typography sx={headerText}>Vendors</Typography>
      {categoryDetail && categoryDetail.vendors.length !== 0 ? (
        categoryDetail.vendors.map((vendor, i) => (
          <Box sx={{ display: "flex" }} key={i}>
            <ViewContent label={"Name"} detail={vendor.vendorName} />
            <ViewContent
              label={"Contact Number"}
              detail={vendor["contactNo"]}
            />
          </Box>
        ))
      ) : (
        <Alert severity="info" sx={{ margin: "1%" }}>
          There Are No Vendors Dealing In This Category Yet
        </Alert>
      )}
    </Box>
  );
};

export default CategoryDetails;
