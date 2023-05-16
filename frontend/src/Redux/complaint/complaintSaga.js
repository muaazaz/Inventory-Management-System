import { takeEvery, put } from "redux-saga/effects";
import {
  CREATE_COMPLAINT,
  DELETE_COMPLAINT,
  EDIT_COMPLAINT,
  GET_COMPLAINTS,
  GET_COMPLAINTS_COUNT,
  GET_COMPLAINTS_DETAILS,
  SEARCH_COMPLAINTS,
  SELECT_COMPLAINTS_ORGANIZATION,
  SELECT_COMPLAINTS_STATUS,
  SET_COMPLAINTS,
  SET_COMPLAINTS_COUNT,
  SET_COMPLAINT_DETAILS,
  SET_COMPLAINT_ERROR,
  SET_CREATED_COMPLAINTS,
  SET_OWN_COMPLAINTS,
} from "../../Constant/reducerConstants";
import { fetchRequest } from "../../utils/fetchRequest";

function* createComplaint({ data }) {
  const { complaint, error, message } = yield fetchRequest(
    "/complaints",
    "POST",
    data
  );
  if (error) {
    yield put({ type: SET_COMPLAINT_ERROR, payload: { error: message } });
  } else {
    yield put({ type: SET_CREATED_COMPLAINTS, payload: { complaint } });
  }
}

function* getComplaints({ getType }) {
  const res = yield fetchRequest(
    `/complaints?type=${getType ? getType : "others"}`,
    "GET"
  );
  if (getType !== "own") {
    yield put({ type: SET_COMPLAINTS, payload: { complaints: res } });
  } else {
    yield put({ type: SET_OWN_COMPLAINTS, payload: { complaints: res } });
  }
}
function* getComplaintDetails({ id }) {
  const res = yield fetchRequest("/complaints/" + id, "GET");
  yield put({ type: SET_COMPLAINT_DETAILS, payload: { complaint: res } });
}
function* editComplaint({ data }) {
  const { id, formData } = data;
  const res = yield fetchRequest("/complaints/" + id, "PATCH", formData);
  yield put({ type: SET_COMPLAINT_DETAILS, payload: { complaint: res } });
}
function* deleteComplaint({ id }) {
  yield fetchRequest("/complaints/" + id, "DELETE");
}
function* getComplaintsCount() {
  const res = yield fetchRequest("/complaints/count", "GET");
  yield put({
    type: SET_COMPLAINTS_COUNT,
    payload: {
      monthlyCount: res.monthlyCount,
      currentMonthPendingCount: res.currentMonthCount[0]
        ? res.currentMonthCount[0].count
        : 0,
      currentMonthResolvedCount: res.currentMonthCount[1]
        ? res.currentMonthCount[1].count
        : 0,
      totalPendingCount: res.totalPendingCount,
      totalResolvedCount: res.totalResolvedCount,
    },
  });
}
function* searchComplaints({ search, statusSelect, orgSelect, dataType }) {
  const res = yield fetchRequest(
    `/complaints/search?search=${search ? search : ''}&orgSelect=${
      orgSelect ? orgSelect : ''
    }&statusSelect=${statusSelect ? statusSelect : ''}&type=${
      dataType ? dataType : ''
    }
    `,
    "GET"
  );
  if (!dataType) {
    yield put({ type: SET_COMPLAINTS, payload: { complaints: res } });
  }else{
    yield put({ type: SET_OWN_COMPLAINTS, payload: { complaints: res } });
  }
}
export default function* complaintSaga() {
  yield takeEvery(GET_COMPLAINTS, getComplaints);
  yield takeEvery(CREATE_COMPLAINT, createComplaint);
  yield takeEvery(GET_COMPLAINTS_DETAILS, getComplaintDetails);
  yield takeEvery(EDIT_COMPLAINT, editComplaint);
  yield takeEvery(DELETE_COMPLAINT, deleteComplaint);
  yield takeEvery(GET_COMPLAINTS_COUNT, getComplaintsCount);
  yield takeEvery(
    [
      SEARCH_COMPLAINTS,
      SELECT_COMPLAINTS_ORGANIZATION,
      SELECT_COMPLAINTS_STATUS,
    ],
    searchComplaints
  );
}
