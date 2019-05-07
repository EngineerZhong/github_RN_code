import Types from '../../action/types'

// 默认数据
const defaultState = {}
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
        case Types.POPULAR_LOAD_SUCCESS: // 加载成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName], // 列表代表的state
                    items: action.items,
                    projectModes: action.projectModes, // 此次展示的数据内容
                    hideLoadingMore: false,
                    isLoading: false,
                    pageIndex: action.pageIndex
                }
            };
        case Types.POPULAR_REFRESH: // 正在刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true
                }
            }
        case Types.POPULAR_LOAD_FAIL: // 加载失败。
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
        case Types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.POPULAR_LOAD_MORE_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            }
        default:
            return state;
    }
}