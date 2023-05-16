import { takeEvery, put } from "redux-saga/effects";
import { fetchRequest } from "../../utils/fetchRequest";
import {
  CREATE_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  GET_ITEMS,
  GET_ITEMS_COUNT,
  GET_ITEM_DETAIL,
  ITEMS_SEARCH,
  SELECT_ITEM_USING_CATEGORY,
  SELECT_ITEM_USING_SUBCATEGORY,
  SET_ALL_ITEMS,
  SET_CREATED_ITEM,
  SET_CREATE_ITEM_ERROR,
  SET_ITEMS_COUNT,
  SET_ITEM_DETAIL,
  SET_ITEM_SEARCH,
} from "../../Constant/reducerConstants";

function* createItem({ formData }) {
  const { item, error, message } = yield fetchRequest("/items", "POST", formData);
  if (error) {
    put({ type: SET_CREATE_ITEM_ERROR, payload: { error: message } });
  } else {
    put({ type: SET_CREATED_ITEM, payload: { item } });
  }
}
function* getItems({requestType}) {
  const res = yield fetchRequest(`/items?type=${requestType ? requestType : ''}`, "GET");
  yield put({ type: SET_ALL_ITEMS, payload: { items: res } });
}
function* getItemDetails({ id }) {
  const res = yield fetchRequest("/items/" + id, "GET");
  yield put({ type: SET_ITEM_DETAIL, payload: { detail: res } });
}
function* editItem({ id, updateData }) {
  const res = yield fetchRequest("/items/" + id, "PATCH", updateData);
  yield put({ type: SET_ITEM_DETAIL, payload: { detail: res } });
}
function* deleteItem({ id }) {
  yield fetchRequest("/items/" + id, "DELETE");
}
function* getItemsCount() {
  const res = yield fetchRequest("/items/count", "GET");
  yield put({ type: SET_ITEMS_COUNT, payload: res });
}
function* searchItem({ search, selectCategory, selectSubCategory }) {
  const res = yield fetchRequest(
    `/items?search=${search ? search : ``}&selectCategory=${
      selectCategory ? selectCategory : ``
    }&selectSubCategory=${selectSubCategory ? selectSubCategory : ``}`,
    "GET"
  );
  yield put({ type: SET_ITEM_SEARCH, payload: { items: res } });
}

export default function* itemSaga() {
  yield takeEvery(GET_ITEMS, getItems);
  yield takeEvery(GET_ITEM_DETAIL, getItemDetails);
  yield takeEvery(EDIT_ITEM, editItem);
  yield takeEvery(DELETE_ITEM, deleteItem);
  yield takeEvery(CREATE_ITEM, createItem);
  yield takeEvery(GET_ITEMS_COUNT, getItemsCount);
  yield takeEvery(
    [SELECT_ITEM_USING_CATEGORY, SELECT_ITEM_USING_SUBCATEGORY, ITEMS_SEARCH],
    searchItem
  );
}
