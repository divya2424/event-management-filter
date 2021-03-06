import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  HIDE_LOADER,
  SHOW_LOADER,
} from "./constant";

const initialState = {
  event: [],
  isFetching: false,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        isFetching: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        isFetching: false,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        event: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        event: [],
      };
    default:
      return state;
  }
};

export default eventReducer;
