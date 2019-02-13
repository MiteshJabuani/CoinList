import axios from 'axios';
import {
  COINS_FETCH,
  COINS_FETCH_SUCCESS,
  COINS_FETCH_FAIL
} from './types';

export const coinsFetch = (offset,limit) => {
  var url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${offset}&limit=${limit}&convert=${global.globCurrencySymbol}&CMC_PRO_API_KEY=e0a9e31b-ed4e-48f3-858e-e84a0470a76b`;
  return (dispatch) => {
    dispatch({ type: COINS_FETCH });
    axios.get(url)
      .then(response => coinFetchSuccess(offset, dispatch, response.data.data))
      .catch(() => coinFetchFail(dispatch));
  };
};

const coinFetchFail = (dispatch) => {
  dispatch({ type: COINS_FETCH_FAIL });
};

const coinFetchSuccess = (offset, dispatch, resultCoinList) => {
  dispatch({
    coffset: offset,
    type: COINS_FETCH_SUCCESS,
    payload: resultCoinList
  });
};
