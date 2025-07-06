import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  api
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) => console.error("Error fetching items:", err));
};

export const addItem = (item) => (dispatch) => {
  api
    .post("/api/items", item)
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) => console.error("Error adding item:", err));
};

export const deleteItem = (id) => (dispatch) => {
  api
    .delete(`/api/items/${id}`)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: DELETE_ITEM,
          payload: id,
        });
      }
    })
    .catch((err) => {
      // Optionally dispatch an error action here
      console.error("Error deleting item:", err);
    });
};
    
export const setItemsLoading = () => ({
  type: ITEMS_LOADING,
});
