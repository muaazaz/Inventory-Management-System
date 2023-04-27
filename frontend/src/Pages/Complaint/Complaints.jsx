import Tables from "../../Components/Shared/Tables/Tables";
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  complaintLabel,
  ownComplaintLabel,
  complaintStatusOptions,
} from "../../Constant/dummyData";
import {
  addButton,
  complaintSearchStyles,
  headerDiv,
  headerText,
  main,
} from "./styles";
import { useEffect, useState } from "react";
import Select from "../../Components/Shared/Select/Select";
import AdminComplaint from "../AdminComplaint/AdminComplaint";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getComplaints,
  searchComplaint,
  selecctComplaintOrganization,
  selectComplaintStatus,
} from "../../Redux/complaint/complaintAction";
import { getOrganizations } from "../../Redux/organization/organizationAction";

const Complaints = () => {
  const [search, setSearch] = useState(""),
    navigate = useNavigate(),
    [statusSelect, setStatusSelect] = useState(""),
    [orgSelect, setOrgSelect] = useState(),
    dispatch = useDispatch(),
    { userValidation, complaintData, orgData } = useSelector((state) => state);
  const handleSearch = () => {
    console.log(search);
  };
  useEffect(() => {
    dispatch(getComplaints());
    dispatch(getComplaints("own"));
    dispatch(getOrganizations());
  }, [dispatch]);
  return (
    <>
      {userValidation.role !== "admin" ? (
        <Box sx={main}>
          <Box sx={headerDiv}>
            <Typography sx={headerText}>Complaints</Typography>
            <Box component="form" sx={complaintSearchStyles}>
              <InputBase
                sx={{ textAlign: "center", m: 1 }}
                placeholder="Search something..."
                onChange={(e) => {
                  setSearch(e.target.value);
                  setStatusSelect("");
                  setOrgSelect("");
                  dispatch(searchComplaint(e.target.value));
                }}
              />
              <IconButton
                type="button"
                sx={{ p: "5%" }}
                color="primary"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Box>
            {userValidation.role === "superadmin" && (
              <Select
                label={"Select Organization"}
                menuItems={orgData.organizations}
                defaultValue={orgSelect}
                value={"name"}
                html={"name"}
                noLabel={true}
                onChange={(e) => {
                  setOrgSelect(e.target.value);
                  setSearch("");
                  setStatusSelect("");
                  dispatch(selecctComplaintOrganization(e.target.value));
                }}
              />
            )}
            {userValidation.role === "superadmin" && (
              <Select
                defaultValue={statusSelect}
                label={"Select Status"}
                menuItems={complaintStatusOptions}
                value={"status"}
                html={"status"}
                noLabel={true}
                onChange={(e) => {
                  setStatusSelect(e.target.value);
                  setOrgSelect("");
                  setSearch("");
                  dispatch(selectComplaintStatus(e.target.value));
                }}
              />
            )}
            {userValidation.role === "employee" && (
              <Button
                startIcon={<AddIcon />}
                size="large"
                sx={addButton}
                color="success"
                variant="contained"
                onClick={() => {
                  navigate("create");
                }}
              >
                {" "}
                Create
              </Button>
            )}
          </Box>
          <Tables
            label={
              userValidation.role === "superadmin"
                ? complaintLabel
                : ownComplaintLabel
            }
            rowsPerPage={10}
            hidden={false}
            viewRoute={"details/"}
            data={
              userValidation.role === "employee"
              ? complaintData.ownComplaints
              : complaintData.complaints 
              ? complaintData.complaints 
              : []
            }
          />
        </Box>
      ) : (
        <AdminComplaint />
      )}
    </>
  );
};

export default Complaints;
