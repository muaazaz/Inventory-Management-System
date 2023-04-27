import { CREATE_VENDOR, DELETE_VENDOR, EDIT_VENDOR, GET_VENDORS, GET_VENDORS_COUNT, GET_VENDOR_DETAIL, SELECT_VENDORY_BY_CATEGORY, SELECT_VENDORY_BY_SUBCATEGORY, VENDORS_SEARCH } from "../../Constant/reducerConstants"

export const createVendor = (formData)=>{
    return({
        type: CREATE_VENDOR,
        formData
    })
}

export const getVendors = (data)=>{
    return({
        type: GET_VENDORS,
        category: data
    })
}
export const getVendorDetails = (data)=>{
    return({
        type: GET_VENDOR_DETAIL,
        id: data
    })
}
export const editVendor = (data)=>{
    return({
        type: EDIT_VENDOR,
        id: data.id,
        updateData: data.formData
    })
}
export const searchVendors = (data)=>{
    return({
        type: VENDORS_SEARCH,
        search: data
    })
}
export const selectUsingCategory = (data)=>{
    return({
        type: SELECT_VENDORY_BY_CATEGORY,
        catSelect: data
    })
}
export const selectUsingSubCategory = (data)=>{
    return({
        type: SELECT_VENDORY_BY_SUBCATEGORY,
        subCatSelect: data
    })
}
export const deleteVendor = (data)=>{
    return({
        type: DELETE_VENDOR,
        id: data
    })
}
export const getVendorsCount = ()=>{
    return({
        type: GET_VENDORS_COUNT
    })
}