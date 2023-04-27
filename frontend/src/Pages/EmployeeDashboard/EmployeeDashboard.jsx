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
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {
  data,
  employeeProfile,
  ownComplaintLabel,
  ownRequestLabel,
} from "../../Constant/dummyData";
import Tables from "../../Components/Shared/Tables/Tables";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  return (
    <Box sx={mainDiv}>
      <Typography>Dashboard</Typography>
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
      <Box sx={infoDiv}>
        <Box sx={imgDiv}>
          <Avatar sx={img} src={"/avatar.png"} variant="rounded" />
        </Box>
        <Box sx={info}>
          {Object.entries(employeeProfile).map(([key, val], i) => (
            <ViewProfileDetails key={i} label={key} detail={val} />
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
          data={data}
        />
      </Box>
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
          data={data}
        />
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
