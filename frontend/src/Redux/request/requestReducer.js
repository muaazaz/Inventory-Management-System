import { DELETE_REQUEST, SET_ALL_REQUESTS, SET_CREATED_REQUEST, SET_CREATE_REQUEST_ERROR, SET_REQUEST_DETAIL, SET_REQUEST_SEARCH } from "../../Constant/reducerConstants"

const requestData = (state=[], action) => {
    switch (action.type) {
        case SET_CREATED_REQUEST:
            return{
                ...state,
                error: "",
                createdRequest: action.payload.request
            }
        case SET_CREATE_REQUEST_ERROR:
            return{
                ...state,
                error: action.payload.error
            }
        case SET_ALL_REQUESTS:
            return{
                ...state,
                requests: action.payload.requests
            }
        case SET_REQUEST_DETAIL:
            return{
                ...state,
                requestDetail: action.payload.detail
            }
        case SET_REQUEST_SEARCH:
            return{
                ...state,
                requests: action.payload.requests
            }
        case DELETE_REQUEST:
            return{
                ...state,
                requests: state.requests.filter((request)=>request.id !== action.id)
            }
        default:
            return state
    }
}

export default requestData