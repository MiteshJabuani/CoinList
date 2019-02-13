import React, { Component } from 'react';
import { WebView, Linking,View,Text,TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class WebBrowserCustom extends Component {

    backClick = () => {
      // Navigation.pop(this.props.componentId);
      Navigation.dismissModal(this.props.componentId);
    }

  render() {
    var uri = "";
    var strName = this.props.coinImportantLinkName;
    var strURL = this.props.coinImportantLinkURL;

    if (strName == "Twitter") {

        var a ='https://twitter.com/';
        var strURL = `${a}${strURL}`;
        uri = strURL;
    } else {
        uri = strURL;
    }
    
    return (

      <View style={styles.mainContainer}>
        <View style={styles.toolbar}>
          <View style={{flex:1,flexDirection:'row',paddingTop:25,paddingBottom:15,paddingLeft:14,paddingRight:14}}>
            <View style={{flex:2,flexDirection:'column',justifyContent:'space-between'}}>
              <View style={{flex:1}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                  <View style={{flex:1,justifyContent:'center', alignItems: 'center', marginLeft: 35}}>
                      <Text style={{color:'white', fontSize: 20, fontWeight: '700'}}>{strName}</Text>
                  </View>
                  <TouchableOpacity onPress={this.backClick}>
                    <View style={{justifyContent:'center',alignItems:'center',width:35,height:35,borderRadius:35/2,backgroundColor:'rgba(255, 255, 255, 0.200000002980232)'}}>
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'900',fontSize:12}}>X</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={{flex:1}}>
            <WebView
            ref={(ref) => { this.webview = ref; }}
            source={{ uri }}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  toolbar:{
      backgroundColor:'#4eadfe',
      paddingTop:0,
      paddingBottom:0,
      flexDirection:'row',
      height:80,
      paddingLeft:0,
      paddingRight:0
  },
  mainContainer:{
      flex:1
  },
  content:{
      backgroundColor:'#ebeef0',
      flex:1
  }
};