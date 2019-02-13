import {combineReducers} from 'redux';
import coinReducer from './CoinReducer';
import GlobalDataReducer from './GlobalDataReducer';
import CoinDetailReducer from './CoinDetailReducer';

export default combineReducers({
    coins: coinReducer,
    globalData: GlobalDataReducer,
    coinDetail: CoinDetailReducer,
});
