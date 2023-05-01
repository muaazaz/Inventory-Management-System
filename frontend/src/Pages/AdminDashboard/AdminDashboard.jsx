import BarChart from "../../Components/Shared/BarChart/BarChart";
import Cards from "../../Components/Shared/Cards/Cards";
import { Link } from "react-router-dom";
import Tables from "../../Components/Shared/Tables/Tables";
import { adminEmpComplaintLabel } from "../../Constant/dummyData";
import "./dashboard.css";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { headerText, mainDiv, stats, tableDiv } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintCount, getComplaints } from "../../Redux/complaint/complaintAction";
import { getUserCount } from "../../Redux/user/userAction";
import { getItemCount } from "../../Redux/item/itemAction";
import { getVendorsCount } from "../../Redux/vendor/vendorAction";
import { getCategoryCount } from "../../Redux/category/categoryAction";

const AdminDashboard = () => {
  const dispatch = useDispatch(),
    { complaintData, userData, itemData, vendorData, categoryData } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserCount());
    dispatch(getComplaints());
    dispatch(getComplaintCount())
    dispatch(getItemCount());
    dispatch(getVendorsCount());
    dispatch(getCategoryCount());
    console.log(complaintData.monthlyCount)
  }, [dispatch]);

  return (
    <Box sx={mainDiv}>
      <Typography sx={headerText}>Dashboard</Typography>
      <Box sx={stats}>
        <Cards
          title={"Employees"}
          amount={userData?.totalCount ? userData.totalCount : "0" }
          info={`${userData?.currentMonthCount?.count ? userData.currentMonthCount.count : "0"} New Employees added this month`}
          color={"success"}
        />
        <Cards
          title={"Inventory Items"}
          amount={itemData?.totalCount ? itemData.totalCount : "0"}
          info={`${itemData?.currentMonthCount?.count ? itemData.currentMonthCount.count : "0"} New Items added this month`}
          color={"success"}
        />
        <Cards
          title={"Vendors"}
          amount={vendorData?.totalCount ? vendorData.totalCount : "0"}
          info={`${vendorData?.currentMonthCount? vendorData.currentMonthCount : "0"} New Vendors added this month`}
          color={"success"}
        />
        <Cards
          title={"Categories"}
          amount={categoryData?.totalCount ? categoryData.totalCount : "0"}
          info={`${categoryData?.currentMonthCount?.count ? categoryData.currentMonthCount.count : "0"} New Categories added this month`}
          color={"success"}
        />
      </Box>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <Box sx={{ width: "50%" }}>
          <BarChart />
        </Box>
        <Box sx={{ width: "50%" }}>
          <BarChart />
        </Box>
      </Box>
      <Box sx={tableDiv}>
        <Typography variant="p">Recent Complaints</Typography>
        <Link className="all-link" to="/complaints">
          See all
        </Link>
      </Box>
      <Tables
        label={adminEmpComplaintLabel}
        rowsPerPage={4}
        hidden={true}
        viewRoute={"/complaints/details/"}
        data={complaintData.complaints ? complaintData.complaints : []}
      />
    </Box>
  );
};

export default AdminDashboard;
