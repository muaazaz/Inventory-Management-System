import { CREATE_USER, DELETE_USER, EDIT_USER, GENERATE_OTP, GET_USERS, GET_USERS_COUNT, GET_USER_DETAILS, LOG_IN, LOG_OUT, SEARCH_USERS, SELECT_USER_ORGANIZATION, UPDATE_PASSWORD } from "../../Constant/reducerConstants"

export const createUser  = (data) =>{
    return({
        type: CREATE_USER,
        data
    })
}

export const logIn = (data) =>{
    return({
        type: LOG_IN,
        data
    })
}

export const logOut = () =>{
    return({
        type: LOG_OUT
    })
}

export const getUsers = ()=>{
    return({
        type: GET_USERS
    })
}

export const getUserDetails = (id)=>{
    return({
        type: GET_USER_DETAILS,
        id
    })
}

export const editUser = (data)=>{
    return({
        type: EDIT_USER,
        data
    })
}

export const deleteUser = (id)=>{
    return({
        type: DELETE_USER,
        id
    })
}

export const searchUser = (data)=>{
    return({
        type: SEARCH_USERS,
        search: data
    })
}

export const selectUserOrganization = (data)=>{
    return({
        type: SELECT_USER_ORGANIZATION,
        select: data
    })
}

export const getUserCount = ()=>{
    return({
        type: GET_USERS_COUNT
    })
}

export const generateOtp = (data)=>{
    return({
        type: GENERATE_OTP,
        data
    })
}

export const updatePassword = (data)=>{
    return({
        type: UPDATE_PASSWORD,
        data
    })
}