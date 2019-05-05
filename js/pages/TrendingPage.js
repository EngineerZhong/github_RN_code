

import React, { Component } from 'react';
import { StyleSheet,View,Text,Button } from 'react-native';

import {connect} from 'react-redux'
import action from '../action/index'
class TrendingPage extends Component {
  state = {  }
  render() {
    const{navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TrendingPage!!</Text>
        <Button
          title={'改变主题颜色'}
          onPress={
            ()=>{
              // navigation.setParams({
              //   theme:{
              //     tintColor:'blue',
              //     updateTime:new Date().getTime(),
              //   }
              // })
              this.props.onThemeChange('#065');
            }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


const mapStateToProps = state=>({});

const mapDispatchToProps = dispatch=>({
  onThemeChange:theme=>dispatch(action.onThemeChange(theme))
})

export default connect(mapDispatchToProps,mapDispatchToProps)(TrendingPage);