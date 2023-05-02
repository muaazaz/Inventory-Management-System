import Tables from "../../Components/Shared/Tables/Tables";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  adminEmpComplaintLabel,
  ownComplaintLabel,
  complaintStatusOptions,
} from "../../Constant/tablesData";
import {
  addButton,
  complaintSearchStyles,
  headerDiv,
  headerText,
  main,
} from "./styles";
import { useEffect, useState } from "react";
import Select from "../../Components/Shared/Select/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getComplaints, searchComplaint, selectComplaintStatus} from "../../Redux/complaint/complaintAction"

const AdminComplaint = () => {
  const [complaintsTable, setComplaintsTable] = useState(1),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    {complaints, ownComplaints} = useSelector((state)=>state.complaintData),
    [search, setSearch] = useState(""),
    [statusSelect, setStatusSelect] = useState("");


  const  handleStatusChange = (e) =>{
    setSearch("")
    setStatusSelect(e.target.value);
    if(complaintsTable === 1){
      dispatch(selectComplaintStatus({select: e.target.value}))
    }else{
      dispatch(selectComplaintStatus({select: e.target.value, type: 'own'}))
    }
  }

  const handleSearch = (e)=>{
    setStatusSelect("")
    setSearch(e.target.value);
    if(complaintsTable === 1){
      dispatch(searchComplaint({search: e.target.value}))
    }else{
      dispatch(searchComplaint({search: e.target.value, type: 'own'}))
    }
  }

  const handleTabChange = (e, value) => {
    switch(value){
      case 1:
        dispatch(getComplaints())
        break;
      case 2:
        dispatch(getComplaints('own'))
        break;
      default:
        break;
    }
    setSearch("")
    setStatusSelect("")
    setComplaintsTable(value);
  }
    useEffect(()=>{
      dispatch(getComplaints())
      dispatch(getComplaints('own'))
    },[dispatch])

  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
        <Typography sx={headerText}>Complaints</Typography>
        <Box component="form" sx={complaintSearchStyles}>
          <InputBase
            value={search}
            sx={{ textAlign: "center", m: 1 }}
            placeholder="Search something..."
            onChange={handleSearch}
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
          menuItems={complaintStatusOptions}
          value={"status"}
          html={"status"}
          noLabel={true}
          defaultValue={statusSelect}
          onChange={handleStatusChange}
        />
        {complaintsTable === 2 && (
          <Button
            sx={addButton}
            startIcon={<AddIcon />}
            color="success"
            variant="contained"
            onClick={()=>{
                navigate('create')
            }}
          >
            ADD
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex" }}>
        <Tabs
          orientation="vertical"
          onChange={handleTabChange}
          value={complaintsTable}
          sx={{ width: "15%" }}
        >
          <Tab label="Employees" value={1} />
          <Tab label="Submitted" value={2} />
        </Tabs>
        <Box sx={{ borderRight: 1, borderColor: "divider", mr: 4 }} />
        {complaintsTable === 1 ? (
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Tables
              label={adminEmpComplaintLabel}
              data={complaints ? complaints : []}
              rowsPerPage={5}
              hidden={false}
              viewRoute={"details/"}
            />
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Tables
              label={ownComplaintLabel}
              data={ownComplaints ? ownComplaints : []}
              rowsPerPage={5}
              hidden={false}
              routeQueryString={"?type=own"}
              viewRoute={"details/"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminComplaint;
