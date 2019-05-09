import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
const THEME_COLOR = '#678'
export default class MinePage extends Component {

    getRightButton() {
        return <View style={{
            flexDirection: 'row'
        }}>
            <TouchableOpacity onPress={() => {}}>
                <View
                    style={{
                    padding: 5,
                    marginRight: 8
                }}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{
                        color: 'white'
                    }}/>
                </View>
            </TouchableOpacity>
        </View>
    }

    getLeftButton(callback) {
        return <View style={{flexDirection:'row'}}>
            <TouchableOpacity
                onPress={callback}>
                <View
                    style={{
                    padding: 5,
                    paddingLeft: 18
                }}>
                    <Ionicons
                        name={'ios-arrow-back'}
                        size={24}
                        style={{
                        color: 'white'
                    }}/>
                </View>
            </TouchableOpacity>
        </View>
    }

    state = {}
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar = <NavigationBar
            title={'我的'}
            statusBar={statusBar}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}/>
        return (
            <View style={styles.container}>
                {navigationBar}
                <Text style={styles.welcome}>MinePage!!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});