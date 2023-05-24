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
import { Role } from "../../Constant/componentConstants";

const Users = () => {
  const [search, setSearch] = useState(""),
    [select, setSelect] = useState(""),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    {userValidation, userData, orgData, departmentData} = useSelector((state)=> state)


  const handleSearch = (e) => {
    dispatch(searchUser(e.target.value))
    setSelect("")
    setSearch(e.target.value)
  }
  const handleSelect = (e) => {
    setSelect(e.target.value);
    dispatch(selectUserOrganization(e.target.value))
    setSearch("")
  }

  useEffect(() => {
      dispatch(getUsers())
      userValidation.role === Role.SuperAdmin ? dispatch(getOrganizations()) : dispatch(getDepartments())
  }, [dispatch]);
  return (
        <Box sx={mainDiv}>
          <Box sx={headerDiv}>
            <Typography sx={headerText}>
              {userValidation.role === Role.SuperAdmin ? "Admins" : "Employees"}
            </Typography>
            <Box component="form" sx={searchStyles}>
              <InputBase
                sx={{ textAlign: "center" }}
                placeholder="Search something..."
                value={search}
                onChange={handleSearch}
              />
              <IconButton type="button" color="primary">
                <SearchIcon />
              </IconButton>
            </Box>
            <Select
              label={
                userValidation.role === Role.SuperAdmin
                  ? "Select Organization"
                  : "Select Department"
              }
              menuItems={userValidation.role === Role.SuperAdmin ? orgData.organizations : departmentData.departments}
              value={"name"}
              html={"name"}
              defaultValue={select}
              noLabel={true}
              onChange={handleSelect}
            />
            <Button
              startIcon={<AddIcon />}
              size="large"
              sx={addButton}
              color="success"
              variant="contained"
              disableElevation
              onClick={() => {
                navigate(userValidation.role === Role.SuperAdmin ? "admin/create" : "employee/create")
              }}
            >
              {" "}
              ADD
            </Button>
          </Box>
          <Tables
            label={userValidation.role === Role.SuperAdmin ? adminsLabel : employeesLabel}
            rowsPerPage={10}
            viewRoute={
              userValidation.role === Role.SuperAdmin ? "/user/admins/details/" : "/user/employees/details/"
            }
            data={userData.users? userData.users : []}
          />
        </Box>
  );
};

export default Users;
