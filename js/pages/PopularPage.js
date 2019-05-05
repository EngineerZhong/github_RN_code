

import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import { StyleSheet, View, Text,FlatList,RefreshControl} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux';
import actions from '../action/index';

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'

export default class PopularPage extends Component {


  constructor(props) {
    super(props);
    this.tabNames = ['Java', 'Android', 'ios', 'ReactNative', 'Kotlin'];
  }

  // 根据title来生成TopTab
  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props =>{return <PopularTabPage {...props} tabLabel={item}/>},
        navigationOptions: {
          title: item
        }
      }
    });
    return tabs;
  }

  _createTopTab() {
    const TabNavigator = createMaterialTopTabNavigator(
      this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,// 是否使用标签大写
          scrollEnabled: true,// 不占满一屏，可进行滚动
          style: {
            backgroundColor: '#999'
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle:styles.labelStyle,
        }
      }
    )

    return createAppContainer(TabNavigator);
  }
  render() {
    const TopTab = this._createTopTab();
    return <TopTab />;
  }
}

class PopularTab extends Component {
  
  constructor(props){
    super(props);
    const{tabLabel} = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const {onLoadPopularData} = this.props;
    const url = this.genFetchUrl(this.storeName);
    onLoadPopularData(this.storeName,url);
  }

  genFetchUrl(key){
    return URL + key + QUERY_STR;
  }

  renderItem(data){
    const item = data.item;
    return <View style={{marginBottom:10}}>
      <Text style={{backgroundColor:'#faa'}}>
        {JSON.stringify(item)}
      </Text>
    </View>
  }

  render() {
    const {popular} = this.props;
    let store = popular[this.storeName];
    if(!store){
      store={
        items:[],
        isLoading:false,
      }
    }
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>hello   {tabLabel}</Text>
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "DetailPage")
        }}>跳转到详情页</Text> */}
        <FlatList
          data ={store.items}
          renderItem={data=>this.renderItem(data)}
          keyExtractor = {item=>'' + item.id}
          refreshControl={
            <RefreshControl
              title={'loading'}
              titleColor={'red'}
              colors={['red']}
              refreshing={store.isLoading}
              onRefresh={()=>this.loadData()}
              tintColor={'#000'}
            />
          }

        />
      </View>
    );
  }
  
}


const mapStateToProps = state => ({
  popular:state.popular
})

const mapDispatchToProps = dispatch => ({
  onLoadPopularData:(storeName,url) => dispatch(actions.onLoadPopularData(storeName,url))
})

const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab)


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
  }, tabStyle: {
    width: 200,
    height:40,
  }, indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },labelStyle:{
    fontSize:16
  }
});