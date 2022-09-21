import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ListItem from './components/ListItem';

export default function App() {

  const [Data, setData] = useState([]);

  useEffect(function () {
    async function getData() {
      const response = await fetch('https://economia.awesomeapi.com.br/JSON/BTC-BRL');
      const Data = await response.json();
      setData(Data);
    }
    getData();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Markets</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        key="portrait"
        keyExtractor={(item) => item.id}
        data={Data}
        renderItem={({ item }) => (
          <ListItem
            name={item.code}
            symbol={item.code}
            currentPrice={item.bid}
            priceChange={item.pctChange}
            logoUri="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  }
});
