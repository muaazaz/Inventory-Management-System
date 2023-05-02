import "./dashboard.css";
import { useEffect } from "react";
import EmployeeDashboard from "../EmployeeDashboard/EmployeeDashboard"
import { useSelector } from "react-redux";
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
