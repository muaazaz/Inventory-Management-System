import "./dashboard.css";
import { useEffect } from "react";
import EmployeeDashboard from "../EmployeeDashboard/EmployeeDashboard"
import { useSelector } from "react-redux";
import SuperAdminDashboard from "../SuperAdminDashboard/SuperAdminDashboard";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import { Role } from "../../Constant/componentConstants";

const Dashboard = () => {
  const { userValidation } = useSelector((state) => state)
  return (
    <>
      {userValidation.role === Role.SuperAdmin ?
        <SuperAdminDashboard />
        :
        userValidation.role === Role.Admin ?
          <AdminDashboard />
          :
          <EmployeeDashboard />
      }
    </>
  );
};

export default Dashboard;
