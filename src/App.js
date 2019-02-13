import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './Store/ConfigureStore';

import { registerScreens } from './RegisterScreens';

const store = configureStore();
registerScreens(store, Provider);

global.globCurrencySymbol = 'USD';
global.globCurrencyFormate = '$';

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait']
        },
        statusBar: {
            style: 'light'
        },
    });

    Navigation.setRoot({
        root: {
            stack: {
                id: "App",
                children: [
                    {
                        id: "Coinlist",
                        component: {
                            name: "Coinlist",
                            options: {
                                topBar: {
                                    visible: false,
                                    drawBehind: true,
                                    ...Platform.select({
                                        ios: {
                                            translucent: true,
                                            transparent: true,
                                        },
                                        android: {

                                        },
                                    }),
                                    background: {
                                        color: 'transparent',
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    });
});