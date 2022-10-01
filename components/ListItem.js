import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


export default function ListItem({ name, symbol, currentPrice, priceChange, logoUri, codein, navigation }) {
    const priceChangeColor = priceChange > 0 ? '#03DAC5' : '#B00020';
    const arrowChange = priceChange > 0 ? { color: '#03DAC5' } : { color: '#B00020', transform: [{ rotateX: '180deg' }], position: 'absolute', left: -6 };

    const [data, setData] = useState([]);

    useEffect(function () {
        async function getData() {
            const url = 'https://economia.awesomeapi.com.br/json/daily/' + symbol + '-' + codein + '/7';
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        }
        getData();
    }, []);
    
    return (
        <TouchableOpacity style={styles.buttom}
            onPress={() => navigation.navigate('Historic', {
                name: name,
                symbol: symbol,
                currentPrice: currentPrice,
                priceChange: priceChange,
                logoUri: logoUri,
                data: { data }

            })}>
            <View style={styles.itemWrapper}>
                <View style={styles.leftWrapper}>
                    <Image style={styles.image} source={{ uri: logoUri }} />
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}> {name.split('/')[0]}</Text>
                        <Text style={styles.subtitle}> {symbol}</Text>
                    </View>
                </View>

                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>R$ {currentPrice}</Text>
                    <View style={styles.priceChange}>
                        <FontAwesome5 name='arrow-up' size={10} color='white' style={arrowChange} />
                        <Text style={[styles.subtitle, { color: priceChangeColor }]}>{String(priceChange).replace('-', '')}%</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttom: {
        justifyContent: "center",
        marginBottom: 10,
        paddingHorizontal: 16
    },
    itemWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#A9ABB1',
        borderWidth: 1,
        borderRadius: 10,

    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 48,
        width: 48,
        resizeMode: 'stretch'
    },
    titleWrapper: {
        marginLeft: 8,
    },
    title: {
        fontSize: 18,
        color: '#fff'
    },
    subtitle: {
        marginLeft: 5,
        fontSize: 14,
        color: '#A9ABB1'
    },
    rightWrapper: {
        alignItems: 'flex-end'
    },
    priceChange: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    }
});