

import React, { Component } from 'react';
import{ViewPropTypes,Text,View,StatusBar,StyleSheet,Platform} from 'react-native'
import{PropTypes} from 'prop-types'
import { platform } from 'os';
const StatusBarShape ={
  // 设置状态栏所接受的属性
  barStyle:PropTypes.oneOf(['light-content','default']),
  hidden:PropTypes.bool,
  backgroundColor:PropTypes.string,
}

const NAV_BAR_HEIGHT_IOS = 44;// IOS 导航栏高度
const NAV_BAR_HEIGHT_ANDROID = 50; // ANDROID 导航栏高度
const STATUS_BAR_HEIGHT = 20 // 状态栏高度
export default class NavigationBar extends Component{
  // 提供属性的类型检查。
  static proptypes={
    style:ViewPropTypes.style,
    title:PropTypes.string,
    titleView:PropTypes.element,
    titleLayoutStyle:ViewPropTypes.style,
    hide:PropTypes.bool,
    statusBar:PropTypes.shape(StatusBarShape),
    rightButton:PropTypes.element,
    leftButton:PropTypes.element,
  };

  // 设置默认属性
  static defaultProps ={
    statusBar:{
      barStyle:'light-content',
      hidden:false
    }
  }

  render(){
    let statusBar = !this.props.statusBar.hidden?
      <View style={StyleSheet.statusBar}>
        <StatusBar {...this.props.statusBar}/>
      </View>:null;

    let titleView = this.props.titleView ? this.props.titleView : 
      <Text ellipsizeMode="head" numberOfLines={1} style={style.title}>{title}</Text>
    
    let content = this.props.hidden ? null:
    <View style={styles.navBar}>  
        {this.getButtonElement(this.props.leftButton)}
        <View styles={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        {this.getButtonElement(this.props.rightButton)}
    </View>;

    return (
      <View style={[styles.container,this.props.style]}>
        {statusBar}
        {content}

      </View>
    )
  }

  getButtonElement(data){
    return(
      <View style={styles.navBarButton}>
          {data ? data : null}
      </View>
    )
  }
}


const styles = StyleSheet.create({
    navBarButton:{
      alignItems:'center'
    },
    navBar:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      height:Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID
    },
    navBarTitleContainer:{
      alignItems:'center',
      justifyContent:'center',
      position:'absolute',
      left:40,
      right:40,
      top:0,
      bottom:0,
    },
    container:{
      backgroundColor:'#2196f3'
    },
    title:{
      fontSize:20,
      color:'#fff'
    },
    statusBar:{
      height:Platform.OS === 'ios'?STATUS_BAR_HEIGHT:STATUS_BAR_HEIGHT
    }
});

