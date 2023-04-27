import { CATEGORY_SEARCH, CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORY, GET_CATEGORY_COUNT, GET_CATEGORY_DETAIL, SELECT_CATEGORY_BY_ORGANIZATION } from "../../Constant/reducerConstants"

export const createCategory = (formData)=>{
    return({
        type: CREATE_CATEGORY,
        formData
    })
}

export const getCategories = ()=>{
    return({
        type: GET_CATEGORY
    })
}
export const getCategoryDetails = (data)=>{
    return({
        type: GET_CATEGORY_DETAIL,
        id: data
    })
}
export const editCategory = (data)=>{
    return({
        type: EDIT_CATEGORY,
        id: data.id,
        updateData: data.formData
    })
}
export const searchCategory = (data)=>{
    return({
        type: CATEGORY_SEARCH,
        search: data
    })
}
export const selectUsingOrganization = (data)=>{
    return({
        type: SELECT_CATEGORY_BY_ORGANIZATION,
        select: data
    })
}
export const deleteCategory = (data)=>{
    return({
        type: DELETE_CATEGORY,
        id: data
    })
}
export const getCategoryCount = ()=>{
    return({
        type: GET_CATEGORY_COUNT
    })
}