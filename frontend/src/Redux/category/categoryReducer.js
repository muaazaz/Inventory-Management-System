import {
  DELETE_CATEGORY,
  SET_ALL_CATEGORY,
  SET_CATEGORY_COUNT,
  SET_CATEGORY_DETAIL,
  SET_CATEGORY_SEARCH,
  SET_CATEGORY_SELECT,
  SET_CREATED_CATEGORY,
  SET_CREATE_CATEGORY_ERROR,
} from "../../Constant/reducerConstants";

const categoryData = (state = [], action) => {
  switch (action.type) {
    case SET_CREATED_CATEGORY:
      return {
        ...state,
        error: "",
        createdCategory: action.payload.Category,
      };
    case SET_CREATE_CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case SET_ALL_CATEGORY:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case SET_CATEGORY_DETAIL:
      return {
        ...state,
        categoryDetail: action.payload.detail,
      };
    case SET_CATEGORY_SEARCH:
      return {
        ...state,
        categories: action.payload.category,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.Categorys.filter(
          (category) => category.id !== action.id
        ),
      };
    case SET_CATEGORY_COUNT:
      return {
        ...state,
        currentMonthCount: action.payload.currentMonthCount,
        monthlyCount: action.payload.monthlyCount,
        totalCount: action.payload.totalCount,
      };
    default:
      return state;
  }
};

export default categoryData;
