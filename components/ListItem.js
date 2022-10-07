import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


export default function ListItem({ name, symbol, currentPrice, priceChange, logoUri, codein, navigation }) {
    const priceChangeColor = priceChange > 0 ? '#03DAC5' : '#B00020';
    const arrowChange = priceChange > 0 ? { color: '#03DAC5' } : { color: '#B00020', transform: [{ rotateX: '180deg' }] };

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

    function currentPriceBug (currentPrice,symbol){
        if(symbol === 'BTC' || symbol === 'ETH'){
            return parseFloat(currentPrice).toFixed(2) + ' k';
        }
        return parseFloat(currentPrice).toFixed(2);
        
    }
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
            <View style={[styles.itemWrapper, { borderColor: priceChangeColor }]}>
                <View style={styles.leftWrapper}>
                    <Image style={styles.image} source={{ uri: logoUri }} />
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{name.split('/')[0]}</Text>
                        <View style={styles.priceChange}>
                            <FontAwesome5 name='arrow-up' size={10} color='white' style={arrowChange} />
                            <Text style={[styles.subtitle, { color: priceChangeColor }]}>{String(priceChange).replace('-', '')}%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>R$ {currentPriceBug(currentPrice,symbol)}</Text>
                    <Text style={styles.subtitleMore}>Saber mais</Text>
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
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    subtitleMore: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
        opacity: 0.5,
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