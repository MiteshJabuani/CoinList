import {
  COINS_FETCH,
  COINS_FETCH_SUCCESS,
  COINS_FETCH_FAIL
} from '../Actions/types';

const INITIAL_STATE = {
  resultcoinlist:[],
  errorcoinlist: '',
  loadingcoinlist: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COINS_FETCH:
      return { ...state, loadingcoinlist: true, errorcoinlist: '' };
    case COINS_FETCH_SUCCESS:
      if (action.coffset == 0) {
        return { ...state, ...INITIAL_STATE, resultcoinlist: action.payload };
      } else {
        return { ...state, ...INITIAL_STATE, resultcoinlist: state.resultcoinlist.concat(action.payload) };
      }
      
    case COINS_FETCH_FAIL:
      return { ...state, errorcoinlist: 'Coin List not fetch.', loadingcoinlist: false };
    default:
      return state;
  }
};