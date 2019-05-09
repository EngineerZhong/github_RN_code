
import { AsyncStorage } from 'react-native';
import Trending from 'GitHubTrending'
export const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'}
export default class DataStore {
  // 获取数据Data的入口
  fetchData(url,flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then((wrapData) => {
        if (wrapData && this.checkTimestampValid(wrapData.timestamp)) {
          resolve(wrapData);
        } else {
          this.fetchNetData(url,flag).then((data) => {
            resolve(this._wrapData(data));
          }).catch((error) => {
            reject(error);
          })
        }
      }).catch((error) => {
        this.fetchNetData(url).then((data) => {
          resolve(this._wrapData(data));
        }).catch((error) => {
          reject(error);
        })
      })
    })
  }

  // 检查本地数据的有效期。
  checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDate() !== targetDate.getDate()) return false;
    if (currentDate.getHours() - targetDate.getHours() > 4) return false; // 有效期4个小时
    return true;
  }

  // 根据url为key保存数据。
  saveLocalData(url, data, callback) {
    if (!data || !url) return;
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data), callback));
  }

  _wrapData(data) {
    return { data: data, timestamp: new Date().getTime() };
  }

  // 根据url为key来获取本地数据
  fetchLocalData(url) {
    // Promise
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            // 解析可能会出现错误。
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          fetchNetData(url,flag);
          console.error(error);
        }
      })
    })
  }

  // 获取网络数据
  fetchNetData(url,flag) {
    return new Promise((resolve, reject) => {
      if(flag !== FLAG_STORAGE.flag_trending){
        fetch(url).then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then((responseData) => {
          this.saveLocalData(url, responseData);
          resolve(responseData);
        }).catch((error) => {
          reject(error);
          console.log(error);
        })
      }else{
        new Trending().fetchTrending(url)
        .then(items=>{
          if(!items){
            throw new Error('response is null')
          }else{
            this.saveLocalData(url,items)
            resolve(items)
          }
        }).catch(error=>{
          reject(error)
          console.log(error)
        })
      }
      
    })
  }
}