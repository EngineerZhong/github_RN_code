import React, {Component} from 'react';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import {StyleSheet, View, Text, FlatList, RefreshControl,ActivityIndicator} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux';
import actions from '../action/index';
import PopularItem from '../common/PopularItem';
import {onLoadPopularData,onLoadMorePopular} from '../action/popular/index';
import NavigationBar from '../common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = '#678'
export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'ios', 'ReactNative', 'Kotlin'];
    }

    // 根据title来生成TopTab
    _genTabs() {
        const tabs = {};
        this
            .tabNames
            .forEach((item, index) => {
                tabs[`tab${index}`] = {
                    screen: props => {
                        return <PopularTabPage {...props} tabLabel={item}/>
                    },
                    navigationOptions: {
                        title: item
                    }
                }
            });
        return tabs;
    }

    _createTopTab() {
        const TabNavigator = createMaterialTopTabNavigator(this._genTabs(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false, // 是否使用标签大写
                scrollEnabled: true, // 不占满一屏，可进行滚动
                style: {
                    backgroundColor: '#678'
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle
            }
        })

        return createAppContainer(TabNavigator);
    }
    render() {
        let statusBar = {
          backgroundColor:THEME_COLOR,
          barStyle:'light-content'
        };
        let navigationBar = <NavigationBar 
          title={"最热"}
          statusBar = {statusBar}
          />
        const TopTab = this._createTopTab();
        return <View style={{flex:1}}>
            {navigationBar}
            <TopTab/>
        </View>
    }
}
const pageSize = 10;//设为常量，防止修改
class PopularTab extends Component {

    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData(false);
    }


    loadData(loadMore) {
        const {onLoadPopularData,onLoadMorePopular} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if(loadMore){
            onLoadMorePopular(this.storeName,++store.pageIndex,pageSize,store.items,callback=>{
              this.refs.toast.show('没有更多了。');
            })
        }else{
          onLoadPopularData(this.storeName, url,pageSize);
        }
        
    }

        /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
      const {popular} = this.props;
      let store = popular[this.storeName];
      if (!store) {
          store = {
              items: [],
              isLoading: false,
              projectModels: [],//要显示的数据
              hideLoadingMore: true,//默认隐藏加载更多
          }
      }
      return store;
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem item={item} onSelect={() => {}}/>
    }

    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                {/* <Text style={styles.welcome}>hello   {tabLabel}</Text>
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "DetailPage")
        }}>跳转到详情页</Text> */}
                <FlatList
                    data
                    ={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    // keyExtractor=
                    // {item => '' + item.id}
                    refreshControl={< RefreshControl title = {
                    'loading'
                }
                titleColor = {
                    'red'
                }
                colors = {
                    ['red']
                }
                refreshing = {
                    store.isLoading
                }
                onRefresh = {
                    () => this.loadData(false)
                }
                tintColor = {
                    '#000'
                } />}
                ListFooterComponent={()=>this._genIndicator()}
                onEndReachedThreshold={0.5}
                onEndReached={()=>{
                  console.log("onEndReached");
                  setTimeout(() => { // 保证onEndReached执行之前，onMomentumScrollBegin已经执行了。
                    if(this.canLoadMore){
                      this.loadData(true);
                      this.canLoadMore = false;
                    }
                  }, 100);
                }}
                // 优化onEndReached()执行多次。
                onMomentumScrollBegin={()=>{
                  this.canLoadMore = true;
                  console.log('onMomentumScrollBegin');
                }}
                />
            <Toast ref="toast" position='center'/>
            </View>
            
        );
    }
    _genIndicator() {
      return this._store().hideLoadingMore ? null :
          <View style={styles.indicatorContainer}>
              <ActivityIndicator
                  style={styles.indicator}
              />
              <Text>正在加载更多</Text>
          </View>
   }
}


// action、reducer、store树 先行 将state里的相关数据订阅props里面， dispatch创建函数的订阅
const mapStateToProps = state => ({popular: state.popular})

const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url,pageSize)),
    onLoadMorePopular:(storeName,pageIndex,pageSize,items,callBack) => dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,callBack))
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

const styles = StyleSheet.create({
  indicatorContainer:{
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    tabStyle: {
        width: 200,
        height: 40,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 16,
    }
});