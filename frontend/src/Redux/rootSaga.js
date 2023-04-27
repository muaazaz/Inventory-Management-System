import { fork } from "redux-saga/effects";
import userSaga from "./user/userSaga";
import organizationSaga from "./organization/organizationSaga";
import complaintSaga from "./complaint/complaintSaga";
import itemSaga from "./item/itemSaga";
import vendorSaga from "./vendor/vendorSaga";
import categorySaga from "./category/categorySaga";
import departmentSaga from "./department/departmentSaga";
import requestSaga from "./request/requestSaga";

export default function* rootSaga(){
    yield fork(userSaga)
    yield fork(organizationSaga)
    yield fork(complaintSaga)
    yield fork(itemSaga)
    yield fork(vendorSaga)
    yield fork(categorySaga)
    yield fork(departmentSaga)
    yield fork(requestSaga)
}