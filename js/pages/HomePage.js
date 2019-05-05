

import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, View, Text } from 'react-native';

import PopularPage from './PopularPage';
import MinePage from './MinePage';
import FavoritePage from './FavoritePage';
import TrendingPage from './TrendingPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather'
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
export default class HomePage extends Component {
  state = {}
  // _tabNavigator() {
  //   const TabNavigator = createBottomTabNavigator({
  //     PopularPage: {
  //       screen: PopularPage,
  //       navigationOptions: {
  //         tabBarLabel: "最热",
  //         tabBarIcon: ({tintColor,focused}) => (
  //             <MaterialIcons
  //               name={'whatshot'}
  //               size={26}
  //               style={{ color: tintColor }}
  //             />
  //           )
  //       }
  //     }, TrendingPage: {
  //       screen: TrendingPage,
  //       navigationOptions: {
  //         tabBarLabel: "趋势",
  //         tabBarIcon:({tintColor,focused})=>(
  //           <MaterialIcons
  //             name={"trending-up"}
  //             size={26}
  //             style={{color:tintColor}}
  //           />
  //         )
  //       }
  //     }, FavoritePage: {
  //       screen: FavoritePage,
  //       navigationOptions: {
  //         tabBarLabel: "收藏",
  //         tabBarIcon:({tintColor,focused})=>(
  //           <MaterialIcons
  //             name={"favorite"}
  //             size={26}
  //             style={{color:tintColor}}
  //           />
  //         )
  //       }
  //     }, MinePage: {
  //       screen: MinePage,
  //       navigationOptions: {
  //         tabBarLabel: "我的",
  //         tabBarIcon:({tintColor,focused})=>(
  //           <Feather
  //             name={"user"}
  //             size={26}
  //             style={{color:tintColor}}
  //           />
  //         )
  //       }
  //     },
  //   });
  //   return createAppContainer(TabNavigator);
  // }
  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }, welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});