import { CREATE_REQUEST, DELETE_REQUEST, EDIT_REQUEST, GET_REQUESTS, GET_REQUEST_DETAIL, REQUEST_SEARCH, SELECT_REQUEST_BY_STATUS, SELECT_REQUEST_BY_TYPE } from "../../Constant/reducerConstants"

export const createRequest = (formData)=>{
    return({
        type: CREATE_REQUEST,
        formData
    })
}

export const getRequests = (data)=>{
    return({
        type: GET_REQUESTS,
        requestType: data
    })
}
export const getRequestDetails = (data)=>{
    return({
        type: GET_REQUEST_DETAIL,
        id: data
    })
}
export const editRequest = (data)=>{
    return({
        type: EDIT_REQUEST,
        id: data.id,
        updateData: data.formData
    })
}
export const searchRequests = (data)=>{
    return({
        type: REQUEST_SEARCH,
        search: data.search,
        requestType: data.type
    })
}
export const selectUsingStatus = (data)=>{
    return({
        type: SELECT_REQUEST_BY_STATUS,
        selectStatus: data.select,
        requestType: data.type
    })
}
export const selectUsingType = (data)=>{
    return({
        type: SELECT_REQUEST_BY_TYPE,
        selectType: data.select,
        requestType: data.type
    })
}
export const deleteRequest = (data)=>{
    return({
        type: DELETE_REQUEST,
        id: data
    })
}