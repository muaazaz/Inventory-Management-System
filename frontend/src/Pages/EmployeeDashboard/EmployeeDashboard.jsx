import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import {
  editButton,
  img,
  imgDiv,
  info,
  infoDiv,
  linkStyles,
  mainDiv,
  tableDiv,
  tableHeader,
  tableHeaderText,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";
import ViewProfileDetails from "../../Components/Shared/ViewProfileDetails/ViewProfileDetails";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  ownComplaintLabel,
  ownRequestLabel,
} from "../../Constant/tablesData";
import Tables from "../../Components/Shared/Tables/Tables";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getComplaints } from "../../Redux/complaint/complaintAction";
import { getRequests } from "../../Redux/request/requestAction";
import { getUserDetails } from "../../Redux/user/userAction";
import { getCookiesData } from "../../utils/handleCookies";

const EmployeeDashboard = () => {
  const ignoreArray = ["photo", "item", "request", "organization", "inventory"];
  const navigate = useNavigate(),
    { id } = getCookiesData(),
    dispatch = useDispatch(),
    { complaintData, requestData, userData } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getComplaints('own'));
    dispatch(getRequests("request"));
    dispatch(getUserDetails(id));
  }, [dispatch]);
  return (
    <Box sx={mainDiv}>
      <Box sx={{m: 4}}>
        <Typography sx={{ fontSize: "2em", fontWeight: "600" }}>
          Dashboard
        </Typography>
        <Button
          sx={editButton}
          startIcon={<ModeEditOutlineOutlinedIcon />}
          variant="contained"
          color="success"
          onClick={() => {
            navigate("edit/profile");
          }}
        >
          Edit Profile
        </Button>
      </Box>
      <Box sx={infoDiv}>
        <Box sx={imgDiv}>
          <Avatar
            sx={img}
            src={userData.userDetails?.photo}
            variant="rounded"
          />
        </Box>
        <Box sx={info}>
          {userData.userDetails &&
            Object.entries(userData.userDetails).map(([key, val], i) => (
              <Box key={i}>
                {!ignoreArray.includes(key) && (
                  <ViewProfileDetails
                    label={key}
                    detail={val ? val : "Not Found"}
                  />
                )}
              </Box>
            ))}
        </Box>
      </Box>
      <Divider sx={{ m: 2 }} />
      <Box sx={tableDiv}>
        <Box sx={tableHeader}>
          <Typography sx={tableHeaderText}>Recent Requests</Typography>
          <Link to={"/requests"} style={linkStyles}>
            See all
          </Link>
        </Box>
        <Tables
          label={ownRequestLabel}
          rowsPerPage={4}
          hidden={true}
          viewRoute={"/requests/details/"}
          data={requestData.requests ? requestData.requests : []}
        />
      </Box>
      <Divider sx={{ margin: "3% 0" }} />
      <Box sx={tableDiv}>
        <Box sx={tableHeader}>
          <Typography sx={tableHeaderText}>Recent Complaints</Typography>
          <Link to={"/complaints"} style={linkStyles}>
            See all
          </Link>
        </Box>
        <Tables
          label={ownComplaintLabel}
          rowsPerPage={4}
          hidden={true}
          viewRoute={"/complaints/details/"}
          data={complaintData.ownComplaints ? complaintData.ownComplaints : []}
        />
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
