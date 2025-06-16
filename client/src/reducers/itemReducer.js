import {
  DELETE_ITEM,
  GET_ITEMS,
  ADD_ITEM,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload.map((item) => ({
          ...item,
          id: item._id || item.id,
        })),
        loading: false,
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [
          action.payload,
          ...state.items.map((item) => ({ ...item, id: item._id || item.id })),
        ],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
