import react from "react";
import { View, Text, StyleSheet, Image, Dimensions, ViewComponent } from "react-native";
import { LineChart, } from "react-native-chart-kit";

export default function Historic({ navigation, route }) {
    const { name, symbol, priceChange, logoUri, data } = route.params;
    const priceChangeColor = priceChange > 0 ? '#03DAC5' : '#B00020';

    function currentPriceBug(symbol) {
        if (symbol === 'BTC' || symbol === 'ETH') {
            return ' k';
        }
        return '';
    }

    const getDay = (date) => {
        var timestamp = date * 1000
        var date = new Date(timestamp);

        return String(date).substr(8, 2)
    };

    const data1 = {
        labels: data.data.map(function(key) {
            return getDay(key.timestamp);
          }).reverse(),
        datasets: [
            {
                data: data.data.map(function(key) {
                    return key.bid;
                  }).reverse(),
                strokeWidth: 5
            }
        ],
    };

    const variationPrice = data.data[0].bid - data.data[6].bid;

    const conservativeProfile = () => {
        if (variationPrice > 0 && variationPrice < 0.3) {
            return (
                <View style={styles.conservativeProfile}>
                    <Text style={styles.textProfile}>Esse é o melhor momento para investir nessa moeda se você é:</Text>
                    <Text style={styles.conservativeProfileText}>Perfil Conservador</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.conservativeProfile}>
                    <Text style={styles.textProfile}>Esse é o melhor momento para investir nessa moeda se você é:</Text>
                    <Text style={styles.conservativeProfileText}>Perfil Arrojado</Text>
                </View>
            )
        }
    }

    const screenWidth = Dimensions.get("window").width - 40;

    const chartConfig = {
        backgroundColor: "#091018",
        backgroundGradientFrom: "#091018",
        backgroundGradientTo: "#091018",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
        decimalPlaces: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleHeader}>
                <View>
                    <Text style={styles.title}>{name.split('/')[0]} ({symbol})</Text>
                </View>
            </View>
            <View style={styles.chartWrapper}>
                <View style={styles.shadow}>
                    <LineChart
                        data={data1}
                        width={screenWidth}
                        height={220}
                        yAxisLabel="R$"
                        yAxisSuffix={currentPriceBug(symbol)}
                        yAxisInterval={1}
                        chartConfig={chartConfig}
                        bezier
                        withVerticalLines={true}
                        style={{
                            marginVertical: 16,
                            borderRadius: 16,
                            alignItems: 'center',
                            borderRadius: 10,
                            margin: 10,
                        }}
                    />
                </View>
                <Text style={[styles.chartSubtitle, { color: 'white' }]}>7 D</Text>
                {conservativeProfile()}
            </View>
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
        justifyContent: 'center',
        paddingHorizontal: 5,
        marginVertical: 16
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: "bold"
    },
    chartWrapper: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chartSubtitle: {
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 10,
    },
    conservativeProfile: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        marginTop: 10
    },
    textProfile: {
        color: '#000',
        fontSize: 16,
    },
    conservativeProfileText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    shadow: {
        shadowColor: 'black',
        borderColor: 'black',
        elevation: 2,
        borderRadius: 2,
        shadowRadius: 2,
        border:2
    }
});