import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class TrendingItem extends Component {
    state = {}
    render() {
        const {item} = this.props;
        // if (!item || !item.owner) 
        //     return null;
        let favoriteButton = <TouchableOpacity style={{
            padding: 6
        }} onPress={() => {}} underlayColor={'transparent'} //按下去的颜色，透明
        >
            <AntDesign
                name={'staro'}
                size={26}
                style={{
                color: 'red'
            }}></AntDesign>
        </TouchableOpacity>
        return (
            <TouchableOpacity onPress={this.props.onSelect}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.fullName}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Contributors:</Text>
                            {item.contributors.map((result,i,arr)=>{
                              return <Image key={i} style={{height:22,width:22,margin:2}} source={{
                                uri: arr[i]
                            }}/>
                            })}
                        </View>
                        <View
                            style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text>forkCount:</Text>
                            <Text>{item.forkCount}</Text>
                        </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3, // 垂直Margin
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray', //阴影颜色，仅对IOS有效
        shadowOffset: {
            width: 0.5,
            height: 0.5
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2 // android设置阴影
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
})