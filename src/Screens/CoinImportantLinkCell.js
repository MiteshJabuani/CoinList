import React, { PureComponent } from 'react';
import { Text, TouchableHighlight, View, ImageBackground, Dimensions, Image } from 'react-native';
import { CardSection } from '../components/common';

const { width, height } = Dimensions.get('window');

class CoinImportantLinkCell extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { 
        name,
        link,
        image} = this.props.coinImportantLinkDetail;

    return (
      <TouchableHighlight onPress={() => this.props.onRowPress()} underlayColor='rgba(255, 255, 255, 0.0)'>
        <View style={{width:this.props.itemWidth,height:this.props.itemWidth+21,margin:5}}>
            <View style={{margin:2,justifyContent:'center',alignItems:'center'}}>
                <Image
                    style={{width:this.props.itemWidth-10,height:this.props.itemWidth-10}}
                    source={image}/>
            </View>
            <View style={{margin:2,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize: 12}}>{name}</Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  changeImageStyle: {
    width: 14, 
    height: 14,
    marginRight:3
  }
};

export default CoinImportantLinkCell;
