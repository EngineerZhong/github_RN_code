





import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
import {rootCom,RootNavigator} from '../navigator/AppNavigator';
// 指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom))

/**
 * 创建自己的navigation reducer,
 */

const navReducer = (state = navState,action)=>{
  const nextState = RootNavigator.router.getStateForAction(action,state);
  return nextState || state;
}

/**
 * 合并reducer
 */

 const index = combineReducers({
   nav:navReducer,
   theme:theme,
   popular:popular,
 })

 export default index;