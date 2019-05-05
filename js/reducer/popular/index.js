
import Types from '../../action/types'


// 默认数据
const defaultState = {

}
/**
 * State树，
 * 如何动态的设置store和动态的获取store（难点：storeKey不固定);
 * popular:{
 *    java:{
 *      items:[],
 *      isLoading:false  
 *    },
 *    ios:{
 *      items:[],
 *      isLoading:false
 *    }
 * }
 * 
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.LOAD_POPULAR_SUCCESS: // 加载成功
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName], // 列表代表的state
          items: action.items,
          isLoading: false,
        }
      };
    case Types.POPULAR_REFRESH: // 正在刷新
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName],
          isLoading: true,
        }
      }
    case Types.LOAD_POPULAR_FAIL: // 加载失败。
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName],
          isLoading: false,
        }
      }
    default:
      return state;
  }
}