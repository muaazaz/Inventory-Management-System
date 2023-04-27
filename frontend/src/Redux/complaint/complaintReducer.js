import {
  SET_COMPLAINTS,
  SET_CREATED_COMPLAINTS,
  SET_COMPLAINT_DETAILS,
  DELETE_COMPLAINT,
  SET_COMPLAINT_ERROR,
  SET_COMPLAINTS_COUNT,
  SET_OWN_COMPLAINTS,
} from "../../Constant/reducerConstants";

const complaintData = (state = [], action) => {
  switch (action.type) {
    case SET_COMPLAINT_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case SET_COMPLAINTS:
      return {
        ...state,
        complaints: action.payload.complaints,
      };
    case SET_OWN_COMPLAINTS:
      return {
        ...state,
        ownComplaints: action.payload.complaints,
      };
    case SET_CREATED_COMPLAINTS:
      return {
        ...state,
        error: "",
        createdComplaint: action.payload.complaint,
      };
    case SET_COMPLAINT_DETAILS:
      return {
        ...state,
        complaintDetails: action.payload.complaint,
      };
    case DELETE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.filter(
          (complaint) => complaint.id !== action.id
        ),
      };
    case SET_COMPLAINTS_COUNT:
      return {
        ...state,
        currentMonthPendingCount: action.payload.currentMonthPendingCount,
        currentMonthResolvedCount: action.payload.currentMonthResolvedCount,
        monthlyCount: action.payload.monthlyCount,
        totalPendingCount: action.payload.totalPendingCount,
        totalResolvedCount: action.payload.totalResolvedCount,
      };
    default:
      return state;
  }
};

export default complaintData;
