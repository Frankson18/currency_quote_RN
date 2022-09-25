import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ListItem from '../components/ListItem';

export default function App({navigation}) {

  const imgUri = ["http://www.blogdarisonisantos.com/images/2018/01/cifrao.png",
  "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Euro-EUR-icon.png",
  "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png"];

  const [data, setData] = useState([]);

  useEffect(function () {
    async function getData() {
      const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL');
      const aux = await response.json();
      var data = [];
      data = [...data, aux.USDBRL, aux.EURBRL, aux.BTCBRL, aux.ETHBRL];
      setData(data);
    }
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Currency Quote</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        keyExtractor={(item) => item.code}
        data={data}
        renderItem={({ item, index }) => (
          <ListItem
            name={item.name}
            symbol={item.code}
            currentPrice={item.bid}
            priceChange={item.pctChange}
            logoUri={imgUri[index]}
            codein = {item.codein}
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
    marginTop: 30,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  divider: {
    height: 1,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom:10
  }
});
