import BarChart from "../../Components/Shared/BarChart/BarChart";
import Cards from "../../Components/Shared/Cards/Cards";
import { Link } from "react-router-dom";
import Tables from "../../Components/Shared/Tables/Tables";
import { complaintLabel, data } from "../../Constant/dummyData";
import "./dashboard.css";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { headerText, mainDiv, stats, tableDiv } from "./styles";
import EmployeeDashboard from "../EmployeeDashboard/EmployeeDashboard"
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../../Redux/complaint/complaintAction";
import { getOrganizationCount } from "../../Redux/organization/organizationAction";
import SuperAdminDashboard from "../SuperAdminDashboard/SuperAdminDashboard";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const { userValidation } = useSelector((state) => state)

  useEffect(() => { }, [userValidation])

  return (
    <>
      {userValidation.role === 'superadmin' ?
        <SuperAdminDashboard />
        :
        userValidation.role === 'admin' ?
          <AdminDashboard />
          :
          <EmployeeDashboard />
      }
    </>
  );
};

export default Dashboard;
