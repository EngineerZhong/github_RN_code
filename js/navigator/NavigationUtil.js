





/**
 * 全局导航器跳转工具类
 */

export default class NavigationUtil{
  /**
   * 
   * @param {*} navigation 
   */
  static resetToHomePage(navigation){
    navigation.goBack();
  }
  /**
   * 
   * @param {*} params 
   */
  static resetToHomePage(params){
    const {navigation} = params;
    navigation.navigate('Main');
  }
  /**
   * 跳转到页面
   * @param {*} params 要传递的参数
   * @param {*} page 要跳转的页面名
   */
  static goPage(params,page){
    const navigation = NavigationUtil.navigation;
    if(!navigation){
      console.log('navigation can not be null');
      return;
    }
    navigation.navigate(page,{...params});
  }

}