import { combineReducers } from "redux";
import orgData from "./organization/organizationReducer";
import userValidation from "./user/validationReducer";
import userData from "./user/userReducer";
import complaintData from "./complaint/complaintReducer";
import itemData from "./item/itemReducer";
import vendorData from "./vendor/vendorReducer";
import categoryData from "./category/categoryReducer";
import departmentData from "./department/departmentReducer";
import requestData from "./request/requestReducer";

export default combineReducers({
    userValidation,
    userData,
    orgData,
    complaintData,
    itemData,
    vendorData,
    categoryData,
    departmentData,
    requestData
});