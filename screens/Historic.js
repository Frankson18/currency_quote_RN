import react from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { LineChart, } from "react-native-chart-kit";

export default function Historic({ navigation, route }) {
    const { name, symbol, currentPrice, priceChange, logoUri, data } = route.params;
    const priceChangeColor = priceChange > 0 ? '#03DAC5' : '#B00020';

    const getDay = (date) => {
        var timestamp = date * 1000
        var date = new Date(timestamp);

        return String(date).substr(8, 2)
    };

    const data1 = {
        labels: [getDay(data.data[6].timestamp),
        getDay(data.data[5].timestamp),
        getDay(data.data[4].timestamp),
        getDay(data.data[3].timestamp),
        getDay(data.data[2].timestamp),
        getDay(data.data[1].timestamp),
        getDay(data.data[0].timestamp)],
        
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
                <View>
                    <Text style={styles.title}>{name.split('/')[0]} ({symbol})</Text>
                </View>
            </View>
            <View style={styles.chartWrapper}>
                <LineChart
                    data={data1}
                    width= {screenWidth}
                    height={220}
                    yAxisLabel="R$"
                    yAxisInterval={1}
                    xAxisLabel={data.data[6].date}
                    chartConfig={chartConfig}
                    bezier
                    withVerticalLines={true}
                    style={{
                        marginVertical: 16,
                        borderRadius: 16,
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                />
               <Text style={[styles.chartSubtitle, {color: priceChangeColor} ]}>7 D</Text>
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
        backgroundColor: '#03DAC5',
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
    }
});