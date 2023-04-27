import Tables from "../../Components/Shared/Tables/Tables";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  returnsLabel,
  returnTypeOptions,
  returnStatusOptions,
} from "../../Constant/dummyData";
import { complaintSearchStyles, headerDiv, headerText, main } from "./styles";
import { useEffect, useState } from "react";
import Select from "../../Components/Shared/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { getRequests, searchRequests, selectUsingStatus, selectUsingType } from "../../Redux/request/requestAction";

const Returns = () => {
  const [search, setSearch] = useState(""),
    [statusSelect, setStatusSelect] = useState(""),
    [typeSelect, setTypeSelect] = useState(""),
    dispatch = useDispatch(),
    {requests} = useSelector((state)=>state.requestData)

  useEffect(()=>{
    dispatch(getRequests("return"))
  },[dispatch])
  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
        <Typography sx={headerText}>Returns</Typography>
        <Box component="form" sx={complaintSearchStyles}>
          <InputBase
            sx={{ textAlign: "center", m: 1 }}
            value={search}
            placeholder="Search something..."
            onChange={(e) => {
              dispatch(searchRequests({search: e.target.value, type: 'return'}))
              setSearch(e.target.value);
              setStatusSelect("")
              setTypeSelect("")
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
          label={"Select Status"}
          menuItems={returnStatusOptions}
          defaultValue={statusSelect}
          value={"status"}
          html={"status"}
          noLabel={true}
          onChange={(e) => {
            dispatch(selectUsingStatus({select: e.target.value, type: 'return'}))
            setStatusSelect(e.target.value);
            setTypeSelect("")
            setSearch("")
          }}
        />
        <Select
          label={"Select Type"}
          menuItems={returnTypeOptions}
          defaultValue={typeSelect}
          value={"type"}
          html={"type"}
          noLabel={true}
          onChange={(e) => {
            setSearch("")
            setStatusSelect("")
            setTypeSelect(e.target.value);
            dispatch(selectUsingType({select: e.target.value, type: 'return'}))
          }}
        />
      </Box>
      <Tables
        label={returnsLabel}
        rowsPerPage={10}
        hidden={false}
        viewRoute={"details/"}
        data={requests ? requests : []}
      />
    </Box>
  );
};

export default Returns;
