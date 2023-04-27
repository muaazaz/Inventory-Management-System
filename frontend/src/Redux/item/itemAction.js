import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, GET_ITEMS, GET_ITEMS_COUNT, GET_ITEM_DETAIL, ITEMS_SEARCH, SELECT_ITEM_USING_CATEGORY, SELECT_ITEM_USING_SUBCATEGORY } from "../../Constant/reducerConstants"

export const createItem = (formData)=>{
    return({
        type: CREATE_ITEM,
        formData
    })
}

export const getItems = ()=>{
    return({
        type: GET_ITEMS
    })
}
export const getItemDetails = (data)=>{
    return({
        type: GET_ITEM_DETAIL,
        id: data
    })
}
export const editItem = (data)=>{
    return({
        type: EDIT_ITEM,
        id: data.id,
        updateData: data.formData
    })
}
export const searchItems = (data)=>{
    return({
        type: ITEMS_SEARCH,
        search: data
    })
}
export const selectUsingCategory = (data)=>{
    return({
        type: SELECT_ITEM_USING_CATEGORY,
        selectCategory: data
    })
}
export const selectUsingSubCategory = (data)=>{
    return({
        type: SELECT_ITEM_USING_SUBCATEGORY,
        selectSubCategory: data.subCatSelect,
        selectCategory: data.categorySelect
    })
}
export const deleteItem = (data)=>{
    return({
        type: DELETE_ITEM,
        id: data
    })
}
export const getItemCount = ()=>{
    return({
        type: GET_ITEMS_COUNT
    })
}