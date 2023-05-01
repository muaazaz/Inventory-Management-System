import { Route, Routes } from "react-router-dom";
import Users from "../../Pages/User/Users";
import Organizations from "../../Pages/Organization/Organizations";
import Complaints from "../../Pages/Complaint/Complaints";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Login from "../../Pages/Login/Login";
import Protected from "../Routes/Protected";
import Public from "../Routes/Public";
import NotFound from "../../Pages/404/404";
import Home from "../../Pages/Home/Home";
import OrgDetails from "../../Pages/OrganizationDetails/OrgDetails";
import AdminDetails from "../../Pages/AdminDetails/AdminDetails";
import ComplaintDetails from "../../Pages/ComplaintDetails/ComplaintDetails";
import Department from "../../Pages/Department/Department";
import CreateDepartment from "../../Pages/CreateDepartment/CreateDepartment";
import Inventory from "../../Pages/Inventory/Inventory";
import DepartmentDetails from "../../Pages/DepartmentDetails/DepartmentDetails";
import CreateItem from "../../Pages/CreateItem/CreateItem";
import Category from "../../Pages/Category/Category";
import CreateCategory from "../../Pages/CreateCategory/CreateCategory";
import ItemDetails from "../../Pages/ItemDetails/ItemDetails";
import CategoryDetails from "../../Pages/CategoryDetails/CategoryDetails";
import EmployeeDetails from "../../Pages/EmployeeDetails/EmployeeDetails";
import Requests from "../../Pages/Requests/Requests";
import RequestDetails from "../../Pages/RequestDetails/RequestsDetails";
import Returns from "../../Pages/Returns/Returns";
import ReturnDetails from "../../Pages/ReturnDetails/ReturnDetails";
import Vendors from "../../Pages/Vendors/Vendors";
import CreateVendor from "../../Pages/CreateVendor/CreateVendor";
import VendorDetails from "../../Pages/VendorDetails/VendorDetails";
import CreateComplaint from "../../Pages/CreateComplaints/CreateComplaints";
import EmployeeEdit from "../../Pages/EmployeeEdit/EmployeeEdit";
import CreateRequest from "../../Pages/CreateRequest/CreateRequest";
import ForgotPassword from "../../Pages/ForgotPassword/ForgotPassword";
import EditCategory from "../../Pages/EditCategory/EditCategory";
import EditOrganization from "../../Pages/EditOrganization/EditOrganization";
import CreateUser from "../../Pages/CreateUser/CreateUser";
import CreateOrg from "../../Pages/CreateOrganization/CreateOrg";
import EditUser from "../../Pages/EditUser/EditUser";
import EditDepartment from "../../Pages/EditDepartment/EditDepartment";
import EditItem from "../../Pages/EditItem/EditItem";
import EditVendor from "../../Pages/EditVendor/EditVendor";
import AddNewSubCategory from "../../Pages/AddNewSubCategory/AddNewSubCategory";

function Router() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Protected allowedRoles={["superadmin", "admin", "employee"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/details/:id" element={<ComplaintDetails />} />
        </Route>
        <Route element={<Protected allowedRoles={[ "admin", "employee"]} />}>
          <Route path="complaints/create" element={<CreateComplaint />} />
          <Route path="requests" element={<Requests />} />
          <Route path="requests/details/:id" element={<RequestDetails />} />
        </Route>
        <Route element={<Protected allowedRoles={[ "superadmin", "admin"]} />}>
          <Route path="user" element={<Users />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          <Route path="user/admins/details/:id" element={<AdminDetails />} />
          <Route path="user/employees/details/:id" element={<EmployeeDetails />} />
          <Route path="user/admin/create" element={<CreateUser user={"Admin's"}/>} />
          <Route path="user/employee/create" element={<CreateUser user={"Employee's"}/>} />
        </Route>
        <Route element={<Protected allowedRoles={['superadmin']}/>}>
          <Route path="organizations" element={<Organizations />}/>
          <Route path="organizations/details/:id" element={<OrgDetails />}/>
          <Route path="organizations/edit/:id" element={<EditOrganization />}/>
          <Route path="organizations/create" element={<CreateOrg />} />
        </Route>
        <Route element={<Protected allowedRoles={['admin']}/>}>
          <Route path="departments" element={<Department />} />
          <Route path="departments/edit/:id" element={<EditDepartment />} />
          <Route path="departments/create" element={<CreateDepartment />} />
          <Route path="departments/details/:id" element={<DepartmentDetails />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="/inventory/edit/:id" element={<EditItem />} />
          <Route path="inventory/create" element={<CreateItem />} />
          <Route path="inventory/details/:id" element={<ItemDetails />} />
          <Route path="categories" element={<Category />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/add/:id" element={<AddNewSubCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="categories/details/:id" element={<CategoryDetails />} />
          <Route path="returns" element={<Returns />} />
          <Route path="returns/details/:id" element={<ReturnDetails />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="vendors/create" element={<CreateVendor />} />
          <Route path="vendors/details/:id" element={<VendorDetails />} />
          <Route path="vendors/edit/:id" element={<EditVendor />} />
        </Route>
        <Route element={<Protected allowedRoles={['employee']}/>}>
          <Route path="dashboard/edit/profile" element={<EmployeeEdit />} />
          <Route path="requests/create" element={<CreateRequest />} />
        </Route>
        <Route element={<Public />}>
          <Route path="login" element={<Login />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Router;
