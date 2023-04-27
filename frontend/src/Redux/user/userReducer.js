import { USER_ERROR, SET_USERS, SET_CREATED_USER, SET_USER_DETAILS, DELETE_USER, SET_SEARCHED_USERS, SET_USERS_COUNT } from "../../Constant/reducerConstants";

const userData = (state = [], action) => {
    switch (action.type) {
        case USER_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload.users
            }
        case SET_CREATED_USER:
            return {
                ...state,
                error: "",
                createdUser: action.payload.user
            }
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload.user
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.id)
            }
        case SET_SEARCHED_USERS:
            return {
                ...state,
                users: action.payload.users
            }
        case SET_USERS_COUNT:
                return{
                    ...state,
                    currentMonthCount: action.payload.currentMonthCount,
                    monthlyCount: action.payload.monthlyCount,
                    totalCount: action.payload.totalCount
                }
        default:
            return state
    }
}

export default userData