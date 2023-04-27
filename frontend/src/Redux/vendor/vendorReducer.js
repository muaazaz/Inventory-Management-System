import { DELETE_VENDOR, SET_ALL_VENDORS, SET_CREATED_VENDOR, SET_CREATE_VENDOR_ERROR, SET_VENDORS_COUNT, SET_VENDOR_DETAIL } from "../../Constant/reducerConstants"

const vendorData = (state=[], action) => {
    switch (action.type) {
        case SET_CREATED_VENDOR:
            return{
                ...state,
                error: "",
                createdVendor: action.payload.vendor
            }
        case SET_CREATE_VENDOR_ERROR:
            return{
                ...state,
                error: action.payload.error
            }
        case SET_ALL_VENDORS:
            return{
                ...state,
                vendors: action.payload.vendors
            }
        case SET_VENDOR_DETAIL:
            return{
                ...state,
                vendorDetail: action.payload.detail
            }
        case DELETE_VENDOR:
            return{
                ...state,
                vendors: state.vendors.filter((vendor)=>vendor.id !== action.id)
            }
        case SET_VENDORS_COUNT:
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

export default vendorData