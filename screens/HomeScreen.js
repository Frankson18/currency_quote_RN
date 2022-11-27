import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ListItem from '../components/ListItem';
export default function App({ navigation }) {

  const [data, setData] = useState([]);

  useEffect(function () {
    async function getData() {
      const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL,LTC-BRL,CAD-BRL,UYU-BRL,JPY-BRL,DOGE-BRL');
      const data = await response.json();

      var myData = Object.keys(data).map(key => {
        return data[key];
      })

      setData(myData);
    }
    getData();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>INVESTE AGORA</Text>
        <Text style={styles.subscription}>Informações em tempo real para você decidir investir na melhor moeda, no seu melhor momento 💰</Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.code}
        data={data}
        renderItem={({ item, index }) => (
          <ListItem
            name={item.name}
            symbol={item.code}
            currentPrice={item.bid}
            priceChange={item.pctChange}
            codein={item.codein}
            index={index}
            navigation={navigation}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091018',
  },
  titleWrapper: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subscription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.5,
    paddingTop: 8,
    paddingBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10
  }
});
