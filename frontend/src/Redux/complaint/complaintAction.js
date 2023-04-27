import { CREATE_COMPLAINT, DELETE_COMPLAINT, EDIT_COMPLAINT, GET_COMPLAINTS, GET_COMPLAINTS_COUNT, GET_COMPLAINTS_DETAILS, SEARCH_COMPLAINTS, SELECT_COMPLAINTS_ORGANIZATION, SELECT_COMPLAINTS_STATUS} from "../../Constant/reducerConstants"

export const createComplaint  = (data) =>{
    return({
        type: CREATE_COMPLAINT,
        data
    })
}

export const getComplaints = (data)=>{
    return({
        type: GET_COMPLAINTS,
        getType: data
    })
}

export const getComplaintDetails = (data)=>{
    return({
        type: GET_COMPLAINTS_DETAILS,
        id: data
    })
}

export const editComplaint = (data)=>{
    return({
        type: EDIT_COMPLAINT,
        data
    })
}

export const deleteComplaint = (data)=>{
    return({
        type: DELETE_COMPLAINT,
        id: data
    })
}

export const getComplaintCount = ()=>{
    return({
        type: GET_COMPLAINTS_COUNT
    })
}

export const searchComplaint = (data)=>{
    return({
        type: SEARCH_COMPLAINTS,
        search: data.search,
        dataType: data.type
    })
}

export const selectComplaintStatus = (data)=>{
    return({
        type: SELECT_COMPLAINTS_STATUS,
        statusSelect: data.select,
        dataType: data.type
    })
}

export const selecctComplaintOrganization = (data)=>{
    return({
        type: SELECT_COMPLAINTS_ORGANIZATION,
        orgSelect: data
    })
}