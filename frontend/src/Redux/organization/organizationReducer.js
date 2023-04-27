import { CREATE_ORGANIZATION, DELETE_ORGANIZATION, EDIT_ORGANIZATION_DETAIL, SET_ALL_ORGANIZATIONS, SET_CREATED_ORGANIZATION, SET_CREATE_ORGANIZATION_ERROR, SET_ORGANIZATIONS_COUNT, SET_ORGANIZATION_DETAIL, SET_ORGANIZATION_SEARCH } from "../../Constant/reducerConstants"

const orgData = (state=[], action) => {
    switch (action.type) {
        case SET_CREATED_ORGANIZATION:
            return{
                ...state,
                error: "",
                createdOrganization: action.payload.organization
            }
        case SET_CREATE_ORGANIZATION_ERROR:
            return{
                ...state,
                error: action.payload.error
            }
        case SET_ALL_ORGANIZATIONS:
            return{
                ...state,
                organizations: action.payload.organizations,
                locations: action.payload.locations
            }
        case SET_ORGANIZATION_DETAIL:
            return{
                ...state,
                organizationDetail: action.payload.detail,
                organizationAdmins: action.payload.admins
            }
        case EDIT_ORGANIZATION_DETAIL:
            return{
                ...state,
                organizationDetail: action.payload.detail,
            }
        case SET_ORGANIZATION_SEARCH:
            return{
                ...state,
                organizations: action.payload.organizations
            }
        case DELETE_ORGANIZATION:
            return{
                ...state,
                organizations: state.organizations.filter((organization)=>organization.id !== action.id)
            }
        case CREATE_ORGANIZATION:
            return{
                ...state,
                message: "Organization has been sucessfully created"
            }
        case SET_ORGANIZATIONS_COUNT:
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

export default orgData