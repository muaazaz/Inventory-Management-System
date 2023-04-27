import { takeEvery, put } from 'redux-saga/effects'
import { fetchRequest } from '../../utils/fetchRequest'
import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, DEPARTMENT_SEARCH, EDIT_DEPARTMENT, GET_DEPARTMENT, GET_DEPARTMENT_DETAIL, SET_ALL_DEPARTMENT, SET_CREATED_DEPARTMENT, SET_CREATE_DEPARTMENT_ERROR, SET_DEPARTMENT_DETAIL, SET_DEPARTMENT_SEARCH } from '../../Constant/reducerConstants'

function* createDepartment ({formData}){
    const {error, message} = yield fetchRequest("/department","POST", formData)
    if(error){
        put({type: SET_CREATE_DEPARTMENT_ERROR, payload:{error: message}})
    }else{
        put({type: SET_CREATED_DEPARTMENT})
    }
}
function* getDepartments (){
    const res  = yield fetchRequest("/department", "GET")
    yield put({type: SET_ALL_DEPARTMENT, payload: {departments: res}})
}
function* getDepartmentDetails({id}){
    const res = yield fetchRequest("/department/"+id, "GET")
    yield put({type: SET_DEPARTMENT_DETAIL, payload:{detail: res}})
}
function* editDepartment({id, updateData}){
    const res = yield fetchRequest("/department/"+id, "PATCH", updateData)
    yield put({type: SET_DEPARTMENT_DETAIL, payload:{detail: res}})
}
function*deleteDepartment({id}){
    yield fetchRequest("/department/"+id, "DELETE")
}
function* searchDepartment ({search, select}){
    const res = yield fetchRequest(`/department/findby?search=${search? search : ``}`, "GET")
    yield put({type: SET_DEPARTMENT_SEARCH, payload:{departments: res}})
 }

export default function* departmentSaga() {
    yield takeEvery(GET_DEPARTMENT, getDepartments)
    yield takeEvery(GET_DEPARTMENT_DETAIL, getDepartmentDetails)
    yield takeEvery(EDIT_DEPARTMENT, editDepartment)
    yield takeEvery(DELETE_DEPARTMENT, deleteDepartment)
    yield takeEvery(CREATE_DEPARTMENT, createDepartment)
    yield takeEvery(DEPARTMENT_SEARCH, searchDepartment)
}