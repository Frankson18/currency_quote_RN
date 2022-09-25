import react, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Historic({ navigation, route }) {
    const { name, symbol, currentPrice, priceChange, logoUri, codein } = route.params;
    const priceChangeColor = priceChange > 0 ? '#03DAC5' : '#B00020';

    const [data, setData] = useState([]);

    useEffect(function () {
        async function getData() {
            const url = 'https://economia.awesomeapi.com.br/json/daily/'+symbol+'-'+codein+'/30';
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        }
        getData();
    }, []);
    return (
        <View style={styles.container}>
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
                    <Text style={[styles.subtitle, { color: priceChangeColor }]}>{priceChange}%</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#091018',
    },
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
        marginTop: 4,
        fontSize: 14,
        color: '#A9ABB1'
    },
    rightWrapper: {
        alignItems: 'flex-end'
    },
});