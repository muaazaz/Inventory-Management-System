import { takeEvery, put } from "redux-saga/effects";
import { fetchRequest } from "../../utils/fetchRequest";
import {
  CREATE_REQUEST,
  DELETE_REQUEST,
  EDIT_REQUEST,
  GET_REQUESTS,
  GET_REQUEST_DETAIL,
  REQUEST_SEARCH,
  SELECT_REQUEST_BY_STATUS,
  SELECT_REQUEST_BY_TYPE,
  SET_ALL_REQUESTS,
  SET_CREATED_REQUEST,
  SET_CREATE_REQUEST_ERROR,
  SET_REQUEST_DETAIL,
  SET_REQUEST_SEARCH,
} from "../../Constant/reducerConstants";

function* createRequest({ formData }) {
  const { request, error, message } = yield fetchRequest(
    "/requests",
    "POST",
    formData
  );
  if (error) {
    put({ type: SET_CREATE_REQUEST_ERROR, payload: { error: message } });
  } else {
    put({ type: SET_CREATED_REQUEST, payload: { request } });
  }
}
function* getRequests({ requestType }) {
  const res = yield fetchRequest(`/request?type=${requestType}`, "GET");
  yield put({ type: SET_ALL_REQUESTS, payload: { requests: res } });
}
function* getRequestDetails({ id }) {
  const res = yield fetchRequest("/request/" + id, "GET");
  yield put({ type: SET_REQUEST_DETAIL, payload: { detail: res } });
}
function* editRequest({ id, updateData }) {
  const res = yield fetchRequest("/request/" + id, "PATCH", updateData);
  yield put({ type: SET_REQUEST_DETAIL, payload: { detail: res } });
}
function* deleteRequest({ id }) {
  yield fetchRequest("/request/" + id, "DELETE");
}

function* searchRequest({ search, selectStatus, selectType, requestType }) {
  const res = yield fetchRequest(
    `/request/findby?search=${search ? search : ``}&selectStatus=${
      selectStatus ? selectStatus : ``
    }&selectType=${selectType ? selectType : ""}&type=${requestType}`,
    "GET"
  );
  yield put({ type: SET_REQUEST_SEARCH, payload: { requests: res } });
}

export default function* requestSaga() {
  yield takeEvery(GET_REQUESTS, getRequests);
  yield takeEvery(GET_REQUEST_DETAIL, getRequestDetails);
  yield takeEvery(EDIT_REQUEST, editRequest);
  yield takeEvery(DELETE_REQUEST, deleteRequest);
  yield takeEvery(CREATE_REQUEST, createRequest);
  yield takeEvery([SELECT_REQUEST_BY_STATUS, SELECT_REQUEST_BY_TYPE, REQUEST_SEARCH], searchRequest);
}
