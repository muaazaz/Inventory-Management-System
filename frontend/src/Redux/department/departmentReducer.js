import { DELETE_DEPARTMENT, SET_ALL_DEPARTMENT, SET_CREATED_DEPARTMENT, SET_CREATE_DEPARTMENT_ERROR, SET_DEPARTMENT_DETAIL, SET_DEPARTMENT_SEARCH } from "../../Constant/reducerConstants"

const departmentData = (state=[], action) => {
    switch (action.type) {
        case SET_CREATED_DEPARTMENT:
            return{
                ...state,
                error: ""
            }
        case SET_CREATE_DEPARTMENT_ERROR:
            return{
                ...state,
                error: action.payload.error            
            }
        case SET_ALL_DEPARTMENT:
            return{
                ...state,
                departments: action.payload.departments
            }
        case SET_DEPARTMENT_DETAIL:
            return{
                ...state,
                departmentDetail: action.payload.detail
            }
        case SET_DEPARTMENT_SEARCH:
            return{
                ...state,
                departments: action.payload.departments
            }
        case DELETE_DEPARTMENT:
            return{
                ...state,
                departments: state.departments.filter((department)=>department.id !== action.id)
            }
        default:
            return state
    }
}

export default departmentData