import { Box, Button, Divider, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { orgMainStyles, orgViewButton, orgViewHeader } from "./styles";
import ViewImage from "../../Components/Shared/ViewImage/ViewImage";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import { adminsLabel } from "../../Constant/dummyData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Tables from "../../Components/Shared/Tables/Tables";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOrganization, getOrganizationDetails } from "../../Redux/organization/organizationAction";

const OrgDetails = () => {
  const [orgDetails, setOrgDetails] = useState(1),
    [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    {orgData} = useSelector((state) => state),
    { id } = useParams()

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getOrganizationDetails(id))
  }, [dispatch])
  return (
    <>
      <Box sx={orgMainStyles}>
        <Box sx={orgViewHeader}>
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
          {orgDetails &&
            <Button variant="contained" sx={orgViewButton} onClick={handleClick}>
              <MoreVertIcon />
            </Button>}
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem>
              <Button startIcon={<EditOutlinedIcon />} onClick={()=>{navigate("/organizations/edit/"+id)}}>Edit</Button>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Button startIcon={<DeleteOutlineOutlinedIcon />} onClick={()=>{
                dispatch(deleteOrganization(id))
                navigate(-1)
                }} color="error">
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
              setOrgDetails(value);
            }}
            value={orgDetails}
            sx={{ width: "15%" }}
          >
            <Tab label="General Information" value={1} />
            <Tab label="Admins" value={2} />
          </Tabs>
          <Box sx={{ borderRight: 1, borderColor: "divider", mr: 4 }} />
          {orgData.organizationDetail && 
          orgDetails === 1 ? (
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <ViewImage
                name={orgData.organizationDetail.name}
                details={[orgData.organizationDetail.email]}
                image={orgData.organizationDetail.photo}
              />
              <Divider sx={{ mb: 2, mt: 4 }} />
              {Object.entries(orgData.organizationDetail).map(([key, val], i) => (
                  <Box key={i}>
                    {key !== 'name' &&
                      key !== 'email' &&
                      key !== 'photo' &&
                      <ViewContent
                        label={key}
                        detail={val}
                        divider={true}
                      />
                    }
                  </Box>

                ))}
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Tables
                label={adminsLabel}
                data={orgData.organizationAdmins ? orgData.organizationAdmins : []}
                rowsPerPage={5}
                hidden={false}
                viewRoute={"/admins/details/"}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrgDetails;
