import {
    COIN_DETAIL_FETCH,
    COIN_DETAIL_FETCH_SUCCESS,
    COIN_DETAIL_FETCH_FAIL
  } from '../Actions/types';
  
  const INITIAL_STATE = {
    resultcoindetail:[],
    errorcoindetail: '',
    loadingcoindetail: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case COIN_DETAIL_FETCH:
        return { ...state, loadingcoindetail: true, errorcoindetail: '' };
      case COIN_DETAIL_FETCH_SUCCESS:
        return { ...state, ...INITIAL_STATE, resultcoindetail: action.payload };
      case COIN_DETAIL_FETCH_FAIL:
        return { ...state, errorcoindetail: 'Coin Detail not fetch.', loadingcoindetail: false };
      default:
        return state;
    }
  };