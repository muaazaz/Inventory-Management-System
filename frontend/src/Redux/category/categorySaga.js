import { takeEvery, put } from 'redux-saga/effects'
import { fetchRequest } from '../../utils/fetchRequest'
import { CATEGORY_SEARCH, CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORY, GET_CATEGORY_COUNT, GET_CATEGORY_DETAIL, GET_CATEGORY_SELECT, SELECT_CATEGORY_BY_ORGANIZATION, SET_ALL_CATEGORY, SET_CATEGORY_COUNT, SET_CATEGORY_DETAIL, SET_CATEGORY_SEARCH, SET_CREATED_CATEGORY, SET_CREATE_CATEGORY_ERROR } from '../../Constant/reducerConstants'

function* createCategory ({formData}){
    const {category, error, message} = yield fetchRequest("/category","POST", formData)
    if(error){
        put({type: SET_CREATE_CATEGORY_ERROR, payload:{error: message}})
    }else{
        put({type: SET_CREATED_CATEGORY, payload:{category}})
    }
}
function* getCategory (){
    const res  = yield fetchRequest("/category", "GET")
    yield put({type: SET_ALL_CATEGORY, payload: {categories: res}})
}
function* getCategoryDetails({id}){
    const res = yield fetchRequest("/category/"+id, "GET")
    yield put({type: SET_CATEGORY_DETAIL, payload:{detail: res}})
}
function* editCategory({id, updateData}){
    const res = yield fetchRequest("/category/"+id, "PATCH", updateData)
    yield put({type: SET_CATEGORY_DETAIL, payload:{detail: res}})
}
function*deleteCategory({id}){
    yield fetchRequest("/category/"+id, "DELETE")
}
function* getCategorysCount(){
    const res = yield fetchRequest("/category/count","GET")
    yield put({type: SET_CATEGORY_COUNT, payload: res})
}
function* searchCategory ({search, select}){
    const res = yield fetchRequest(`/category?search=${search? search : ``}&select=${select? select : ``}`, "GET")
    yield put({type: SET_CATEGORY_SEARCH, payload:{category: res}})
}
function* getCategoriesSelect(){
    const res = yield fetchRequest('/category/select', "GET")
    yield put({type: SET_CATEGORY_SEARCH, payload:{category: res}})
}

export default function* categorySaga() {
    yield takeEvery(GET_CATEGORY, getCategory)
    yield takeEvery(GET_CATEGORY_DETAIL, getCategoryDetails)
    yield takeEvery(EDIT_CATEGORY, editCategory)
    yield takeEvery(DELETE_CATEGORY, deleteCategory)
    yield takeEvery(CREATE_CATEGORY, createCategory)
    yield takeEvery(GET_CATEGORY_COUNT, getCategorysCount)
    yield takeEvery(GET_CATEGORY_SELECT, getCategoriesSelect)
    yield takeEvery([SELECT_CATEGORY_BY_ORGANIZATION, CATEGORY_SEARCH], searchCategory)
}