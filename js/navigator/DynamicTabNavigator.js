

import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, View, Text } from 'react-native';

import PopularPage from '../pages/PopularPage';
import MinePage from '../pages/MinePage';
import FavoritePage from '../pages/FavoritePage';
import TrendingPage from '../pages/TrendingPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather'
import NavigationUtil from '../navigator/NavigationUtil';

import {BottomTabBar} from 'react-navigation-tabs'
import {connect} from 'react-redux'

const TABS = {// 配置底部动态路由的页面。
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: "最热",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  }, TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: "趋势",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={"trending-up"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  }, FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: "收藏",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={"favorite"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  }, MinePage: {
    screen: MinePage,
    navigationOptions: {
      tabBarLabel: "我的",
      tabBarIcon: ({ tintColor, focused }) => (
        <Feather
          name={"user"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
}
// import {BottomTabBar} from 'react-navigation-tabs' react-navigation引用自它。
// 相当于TabBar中的每一个Bar
class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    }
  }

  render(){
    // // 获取到router的数组，以及下标
    // const {routes,index} = this.props.navigation.state;
    // if(routes[index].params){
    //   const {theme} = routes[index].params;
    //   // 以最新的更新时间为主，防止被其它tab之前修改的覆盖掉。
    //   if(theme && theme.updateTime > this.theme.updateTime){
    //     this.theme = theme;
    //   }
    // }

    return <BottomTabBar
      {...this.props}
      activeTintColor={this.props.theme}
    />
  }
}

class DynamicTabNavigator extends Component {
  state = {}
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavigator() {
    if(this.Tabs){
      return this.Tabs;
    }
    const { PopularPage, TrendingPage, FavoritePage, MinePage } = TABS;
    // 根据需要定制显示的Tab
    const tabs = { PopularPage, TrendingPage, FavoritePage,MinePage};
    // 动态配置Tab底部标签文字
    PopularPage.navigationOptions.tabBarLabel = '最热';
    // 创建容器将Tab包裹并返回。
    return this.Tabs = createAppContainer(createBottomTabNavigator(tabs,
      {
        tabBarComponent:props=>{
          return <TabBarComponent theme={this.props.theme}{...props}/>
        }
      }));
  }

  render() {
    NavigationUtil.navigation = this.props.navigation;
    const Tab = this._tabNavigator();
    return <Tab />
  }
}

const mapStateToProps = state=>({
  theme:state.theme.theme,
})

export default connect(mapStateToProps)(DynamicTabNavigator);