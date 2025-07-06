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
          { ...action.payload, id: action.payload._id || action.payload.id },
          ...state.items.map((item) => ({ 
            ...item, 
            id: item._id || item.id 
          })),
        ],
      };
    case DELETE_ITEM:
      console.log("DELETE_ITEM action with payload:", action.payload);
      console.log("Current items before deletion:", state.items);
      const filteredItems = state.items.filter((item) => {
        const itemId = item._id || item.id;
        console.log("Comparing itemId:", itemId, "with payload:", action.payload);
        return itemId !== action.payload;
      });
      console.log("Filtered items after deletion:", filteredItems);
      return {
        ...state,
        items: filteredItems,
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
