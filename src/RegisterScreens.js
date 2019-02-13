import { Navigation } from 'react-native-navigation';

import Coinlist from './Screens/Coinlist';
import CoinDetail from './Screens/CoinDetail';
import WebBrowserCustom from './Screens/WebBrowserCustom';

export function registerScreens(store, Provider) {
    Navigation.registerComponentWithRedux('Coinlist', () => Coinlist, Provider, store);
    Navigation.registerComponentWithRedux('CoinDetail', () => CoinDetail, Provider, store);
    Navigation.registerComponentWithRedux('WebBrowserCustom', () => WebBrowserCustom, Provider, store);
}