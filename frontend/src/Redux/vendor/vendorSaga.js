import { takeEvery, put } from "redux-saga/effects";
import { fetchRequest } from "../../utils/fetchRequest";
import {
  CREATE_VENDOR,
  DELETE_VENDOR,
  EDIT_VENDOR,
  GET_VENDORS,
  GET_VENDORS_COUNT,
  GET_VENDOR_DETAIL,
  SELECT_VENDORY_BY_CATEGORY,
  SELECT_VENDORY_BY_SUBCATEGORY,
  SET_ALL_VENDORS,
  SET_CREATED_VENDOR,
  SET_CREATE_VENDOR_ERROR,
  SET_VENDORS_COUNT,
  SET_VENDOR_DETAIL,
  VENDORS_SEARCH,
} from "../../Constant/reducerConstants";

function* createVendor({ formData }) {
  const { vendor, error, message } = yield fetchRequest(
    "/Vendors",
    "POST",
    formData
  );
  if (error) {
    put({ type: SET_CREATE_VENDOR_ERROR, payload: { error: message } });
  } else {
    put({ type: SET_CREATED_VENDOR, payload: { vendor } });
  }
}
function* getVendors({ category }) {
  const res = yield fetchRequest(
    `/vendors?category=${category ? category : ""}`,
    "GET"
  );
  yield put({ type: SET_ALL_VENDORS, payload: { vendors: res } });
}
function* getVendorDetails({ id }) {
  const res = yield fetchRequest("/vendors/" + id, "GET");
  yield put({ type: SET_VENDOR_DETAIL, payload: { detail: res } });
}
function* editVendor({ id, updateData }) {
  const res = yield fetchRequest("/vendors/" + id, "PATCH", updateData);
  yield put({ type: SET_VENDOR_DETAIL, payload: { detail: res } });
}
function* deleteVendor({ id }) {
  yield fetchRequest("/vendors/" + id, "DELETE");
}
function* getVendorsCount() {
  const res = yield fetchRequest("/vendors/count", "GET");
  yield put({ type: SET_VENDORS_COUNT, payload: res });
}
function* searchVendor({ search, catSelect, subCatSelect }) {
  const res = yield fetchRequest(
    `/vendors?search=${search ? search : ``}&catSelect=${
      catSelect ? catSelect : ``
    }&subCatSelect=${subCatSelect ? subCatSelect : ``}`,
    "GET"
  );
  yield put({ type: SET_ALL_VENDORS, payload: { vendors: res } });
}

export default function* vendorSaga() {
  yield takeEvery(GET_VENDORS, getVendors);
  yield takeEvery(GET_VENDOR_DETAIL, getVendorDetails);
  yield takeEvery(EDIT_VENDOR, editVendor);
  yield takeEvery(DELETE_VENDOR, deleteVendor);
  yield takeEvery(CREATE_VENDOR, createVendor);
  yield takeEvery(GET_VENDORS_COUNT, getVendorsCount);
  yield takeEvery([SELECT_VENDORY_BY_CATEGORY, VENDORS_SEARCH, SELECT_VENDORY_BY_SUBCATEGORY], searchVendor);
}
