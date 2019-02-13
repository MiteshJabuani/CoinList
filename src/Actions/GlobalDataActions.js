import axios from 'axios';
import {
  GLOBAL_DATA_FETCH_SUCCESS,
} from './types';

export const globalDataFetch = () => {
  return (dispatch) => {
    var url = `https://api.coinmarketcap.com/v1/global`;
    axios.get(url)
      .then(response => {
        dispatch({ type: GLOBAL_DATA_FETCH_SUCCESS, payload: response.data });
      });
  };
};
