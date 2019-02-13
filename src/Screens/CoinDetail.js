import { coinDetailFetch } from '../Actions';
import _ from 'lodash';
import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    ScrollView,
    FlatList,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Spinner } from '../components/common';
import CoinImportantLinkCell from './CoinImportantLinkCell';

import { Navigation } from 'react-native-navigation';

const { width } = Dimensions.get('window');
var arrFinalImportantLink = new Array();

class CoinDetail extends Component {

    state = {
        coinCardModalVisible: false,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.coinDetailFetch(this.props.coinDetailFromList.symbol);

        this.createImpLinkDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createImpLinkDataSource(nextProps);
    }

    createImpLinkDataSource(newProps) {
        const {
            urls
        } = newProps.coinDetailData;

        var arrImportantLink = new Array();

        if (newProps.coinDetailData.urls !== undefined) {
            let strWebsite = urls.website[0];
            if (strWebsite !== undefined) {
                arrImportantLink.push({
                    name: "Website",
                    link: strWebsite,
                    image: require('../Image/ic_website.png')
                });
            }

            let strExplorer = urls.explorer[0];
            if (strExplorer !== undefined) {
                arrImportantLink.push({
                    name: "Explorer",
                    link: strExplorer,
                    image: require('../Image/ic_explorer.png')
                });
            }

            let strForum = urls.announcement[0];
            if (strForum !== undefined) {
                arrImportantLink.push({
                    name: "Announcement",
                    link: strForum,
                    image: require('../Image/ic_forum.png')
                });
            }

            let strGithub = urls.source_code[0];
            if (strGithub !== undefined) {
                arrImportantLink.push({
                    name: "Github",
                    link: strGithub,
                    image: require('../Image/ic_github.png')
                });
            }

            let strTwitter = urls.twitter[0];
            if (strTwitter !== undefined) {
                arrImportantLink.push({
                    name: "Twitter",
                    link: strTwitter,
                    image: require('../Image/ic_twitter.png')
                });
            }

            let strSlack = urls.chat[0];
            if (strSlack !== undefined) {
                arrImportantLink.push({
                    name: "Chat",
                    link: strSlack,
                    image: require('../Image/ic_slack.png')
                });
            }

            let strPaper = urls.message_board[0];
            if (strPaper !== undefined) {
                arrImportantLink.push({
                    name: "Message Board",
                    link: strPaper,
                    image: require('../Image/ic_white_paper.png')
                });
            }
        }
        arrFinalImportantLink = arrImportantLink;
    }

    backClick = () => {
        Navigation.dismissModal(this.props.componentId);
    }

    truncateNumber = (doubleNumber) => {
        if (doubleNumber !== undefined && doubleNumber !== null) {
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
    }

    checkLimitedFloatPoint(number) {
        var newNum = 0.0;
        if (number !== undefined && number !== null) {
            if (number < 1.0) {
                newNum = number.toFixed(6);
            } else {
                newNum = number.toFixed(2);
            }
        }
        return newNum
    }

    checkSatoshiLimitedFloatPoint(number) {
        var newNum = 0;
        if (number !== undefined && number !== null) {
            if (number < 0.1) {
                newNum = number.toFixed(8);
            } else {
                newNum = number.toFixed(8);
            }
        }
        return newNum
    }

    getPriceProper(price) {
        var newNum = 0;
        if (price !== undefined && price !== null) {
            var intPrice = parseInt(price);
            var strPrice = intPrice.toString()
            if (strPrice.length > 6) {
                newNum = this.truncateNumber(price);
            } else {
                newNum = this.checkLimitedFloatPoint(price);
            }
        }
        return newNum
    }

    getChangeData(number) {
        if (number !== undefined && number !== null) {
            var changeValue = parseFloat(number).toFixed(2).toString();
            var firstChar = changeValue.charAt(0);

            if (firstChar === "-") {
                return (
                    <React.Fragment>
                        <Image
                            style={{ width: 14, height: 14, marginRight: 4 }}
                            source={require('../Image/Double_arrow_red_down.png')} />
                        <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>{changeValue}%</Text>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <Image
                            style={{ width: 14, height: 14, marginRight: 4 }}
                            source={require('../Image/Double_arrow_green_up.png')} />
                        <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>{changeValue}%</Text>
                    </React.Fragment>
                );
            }
        }
    }

    getCoinDetailErrorLabel = () => {
        if (this.props.errorcoindetail != '') {
            return (
                <React.Fragment>
                    <Text style={styles.errorTextStyle}>{this.props.errorcoindetail}</Text>
                </React.Fragment>
            )
        }
    }

    getCoinDetailLoader = () => {
        if (this.props.loadingcoindetail) {
            return <Spinner size="large" />;
        }
    }

    onImportantLinkItemPress = (item) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'WebBrowserCustom',
                        passProps: {
                            coinImportantLinkName: item.name,
                            coinImportantLinkURL: item.link
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
                                    android: {},
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

    renderImportantLinkListContent = () => {
        let columns = 4;
        let viewWidth = width - 28
        return (
            <React.Fragment>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        numColumns={columns}
                        data={arrFinalImportantLink}
                        renderItem={({ item }) => {
                            return <CoinImportantLinkCell itemWidth={(viewWidth - (10 * columns)) / columns}
                                coinImportantLinkDetail={item}
                                onRowPress={() => this.onImportantLinkItemPress(item)} />
                        }}
                        keyExtractor={(item, index) => index} />
                </View>
            </React.Fragment>
        );
    }

    onShouldStartLoadWithRequest = navigator => {
        if (navigator.url.includes('facebook') || navigator.url.includes('twitter') || navigator.url.includes('share') || navigator.url.includes('signin')) {
            return false;
        }
        return true;
    }

    renderDetailContent = () => {
        return (
            <React.Fragment>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    height: 204,
                    backgroundColor: 'white',
                    marginTop: 12,
                    borderRadius: 10,
                    marginLeft: 14,
                    marginRight: 14
                }}>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{
                            marginLeft: 14,
                            marginRight: 14,
                            marginTop: 0,
                            height: 1,
                            backgroundColor: 'rgba(0, 59, 178, 0.0500000007450581)'
                        }}>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, color: 'black', marginLeft: 14, fontWeight: '700', fontSize: 16 }}>24
                                Hr Volume</Text>
                            <Text style={{
                                flex: 1,
                                textAlign: 'right',
                                color: '#4eadfe',
                                marginRight: 14,
                                fontWeight: '700',
                                fontSize: 16
                            }}>{`${global.globCurrencyFormate} ` + this.truncateNumber(this.props.coinDetailFromList.quote.USD.volume_24h)}</Text>
                        </View>
                        <View style={{
                            marginLeft: 14,
                            marginRight: 14,
                            marginBottom: 0,
                            height: 1,
                            backgroundColor: 'rgba(0, 59, 178, 0.0500000007450581)'
                        }}>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, color: 'black', marginLeft: 14, fontWeight: '700', fontSize: 16 }}>Total
                                Coins</Text>
                            <Text style={{
                                flex: 1,
                                textAlign: 'right',
                                color: '#4eadfe',
                                marginRight: 14,
                                fontWeight: '700',
                                fontSize: 16
                            }}>{`${global.globCurrencyFormate} ` + this.truncateNumber(this.props.coinDetailFromList.max_supply)}</Text>
                        </View>
                        <View style={{
                            marginLeft: 14,
                            marginRight: 14,
                            marginBottom: 0,
                            height: 1,
                            backgroundColor: 'rgba(0, 59, 178, 0.0500000007450581)'
                        }}>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, color: 'black', marginLeft: 14, fontWeight: '700', fontSize: 16 }}>Market
                                Cap</Text>
                            <Text style={{
                                flex: 1,
                                textAlign: 'right',
                                color: '#4eadfe',
                                marginRight: 14,
                                fontWeight: '700',
                                fontSize: 16
                            }}>{`${global.globCurrencyFormate} ` + this.truncateNumber(this.props.coinDetailFromList.quote.USD.market_cap)}</Text>
                        </View>
                        <View style={{
                            marginLeft: 14,
                            marginRight: 14,
                            marginBottom: 0,
                            height: 1,
                            backgroundColor: 'rgba(0, 59, 178, 0.0500000007450581)'
                        }}>
                        </View>
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    marginTop: 12,
                    marginBottom: 12,
                    borderRadius: 10,
                    marginLeft: 14,
                    marginRight: 14
                }}>
                    <View style={{ height: 44 }}>
                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 14, marginBottom: 8, height: 21 }}>
                            <Text>Important links</Text>
                        </View>
                        <View style={{
                            marginLeft: 8,
                            marginRight: 8,
                            marginBottom: 0,
                            height: 1,
                            backgroundColor: 'rgba(0, 59, 178, 0.0500000007450581)'
                        }}>
                        </View>
                    </View>
                    {this.renderImportantLinkListContent()}
                </View>

            </React.Fragment>
        );

    }


    render() {

        const {
            logo,
            symbol,
            name
        } = this.props.coinDetailData

        return (
            <View style={{ flex: 1 }}>
                {this.state.coinDetailData !== undefined ?
                    (<View style={{ flex: 1 }}>
                        <Text>Loading data...</Text>
                    </View>)
                    :
                    (<View style={{ flex: 1 }}>
                        <View style={styles.mainContainer}>
                            <View style={styles.toolbar}>
                                <LinearGradient
                                    colors={['#4eadfe', '#0fe5fe']}
                                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                                    style={{ flex: 1, flexDirection: 'row' }}>
                                    {this.getCoinDetailErrorLabel()}
                                    {this.getCoinDetailLoader()}

                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        paddingTop: 30,
                                        paddingBottom: 8,
                                        paddingLeft: 14,
                                        paddingRight: 14
                                    }}>
                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <View style={{ flex: 1 }}>
                                                <View
                                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                        <Image
                                                            style={{
                                                                width: 20,
                                                                height: 20,
                                                                borderRadius: 20 / 2,
                                                                borderWidth: 1,
                                                                borderColor: 'white',
                                                                marginRight: 8
                                                            }}
                                                            source={{
                                                                uri: (logo != "") ? logo : "",
                                                            }} />
                                                        <Text style={{
                                                            color: 'white',
                                                            fontSize: 17
                                                        }}>{name + " / " + symbol}</Text>
                                                    </View>

                                                    <TouchableOpacity onPress={this.backClick}>
                                                        <View style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            width: 35,
                                                            height: 35,
                                                            borderRadius: 35 / 2,
                                                            backgroundColor: 'rgba(255, 255, 255, 0.200000002980232)'
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Text style={{
                                                                    color: 'white',
                                                                    fontWeight: '900',
                                                                    fontSize: 12
                                                                }}>X</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>

                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View>
                                                        <Text style={{
                                                            color: 'white',
                                                            fontWeight: '900',
                                                            fontSize: 34
                                                        }}>{`${global.globCurrencyFormate} ` + this.getPriceProper(this.props.coinDetailFromList.quote.USD.price)}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 14 }}>
                                                        {this.getChangeData(this.props.coinDetailFromList.quote.USD.percent_change_24h)}
                                                    </View>
                                                </View>

                                                <View style={{}}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontWeight: '700',
                                                        fontSize: 11
                                                    }}>{`${global.globCurrencyFormate} ${this.getPriceProper(this.props.coinDetailFromList.circulating_supply)} Circulating Supply`}</Text>
                                                </View>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                            <View>
                                                                <Text style={{
                                                                    color: 'white',
                                                                    fontWeight: '900',
                                                                    fontSize: 18
                                                                }}>{`${global.globCurrencyFormate} ` + this.getPriceProper(this.props.coinDetailFromList.total_supply)}</Text>
                                                            </View>
                                                            <View style={{ paddingLeft: 5 }}>
                                                                <Text style={{ color: 'white', fontWeight: '700', fontSize: 11 }}>Total Supply</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            flex: 1,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            paddingTop: 4
                                                        }}>
                                                            <View>
                                                                <Text style={{
                                                                    color: 'white',
                                                                    fontWeight: '900',
                                                                    fontSize: 18
                                                                }}>{`${global.globCurrencyFormate} ` + this.getPriceProper(this.props.coinDetailFromList.max_supply)}</Text>
                                                            </View>
                                                            <View style={{ paddingLeft: 5 }}>
                                                                <Text style={{ color: 'white', fontWeight: '700', fontSize: 11 }}>Max Supply</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>

                            <View style={styles.content}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {this.renderDetailContent()}
                                </ScrollView>
                            </View>
                        </View>
                    </View>)
                }
            </View>
        );
    }
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
    content: {
        backgroundColor: '#ebeef0',
        flex: 1
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
    const { resultcoindetail, errorcoindetail, loadingcoindetail } = state.coinDetail;
    const coinDetailData = resultcoindetail;

    return { coinDetailData, errorcoindetail, loadingcoindetail };
};

export default connect(mapStateToProps, {
    coinDetailFetch,
})(CoinDetail);

