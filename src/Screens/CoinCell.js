import React, { PureComponent } from 'react';
import { Text, TouchableHighlight, View, Image } from 'react-native';
import { CardSection } from '../components/common';
import FastImage from 'react-native-fast-image';

class coinCell extends PureComponent {
    constructor(props) {
        super(props);
        this.truncateNumber = this.truncateNumber.bind(this);
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

    checkLimitedFloatPoint(number) {
        var newNum;
        if (number < 1.0) {
            newNum = number.toFixed(6);
        } else {
            newNum = number.toFixed(2);
        }
        return newNum
    }

    checkSatoshiLimitedFloatPoint(number) {
        var newNum;
        if (number < 0.1) {
            newNum = number.toFixed(8);
        } else {
            newNum = number.toFixed(8);
        }
        return newNum
    }

    getPriceProper(price) {
        var newNum;
        var intPrice = parseInt(price);
        var strPrice = intPrice.toString()
        if (strPrice.length > 6) {//BMT
            newNum = this.truncateNumber(price);
        } else {
            newNum = this.checkLimitedFloatPoint(price);
        }
        return newNum
    }

    getChangeData(number) {
        var changeValue = parseFloat(number).toFixed(2).toString();
        var firstChar = changeValue.charAt(0);

        if (firstChar === "-") {
            return (
                <React.Fragment>
                    <Image
                        style={{width: 14, height: 14, marginRight: 3}}
                        source={require('../Image/Double_arrow_red_down.png')}/>
                    <Text style={{color: '#C7410E', fontWeight: '700', fontSize: 14}}>{changeValue}%</Text>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Image
                        style={{width: 14, height: 14, marginRight: 3}}
                        source={require('../Image/Double_arrow_green_up.png')}/>
                    <Text style={{color: '#56BE19', fontWeight: '700', fontSize: 14}}>{changeValue}%</Text>
                </React.Fragment>
            );
        }
    }

    render() {
        const {
            id,
            name,
            symbol,
            slug,
            circulating_supply,
            total_supply,
            max_supply,
            date_added,
            num_market_pairs
        } = this.props.coin;

        return (
            <TouchableHighlight onPress={() => this.props.onRowPress()} underlayColor='rgba(255, 255, 255, 0.0)'>
                <View>
                    <CardSection>
                        <View style={{flex: 1, flexDirection: 'row', paddingEnd: 9}}>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginLeft: 10,
                                }}>
                                    <View style={{flex: 1}}>
                                        <Text style={{color: '#3D3D3D', fontWeight: '700', fontSize: 16}}>{name}</Text>
                                    </View>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        {this.getChangeData(this.props.coin.quote.USD.percent_change_24h)}
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                        <Text style={{
                                            color: '#245DA6',
                                            fontWeight: '700',
                                            fontSize: 16
                                        }}>{`${global.globCurrencyFormate} ` + this.getPriceProper(this.props.coin.quote.USD.price)}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginLeft: 10,
                                }}>
                                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                                        <Text style={{
                                            color: '#9B9EAD',
                                            fontWeight: '700',
                                            fontSize: 14
                                        }}>{symbol + " / "}{this.truncateNumber(this.props.coin.quote.USD.market_cap)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </CardSection>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default coinCell;
