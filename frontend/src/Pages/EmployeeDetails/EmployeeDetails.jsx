import { Box, Button, Divider, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { mainStyles, viewButton, viewHeader } from "./styles";
import ViewImage from "../../Components/Shared/ViewImage/ViewImage";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import {
  InventoryLabel,
  requestsLabel,
} from "../../Constant/tablesData";
import { useEffect, useState } from "react";
import Tables from "../../Components/Shared/Tables/Tables";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserDetails } from "../../Redux/user/userAction";

const EmployeeDetails = () => {
  let checkArray = ["photo", "name", "organization", "request", "item"];
  const [showDetails, setShowDetails] = useState(1),
    [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    navigate = useNavigate(),
    { id } = useParams(),
    dispatch = useDispatch(),
    { userData } = useSelector((state) => state);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch]);
  return (
    <>
      {userData.userDetails && 
      <Box sx={mainStyles}>
        <Box sx={viewHeader}>
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
          {showDetails === 1 && (
            <Button variant="contained" sx={viewButton} onClick={handleClick}>
              <MoreVertIcon />
            </Button>
          )}
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem>
              <Button
                startIcon={<EditOutlinedIcon />}
                onClick={() => {
                  navigate("/user/edit/" + id);
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
                  dispatch(deleteUser(id));
                  navigate("/user");
                }}
              >
                Delete
              </Button>
            </MenuItem>
          </Menu>
        </Box>
        <Divider sx={{ mb: 2, mt: 4 }} />
        <Box sx={{ display: "flex" }}>
          <Tabs
            orientation="vertical"
            onChange={(e, value) => {
              setShowDetails(value);
            }}
            value={showDetails}
            sx={{ width: "15%" }}
          >
            <Tab label="General Information" value={1} />
            <Tab label="Inventory" value={2} />
            <Tab label="Requests" value={3} />
          </Tabs>
          <Box sx={{ borderRight: 1, borderColor: "divider", mr: 4 }} />
          {showDetails === 1 ? (
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <ViewImage name={userData.userDetails.name} details={[""]} image={userData.userDetails.photo} />
              <Divider sx={{ mb: 2, mt: 4 }} />
              {Object.entries(userData.userDetails).map(([key, val]) => (
                <Box key={key}>
                  {!checkArray.includes(key) && (
                    <ViewContent label={key} detail={val} divider={true} />
                  )}
                </Box>
              ))}
            </Box>
          ) : showDetails === 2 ? (
            <Box sx={{ width: "100%" }}>
              <Tables
                label={InventoryLabel}
                data={userData.userDetails.item}
                rowsPerPage={5}
                hidden={false}
                viewRoute={"/inventory/details/"}
              />
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Tables
                label={requestsLabel}
                data={userData.userDetails.request}
                rowsPerPage={5}
                hidden={false}
                viewRoute={"/requests/details/"}
              />
            </Box>
          )}
        </Box>
      </Box>
}    </>
  );
};

export default EmployeeDetails;
