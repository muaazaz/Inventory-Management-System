import { CREATE_ORGANIZATION, DELETE_ORGANIZATION, EDIT_ORGANIZATION, GET_ORGANIZATIONS, GET_ORGANIZATIONS_COUNT, GET_ORGANIZATION_DETAIL, ORGANIZATIONS_SEARCH, SELECT_USING_LOCATION } from "../../Constant/reducerConstants"

export const createOrganization = (formData)=>{
    return({
        type: CREATE_ORGANIZATION,
        formData
    })
}

export const getOrganizations = ()=>{
    return({
        type: GET_ORGANIZATIONS
    })
}
export const getOrganizationDetails = (data)=>{
    return({
        type: GET_ORGANIZATION_DETAIL,
        id: data
    })
}
export const editOrganization = (data)=>{
    return({
        type: EDIT_ORGANIZATION,
        id: data.id,
        updateData: data.formData
    })
}
export const searchOrganizations = (data)=>{
    return({
        type: ORGANIZATIONS_SEARCH,
        search: data
    })
}
export const selectUsingLocation = (data)=>{
    return({
        type: SELECT_USING_LOCATION,
        select: data
    })
}
export const deleteOrganization = (data)=>{
    return({
        type: DELETE_ORGANIZATION,
        id: data
    })
}
export const getOrganizationCount = ()=>{
    return({
        type: GET_ORGANIZATIONS_COUNT
    })
}