import { DELETE_ITEM, SET_ALL_ITEMS, SET_CREATED_ITEM, SET_CREATE_ITEM_ERROR, SET_ITEMS_COUNT, SET_ITEM_DETAIL, SET_ITEM_SEARCH } from "../../Constant/reducerConstants"

const itemData = (state=[], action) => {
    switch (action.type) {
        case SET_CREATED_ITEM:
            return{
                ...state,
                error: "",
                createdItem: action.payload.item
            }
        case SET_CREATE_ITEM_ERROR:
            return{
                ...state,
                error: action.payload.error
            }
        case SET_ALL_ITEMS:
            return{
                ...state,
                items: action.payload.items
            }
        case SET_ITEM_DETAIL:
            return{
                ...state,
                itemDetails: action.payload.detail
            }
        case SET_ITEM_SEARCH:
            return{
                ...state,
                items: action.payload.items
            }
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter((item)=>item.id !== action.id)
            }
        case SET_ITEMS_COUNT:
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

export default itemData