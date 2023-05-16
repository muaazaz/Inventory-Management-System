import { takeEvery, put } from 'redux-saga/effects'
import { CREATE_USER, DELETE_USER, EDIT_USER, GENERATE_OTP, GET_USERS, GET_USERS_COUNT, GET_USER_DETAILS, LOG_IN, SEARCH_USERS, SELECT_USER_ORGANIZATION, SET_CREATED_USER, SET_ERROR, SET_OTP, SET_SEARCHED_USERS, SET_USER, SET_USERS, SET_USERS_COUNT, SET_USER_DETAILS, UPDATE_PASSWORD, USER_ERROR } from '../../Constant/reducerConstants'
import { fetchRequest } from '../../utils/fetchRequest'

function* createUser({ data }) {
    const {user, error, message} = yield fetchRequest("/user/create", "POST", data)
    if(error){
        yield put({type: USER_ERROR, payload:{error: message}})
    }else{
        yield put({type: SET_CREATED_USER, payload:{user}})
    }
}
function* logIn({ data }) {
    const { user, token, error, message } = yield fetchRequest("/user/signin", "POST", data)
    if (error) {
        yield put({ type: SET_ERROR, payload: { error: message } })
    } else {
        yield put({ type: SET_USER, payload: { role: user.role.role, email: user.email, token: token.access_token, name: user.name } })
    }
}
function* getUsers() {
    const res = yield fetchRequest("/user", "GET")
    yield put({ type: SET_USERS, payload: { users: res } })
}
function* getUserDetails({id}){
    const res = yield fetchRequest("/user/"+id, "GET")
    yield put({type: SET_USER_DETAILS, payload:{user: res}})
}
function* editUser({data}){
    const {id, formData} = data
    const res = yield fetchRequest("/user/"+id, "PATCH", formData)
    yield put({type: SET_USER_DETAILS, payload:{user: res}})
}
function* deleteUser ({id}){
    yield fetchRequest("/user/"+id, "DELETE")
}
function* searchUser ({search, select}){
   const res = yield fetchRequest(`/user?search=${search? search : ``}&select=${select? select : ``}`, "GET")
   yield put({type: SET_SEARCHED_USERS, payload:{users: res}})
}
function* getUserCount(){
    const res = yield fetchRequest("/user/count","GET")
    yield put({type: SET_USERS_COUNT, payload: res})
}
function* generateOtp({data}){
    const res = yield fetchRequest("/user/otp", "POST", data)
    if(res.error){
        yield put({SET_ERROR, payload: res.message})
    }else{
        yield put({type: SET_OTP, payload: res.otp})
    }
}
function* updatePassword({data}){
    const res = yield fetchRequest("/user/password", "PATCH", data)
}
export default function* userSaga() {
    yield takeEvery(LOG_IN, logIn)
    yield takeEvery(GET_USERS, getUsers)
    yield takeEvery(CREATE_USER, createUser)
    yield takeEvery(GET_USER_DETAILS, getUserDetails)
    yield takeEvery(EDIT_USER, editUser)
    yield takeEvery(DELETE_USER, deleteUser)
    yield takeEvery(GET_USERS_COUNT, getUserCount )
    yield takeEvery([SEARCH_USERS, SELECT_USER_ORGANIZATION], searchUser)
    yield takeEvery(GENERATE_OTP, generateOtp)
    yield takeEvery(UPDATE_PASSWORD, updatePassword)
}