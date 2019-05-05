
import NavigationUtil from '../navigator/NavigationUtil'
import React, { Component } from 'react';
import { StyleSheet,View,Text } from 'react-native';
type Props = {};
export default class WelcomePage extends Component<Props> {
  state = {  }
  componentDidMount(){
    this.timer = setTimeout(()=>{
      NavigationUtil.resetToHomePage({
        navigation:this.props.navigation
      })
    },20)
  }

  // 卸载Timer，防止泄露
  componentWillMount(){
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WelcomePage!!</Text>
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