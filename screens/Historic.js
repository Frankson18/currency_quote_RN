import react from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { LineChart, } from "react-native-chart-kit";

export default function Historic({ navigation, route }) {
    const { name, symbol, currentPrice, priceChange, logoUri, data } = route.params;
    const priceChangeColor = priceChange > 0 ? '#03DAC5' : '#B00020';
    const data1 = {
        datasets: [
            {
                data: [data.data[6].bid,
                data.data[5].bid,
                data.data[4].bid,
                data.data[3].bid,
                data.data[2].bid,
                data.data[1].bid,
                data.data[0].bid
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
        decimalPlaces: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleHeader}>
                <Image style={styles.image} source={{ uri: logoUri }} />
                <View>
                    <Text style={styles.title}> {name.split('/')[0]} ({symbol})</Text>
                    <Text style={{ color: '#A9ABB1', paddingLeft: 8, }}>7 d</Text>
                </View>
            </View>
            <LineChart
                data={data1}
                width={375}
                height={220}
                yAxisLabel="R$"
                yAxisInterval={1}
                chartConfig={chartConfig}
                bezier
                withVerticalLines={false}
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
    titleHeader: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        marginTop: 10
    },
    image: {
        height: 48,
        width: 48,
        resizeMode: 'stretch'
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: "bold"
    },
});