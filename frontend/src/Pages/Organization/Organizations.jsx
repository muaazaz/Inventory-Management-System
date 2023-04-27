import Tables from "../../Components/Shared/Tables/Tables";
import { Box, Button, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { organizationLabel } from "../../Constant/dummyData";
import "./organization.css";
import { useEffect, useState } from "react";
import { addButton, headerDiv, main, searchStyles } from "./styles";
import Select from "../../Components/Shared/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations, searchOrganizations, selectUsingLocation } from "../../Redux/organization/organizationAction";
import { useNavigate } from "react-router-dom";

const Organizations = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    {orgData} = useSelector((state) => state),
    [location, setLocation] = useState(""),
    [search, setSearch] = useState("")

  const handleAdd = () => {
    navigate("create")
  };

  useEffect(() => {
    dispatch(getOrganizations())
  }, [dispatch])

  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
        <h1>Organizations</h1>
        <Box component="form" sx={searchStyles}>
          <InputBase
            sx={{ textAlign: "center", m: 1 }}
            placeholder="Search something..."
            value={search}
            onChange={(e) => {
              setLocation("")
              setSearch(e.target.value)
              dispatch(searchOrganizations(e.target.value))
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "5%" }}
            color="primary"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Select
          label={"Select Location"}
          menuItems={orgData.locations ? orgData.locations : []}
          defaultValue={location}
          selfValue={true}
          noLabel={true}
          onChange={(e) => {
            setLocation(e.target.value)
            setSearch("")
            dispatch(selectUsingLocation(e.target.value))
          }}
        />
        <Button
          startIcon={<AddIcon />}
          size="large"
          sx={addButton}
          color="success"
          variant="contained"
          onClick={handleAdd}
        >
          {" "}
          ADD
        </Button>
      </Box>
      <Tables
        label={organizationLabel}
        rowsPerPage={10}
        viewRoute={"details/"}
        data={orgData.organizations ?
          orgData.searchedOrganizations ?
            orgData.searchedOrganizations :
            orgData.organizations : []
        }
      />
    </Box>
  );
};

export default Organizations;
