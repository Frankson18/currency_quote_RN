import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';

export default function ListItem({name, symbol, currentPrice, priceChange, logoUri}) {
    const priceChangeColor = priceChange > 0 ? '#34C759' : '#FF3B30';
    return(
        <TouchableOpacity>
            <View style={styles.itemWrapper}>
                <View style={styles.leftWrapper}>
                    <Image style={ styles.image} source={{uri: logoUri }}/>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}> {name}</Text>
                        <Text style={styles.subtitle}> {symbol}</Text>
                    </View>
                </View>

                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>R$ {currentPrice}</Text>
                    <Text style={[styles.subtitle, {color: priceChangeColor}]}>{priceChange}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemWrapper:{
        paddingHorizontal:16,
        marginTop:24,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    image:{
        height:48,
        width: 48,
    },
    titleWrapper:{
        marginLeft: 8,
    },
    title:{
        fontSize: 18,
    },
    subtitle:{
        marginTop:4,
        fontSize: 14,
        color: '#A9ABB1'
    },
    rightWrapper:{
        alignItems: 'flex-end'
    },
});