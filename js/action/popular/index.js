
import Types from '../types';

import DataStore from '../../utils/dao/DataStore';

/**
 * 获取最热的数据的异步action
 */

export function onLoadPopularData(storeName, url) {
  // 异步
  return dispatch => {
    dispatch({ type: Types.POPULAR_REFRESH, storeName: storeName })
    let dataStore = new DataStore();
    dataStore.fetchData(url) // 异步Action与数据流
      .then(data => {
        handleData(dispatch, storeName, data);
      }).catch(error => {
        console.log(error);
        dispatch({
          type: Types.LOAD_POPULAR_FAIL,
          storeName,
          error
        })
      })
  }
}

/**
 * 处理数据。
 * @param {*} dispatch 
 * @param {*} storeName 
 * @param {*} data 
 */
function handleData(dispatch, storeName, data) {
  dispatch({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName
  })
}