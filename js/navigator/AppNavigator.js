import {createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
SwitchNavigator,
createSwitchNavigator} from 'react-navigation';

import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware,createReduxContainer} from 'react-navigation-redux-helpers';


export const rootCom = 'Init';// 设置根路由

const InitNavigator = createStackNavigator({
  WelcomePage:{ 
    screen:WelcomePage,
    navigationOptions:{
      header:null,//header 设为null，禁用StackNavigator的Title
    }
  }
});

const MainNavigator = createStackNavigator({
  HomePage:{
    screen:HomePage,
    navigationOptions:{
      header:null,//header 设为null，禁用StackNavigator的Title
    }
  },
  // 当前解决一个问题：里面的导航器无法跳转到外层导航器定义的页面。
  // 解决方案：通过定义常量来保存外层的navigation
  DetailPage:{
    screen:DetailPage,
    navigationOptions:{
      // header:null,
    }
  }
})


export const RootNavigator = createSwitchNavigator({
  Init:InitNavigator,
  Main:MainNavigator,
},{
  navigationOptions:{
    header:null,
  }
});
/**
 * 初始化react-navigation 与 redux的中间件
 * 该方法的一个很大的作用就是为reduxifyNavigator(createReduxContainer替换)的key设置actionSubscribers（行为订阅者）
 */
// 3.0 顺序与教程中有出入，高能注意。
export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root',
);

const AppwithNavigationState = createReduxContainer(RootNavigator,'root');

const mapStateToProps = state=>({
  state:state.nav,
})

export default connect(mapStateToProps)(AppwithNavigationState);