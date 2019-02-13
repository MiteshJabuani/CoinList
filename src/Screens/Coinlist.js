import _ from 'lodash';
import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    FlatList,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';

import { Spinner } from '../components/common';
import { coinsFetch, globalDataFetch } from '../Actions';
import CoinCell from './CoinCell';

const {width} = Dimensions.get('window');

let isPressNameButton = false;
let isPressMCapButton = false;
let isPressChangeButton = false;
let isPressPriceButton = false;

class Coinlist extends Component {

    state = {
        isFetching: false,
    };

    constructor(props) {
        super(props);
        this.returnPressImageView = this.returnPressImageView.bind(this);
        this.offset = 1;
        this.limit = 50;
    }

    componentWillMount() {
        this.props.globalDataFetch();
        this.props.coinsFetch(this.offset, this.limit);
    }

    onCoinCellRowPress = (item) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'CoinDetail',
                        passProps: {
                            coinDetailFromList: item,
                        },
                        options: {
                            popGesture: false,
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
                }]
            }
        });
    }

    truncateNumber = (doubleNumber) => {
        var million = 1000000;
        var billion = 1000000000;
        var trillion = 1000000000000;
        var number = Math.round(doubleNumber);

        if ((number >= million) && (number < billion)) {
            var divNumber = doubleNumber / million;
            return divNumber.toFixed(2) + " M";
        } else if ((number >= billion) && (number < trillion)) {
            var divNumber = doubleNumber / billion;
            return divNumber.toFixed(2) + " B";
        } else {
            var divNumber = doubleNumber / trillion;
            return divNumber.toFixed(2) + " T";
        }
    }

    onClickNamePress = () => {
        var newArray = this.props.coins;
        isPressNameButton = !isPressNameButton;
        if (isPressNameButton == true) {
            console.log("Name Click UP");
            let sortedResultsByName = newArray.sort(function (a, b) {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            });
        } else {
            console.log("Name Click DOWN");
            let sortedResultsByName = newArray.sort(function (a, b) {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }

                return 0;
            });
        }

        this.forceUpdate();
        this.flatListRef.scrollToIndex({animated: true, index: 0});
    }

    onClickMCapPress = () => {
        var newArray = this.props.coins;
        isPressMCapButton = !isPressMCapButton;
        if (isPressMCapButton == true) {
            console.log("MCap Click UP");
            let sortedResultsByMCap = newArray.sort(function (a, b) {
                var nameA = a.quote.USD.market_cap;
                var nameB = b.quote.USD.market_cap;
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }

                return 0;
            });
        } else {
            console.log("MCap Click DOWN");
            let sortedResultsByMCap = newArray.sort(function (a, b) {
                var nameA = a.quote.USD.market_cap;
                var nameB = b.quote.USD.market_cap;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            });
        }
        this.forceUpdate();
        this.flatListRef.scrollToIndex({animated: true, index: 0});
    }

    onClickChangePress = () => {
        var newArray = this.props.coins;
        isPressChangeButton = !isPressChangeButton;
        if (isPressChangeButton == true) {
            console.log("Change Click UP");
            let sortedResultsByChange = newArray.sort(function (a, b) {
                var nameA = a.quote.USD.percent_change_24h;
                var nameB = b.quote.USD.percent_change_24h;
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }

                return 0;
            });
        } else {
            console.log("Change Click DOWN");
            let sortedResultsByChange = newArray.sort(function (a, b) {
                var nameA = a.quote.USD.percent_change_24h;
                var nameB = b.quote.USD.percent_change_24h;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            });
        }
        this.forceUpdate();
        this.flatListRef.scrollToIndex({animated: true, index: 0});
    }

    onClickPricePress = () => {
        var newArray = this.props.coins;
        isPressPriceButton = !isPressPriceButton;
        if (isPressPriceButton == true) {
            console.log("Price Click UP");
            let sortedResultsByPrice = newArray.sort(function (a, b) {
                var nameA = a.quote.USD.price;
                var nameB = b.quote.USD.price;
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }

                return 0;
            });
        } else {
            console.log("Price Click DOWN");
            let sortedResultsByPrice = newArray.sort(function (a, b) {
                var nameA = a.quote.USD.price;
                var nameB = b.quote.USD.price;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            });
        }
        this.forceUpdate();
        this.flatListRef.scrollToIndex({animated: true, index: 0});
    }

    returnPressImageView(isPressButton) {
        if (isPressButton == true) {
            return <Image
                style={styles.changePricePercentImage}
                source={require('../Image/Double_arrow_green_up.png')}/>;
        } else {
            return <Image
                style={styles.changePricePercentImage}
                source={require('../Image/Double_arrow_red_down.png')}/>;
        }
    };

    getCoinListErrorLabel = () => {
        if (this.props.errorcoinlist != '') {
            return (
                <React.Fragment>
                    <Text style={styles.errorTextStyle}>{this.props.errorcoinlist}</Text>
                </React.Fragment>
            )
        }
    }

    onRefresh() {
        console.log("refreshing list......");
        this.setState({ isFetching: true }, () => {
            this.props.coinsFetch(1, this.limit);
        });
    }

    componentWillUpdate() {
        if(this.state.isFetching == true) {
            this.setState({ isFetching: false });
        }
    }

    render() {
        const {
            total_market_cap_usd,
            total_24h_volume_usd,
            bitcoin_percentage_of_market_cap,
            active_currencies,
            active_assets,
            active_markets
            } = this.props.globalData;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.toolbar}>
                    <LinearGradient
                        colors={['#4eadfe', '#0fe5fe']}
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        style={{flex: 1, flexDirection: 'row'}}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            paddingTop: 30,
                            paddingBottom: 15,
                            paddingLeft: 14,
                            paddingRight: 14
                        }}>
                            <View style={{flex: 2, flexDirection: 'column'}}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <View>
                                            <Text style={{color: 'white', fontSize: 17}}>Coin List</Text>
                                        </View>
                                        <View style={{width: width}}>
                                            <Text style={{
                                                color: 'white',
                                                fontWeight: '900',
                                                fontSize: 30
                                            }}>Cryptocurrencies</Text>
                                        </View>
                                    </View>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={{color: 'white', fontWeight: '700', fontSize: 11}}>CRYPTO M.
                                            CAP</Text>
                                        <Text style={{
                                            color: 'white',
                                            fontWeight: '700',
                                            fontSize: 15
                                        }}>{this.truncateNumber(total_market_cap_usd)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                <View style={{flex: 1, backgroundColor: 'white',marginBottom:Platform.OS === 'ios' ? 34 : 0}}>
                    <View style={{
                        paddingStart: 18,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        height: 33
                    }}>
                        <View style={styles.sortButtonTopView}>
                            <TouchableOpacity onPress={this.onClickNamePress}>
                                <View style={styles.flexDirectionRowView}>
                                    {this.returnPressImageView(isPressNameButton)}
                                    <Text style={styles.textSortingButton}>NAME</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={{marginLeft: 5, marginRight: 5}}>/</Text>
                            <TouchableOpacity onPress={this.onClickMCapPress}>
                                <View style={styles.flexDirectionRowView}>
                                    {this.returnPressImageView(isPressMCapButton)}
                                    <Text style={styles.textSortingButton}>M.CAP</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.onClickChangePress}>
                            <View style={styles.sortButtonTopView}>
                                {this.returnPressImageView(isPressChangeButton)}
                                <Text style={styles.textSortingButton}>CHANGE</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onClickPricePress}>
                            <View style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 14
                            }}>
                                {this.returnPressImageView(isPressPriceButton)}
                                <Text style={styles.textSortingButton}>PRICE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.getCoinListErrorLabel()}
                        <FlatList
                            ref={(ref) => {
                                this.flatListRef = ref;
                            }}
                            data={this.props.coins}
                            renderItem={({item}) => (
                                <CoinCell coin={item} onRowPress={() => this.onCoinCellRowPress(item)}/>
                            )}
                            initialNumToRender={20}
                            keyExtractor={(item, index) => item.id.toString()}
                            ListFooterComponent={this.renderFooter.bind(this)}
                            onEndReachedThreshold={0.5}
                            onEndReached={this.handleLoadMore.bind(this)}
                            showsVerticalScrollIndicator={false}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={50}
                            windowSize={50}
                            updateCellsBatchingPeriod={100}
                            getItemLayout={(data, index) => (
                                {length: 60, offset: 60 * index, index}
                            )}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                        />
                    </View>
                </View>
            </View>
        );
    }

    renderFooter = () => {
        if (!this.props.loadingcoinlist) return null;
        return (
            <Spinner size="large"/>
        );
    };

    handleLoadMore = () => {
        if (!this.props.loadingcoinlist) {
            if (this.offset <= this.props.coins.length) {
                this.offset = this.offset + this.limit;
                this.props.coinsFetch(this.offset, this.limit);
            }
        }
    };
}

const styles = {
    toolbar: {
        backgroundColor: '#4eadfe',
        paddingTop: 0,
        paddingBottom: 0,
        flexDirection: 'row',
        height: 167,
        paddingLeft: 0,
        paddingRight: 0
    },
    mainContainer: {
        flex: 1
    },
    changePricePercentImage: {
        width: 14,
        height: 14
    },
    sortButtonTopView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexDirectionRowView: {
        flexDirection: 'row'
    },
    textSortingButton: {
        marginLeft: 3,
        color: '#4eadfe',
        fontWeight: '500',
        fontSize: 11
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    const {resultcoinlist, errorcoinlist, loadingcoinlist} = state.coins;
    const coins = _.map(resultcoinlist, (val) => {
        return {...val};
    });
    const globalData = state.globalData;
    return {
        coins,
        globalData,
        errorcoinlist,
        loadingcoinlist,
    };
};

export default connect(mapStateToProps, {
    coinsFetch,
    globalDataFetch,
})(Coinlist);
