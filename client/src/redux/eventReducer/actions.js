import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  HIDE_LOADER,
  SHOW_LOADER,
} from "./constant";
import "isomorphic-fetch";
import URLS from "../../common/api";

// Action Creators
const showLoader = () => ({ type: SHOW_LOADER });
const hideLoader = () => ({ type: HIDE_LOADER });
const receivedEvent = (event) => ({ type: FETCH_DATA_SUCCESS, payload: event });
const eventError = () => ({ type: FETCH_DATA_FAILURE });

export const fetchEvent = () => (dispatch, getState) => {
  dispatch(showLoader());
  return fetch(URLS.getEvent)
    .then((event) => {
      dispatch(hideLoader());
      if(event && event.data){
        dispatch(receivedEvent(event.data));
      }
      
    })
    .catch((err) => {
      dispatch(hideLoader());
      dispatch(eventError(err));
    });
};


export const addEvent = (data) => (dispatch, getState) => {
  dispatch(showLoader());
  return fetch(URLS.postEvent, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((responseJson) => {
      dispatch(hideLoader());
      console.log('responseJson',responseJson)
      dispatch(fetchEvent())
      return responseJson
    })
    .catch((error) => {
      dispatch(hideLoader());
      dispatch(eventError(err));
    });
};

export const filterDiscount = (data) => (dispatch, getState) => {
  dispatch(showLoader());
  return fetch(URLS.filterDiscount, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)})
    .then((responseJson) => {
      dispatch(hideLoader());
      if(responseJson && responseJson.data){
        dispatch(receivedEvent(responseJson.data));
      }
    })
    .catch((err) => {
      dispatch(hideLoader());
      dispatch(eventError(err));
    });
};