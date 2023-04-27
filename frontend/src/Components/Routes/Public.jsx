import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  const data = useSelector((state)=>state.userValidation)

  return <>{data.token ? <Navigate to="/" /> : <Outlet />}</>;
};

export default Public;
