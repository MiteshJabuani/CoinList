import axios from 'axios';
import {
  COIN_DETAIL_FETCH,
  COIN_DETAIL_FETCH_SUCCESS,
  COIN_DETAIL_FETCH_FAIL
} from './types';

export const coinDetailFetch = (coinSymbol) => {
    var url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${coinSymbol}&CMC_PRO_API_KEY=e0a9e31b-ed4e-48f3-858e-e84a0470a76b`;
  return (dispatch) => {
    dispatch({ type: COIN_DETAIL_FETCH });
    axios.get(url)
      .then(response => coinDetailFetchSuccess(dispatch, response.data.data[coinSymbol]))
      .catch(() => coinDetailFetchFail(dispatch));
  };
};

const coinDetailFetchFail = (dispatch) => {
  dispatch({ type: COIN_DETAIL_FETCH_FAIL });
};

const coinDetailFetchSuccess = (dispatch, resultCoinDetail) => {
  dispatch({
    type: COIN_DETAIL_FETCH_SUCCESS,
    payload: resultCoinDetail
  });
};
