import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, DEPARTMENT_SEARCH, EDIT_DEPARTMENT, GET_DEPARTMENT, GET_DEPARTMENT_DETAIL } from "../../Constant/reducerConstants"

export const createDepartment = (formData)=>{
    return({
        type: CREATE_DEPARTMENT,
        formData
    })
}

export const getDepartments = ()=>{
    return({
        type: GET_DEPARTMENT
    })
}
export const getDepartmentDetails = (data)=>{
    return({
        type: GET_DEPARTMENT_DETAIL,
        id: data
    })
}
export const editDepartment = (data)=>{
    return({
        type: EDIT_DEPARTMENT,
        id: data.id,
        updateData: data.formData
    })
}
export const searchDepartments = (data)=>{
    return({
        type: DEPARTMENT_SEARCH,
        search: data
    })
}
export const deleteDepartment = (data)=>{
    return({
        type: DELETE_DEPARTMENT,
        id: data
    })
}