import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Protected = ({ allowedRoles}) => {
  const data = useSelector((state)=>state.userValidation)
  const check = allowedRoles.includes(data.role)

  return (
    <>
      {check === true ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Protected;
