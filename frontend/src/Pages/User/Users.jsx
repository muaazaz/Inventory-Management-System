import Tables from "../../Components/Shared/Tables/Tables";
import { adminsLabel, employeesLabel } from "../../Constant/tablesData";
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  addButton,
  headerDiv,
  headerText,
  mainDiv,
  searchStyles,
} from "./styles";
import Select from "../../Components/Shared/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUser, selectUserOrganization } from "../../Redux/user/userAction";
import { useNavigate } from "react-router-dom";
import { getOrganizations } from "../../Redux/organization/organizationAction";
import { getDepartments } from "../../Redux/department/departmentAction";

const Users = () => {
  const [search, setSearch] = useState(""),
    [select, setSelect] = useState(""),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    {userValidation, userData, orgData, departmentData} = useSelector((state)=> state)
  useEffect(() => {
      dispatch(getUsers())
      userValidation.role === "superadmin" ? dispatch(getOrganizations()) : dispatch(getDepartments())
  }, [dispatch]);
  return (
        <Box sx={mainDiv}>
          <Box sx={headerDiv}>
            <Typography sx={headerText}>
              {userValidation.role === "superadmin" ? "Admins" : "Employees"}
            </Typography>
            <Box component="form" sx={searchStyles}>
              <InputBase
                sx={{ textAlign: "center" }}
                placeholder="Search something..."
                value={search}
                onChange={(e) => {
                  dispatch(searchUser(e.target.value))
                  setSelect("")
                  setSearch(e.target.value)
                }}
              />
              <IconButton type="button" color="primary">
                <SearchIcon />
              </IconButton>
            </Box>
            <Select
              label={
                userValidation.role === "superadmin"
                  ? "Select Organization"
                  : "Select Department"
              }
              menuItems={userValidation.role === "superadmin" ? orgData.organizations : departmentData.departments}
              value={"name"}
              html={"name"}
              defaultValue={select}
              noLabel={true}
              onChange={(e) => {
                setSelect(e.target.value);
                dispatch(selectUserOrganization(e.target.value))
                setSearch("")
              }}
            />
            <Button
              startIcon={<AddIcon />}
              size="large"
              sx={addButton}
              color="success"
              variant="contained"
              disableElevation
              onClick={() => {
                navigate(userValidation.role === "superadmin" ? "admin/create" : "employee/create")
              }}
            >
              {" "}
              ADD
            </Button>
          </Box>
          <Tables
            label={userValidation.role === "superadmin" ? adminsLabel : employeesLabel}
            rowsPerPage={10}
            viewRoute={
              userValidation.role === "superadmin" ? "/user/admins/details/" : "/user/employees/details/"
            }
            data={userData.users? userData.users : []}
          />
        </Box>
  );
};

export default Users;
