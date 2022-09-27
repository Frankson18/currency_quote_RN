import react from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export default function Historic({ navigation, route }) {
    const { name, symbol, currentPrice, priceChange, logoUri, data } = route.params;
    const priceChangeColor = priceChange > 0 ? '#03DAC5' : '#B00020';
    const data1 = {
        datasets: [
            {
                data: [data.data[0].bid,
                data.data[1].bid,
                data.data[2].bid,
                data.data[3].bid,
                data.data[4].bid,
                data.data[5].bid,
                data.data[6].bid
                ]
            }
        ],
    };

    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
        backgroundColor: "#000",
        backgroundGradientFrom: "#091018",
        backgroundGradientTo: "#0061FF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
        decimalPlaces: 0,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

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
            <LineChart
                data={data1}
                width={375}
                height={220}
                yAxisLabel="R$"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                withVerticalLines={false}
                withHorizontalLines={false}
                style={{
                    marginVertical: 10,
                    borderRadius: 16,
                    alignItems: 'center'
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#091018',
        paddingHorizontal: 10
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