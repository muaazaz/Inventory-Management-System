import { takeEvery, put } from 'redux-saga/effects'
import {CREATE_ORGANIZATION, DELETE_ORGANIZATION, EDIT_ORGANIZATION, EDIT_ORGANIZATION_DETAIL, GET_ORGANIZATIONS, GET_ORGANIZATIONS_COUNT, GET_ORGANIZATION_DETAIL, ORGANIZATIONS_SEARCH, SELECT_USING_LOCATION, SET_ALL_ORGANIZATIONS, SET_CREATED_ORGANIZATION, SET_CREATE_ORGANIZATION_ERROR, SET_ORGANIZATIONS_COUNT, SET_ORGANIZATION_DETAIL, SET_ORGANIZATION_SEARCH} from '../../Constant/reducerConstants'
import { fetchRequest } from '../../utils/fetchRequest'

function* createOrganization ({formData}){
    const {organization, error, message} = yield fetchRequest("/organization","POST", formData)
    if(error){
        put({type: SET_CREATE_ORGANIZATION_ERROR, payload:{error: message}})
    }else{
        put({type: SET_CREATED_ORGANIZATION, payload:{organization}})
    }
}
function* getOrganizations (){
    const res  = yield fetchRequest("/organization", "GET")
    if(!res.error){
        const locations =res?.map((obj)=>{return obj.location})
        yield put({type: SET_ALL_ORGANIZATIONS, payload: {organizations: res, locations: [...new Set(locations)]}})
    }
}
function* getOrganizationDetails({id}){
    const res = yield fetchRequest("/organization/"+id, "GET")
    let admins = res.user?.filter((user)=>user.role === 'admin')
    admins.forEach(element => {
        delete element['role']
    }); 
    delete res['user']
    yield put({type: SET_ORGANIZATION_DETAIL, payload:{detail: res, admins}})
}
function* editOrganization({id, updateData}){
    const res = yield fetchRequest("/organization/"+id, "PATCH", updateData)
    delete res['user']
    yield put({type: EDIT_ORGANIZATION_DETAIL, payload:{detail: res}})
}
function*deleteOrganization({id}){
    yield fetchRequest("/organization/"+id, "DELETE")
}
function* getOrgCount(){
    const res = yield fetchRequest("/organization/count","GET")
    yield put({type: SET_ORGANIZATIONS_COUNT, payload:res})
}
function* searchOrganization ({search, select}){
    const res = yield fetchRequest(`/organization?search=${search? search : ``}&select=${select? select : ``}`, "GET")
    yield put({type: SET_ORGANIZATION_SEARCH, payload:{organizations: res}})
 }

export default function* organizationSaga() {
    yield takeEvery(GET_ORGANIZATIONS, getOrganizations)
    yield takeEvery(GET_ORGANIZATION_DETAIL, getOrganizationDetails)
    yield takeEvery(EDIT_ORGANIZATION, editOrganization)
    yield takeEvery(DELETE_ORGANIZATION, deleteOrganization)
    yield takeEvery(CREATE_ORGANIZATION, createOrganization)
    yield takeEvery(GET_ORGANIZATIONS_COUNT, getOrgCount)
    yield takeEvery(ORGANIZATIONS_SEARCH, searchOrganization)
    yield takeEvery(SELECT_USING_LOCATION, searchOrganization)
}