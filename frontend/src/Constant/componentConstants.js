
const superAdminRoutes = ["Dashboard", "Organizations", "Admins", "Complaints"],
  adminRoutes = [
    "Dashboard",
    "Departments",
    "Inventory",
    "Categories",
    "Employees",
    "Requests",
    "Returns",
    "Complaints",
    "Vendors",
  ],
  employeeRoutes = ["Dashboard", "Requests", "Complaints"],
  Role = {
    SuperAdmin: 'superAdmin',
    Admin: 'admin',
    Employee: 'employee'
  },
  dashboardRoute = "/dashboard"

export {
  superAdminRoutes,
  adminRoutes,
  employeeRoutes,
  Role,
  dashboardRoute
};
