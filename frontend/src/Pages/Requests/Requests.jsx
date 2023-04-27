import Tables from "../../Components/Shared/Tables/Tables";
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  ownRequestLabel,
  requestsLabel,
  requestStatusOptions,
} from "../../Constant/dummyData";
import { headerDiv, headerText, main, addButton, searchStyles } from "./styles";
import { useEffect, useState } from "react";
import Select from "../../Components/Shared/Select/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRequests, searchRequests, selectUsingStatus } from "../../Redux/request/requestAction";

const Requests = () => {
  const [search, setSearch] = useState(""),
    navigate = useNavigate(),
    [statusSelect, setStatusSelect] = useState(""),
    { userValidation, requestData } = useSelector((state) => state),
    dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRequests('request'))
  }, [userValidation]);
  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
        <Typography sx={headerText}>Requests</Typography>
        <Box component="form" sx={searchStyles}>
          <InputBase
            sx={{ textAlign: "center", m: 1 }}
            placeholder="Search something..."
            value={search}
            onChange={(e) => {
              dispatch(searchRequests({search: e.target.value, type: 'request'}))
              setSearch(e.target.value);
              setStatusSelect("")
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
        {userValidation.role !== "employee" && (
          <Select
            label={"Select Status"}
            menuItems={requestStatusOptions}
            defaultValue={statusSelect}
            value={"status"}
            html={"status"}
            noLabel={true}
            onChange={(e) => {
              setSearch("")
              setStatusSelect(e.target.value);
              dispatch(selectUsingStatus({select: e.target.value, type: 'request'}))
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
          userValidation.role === "admin" ? requestsLabel : ownRequestLabel
        }
        rowsPerPage={10}
        hidden={false}
        viewRoute={"details/"}
        data={requestData?.requests ? requestData.requests : []}
      />
    </Box>
  );
};

export default Requests;
