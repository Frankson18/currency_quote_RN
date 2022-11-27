import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import ListItem from '../components/ListItem';
import { AuthProvider, useAuth } from '../hooks/auth';
import SignIn from './SignIn';

interface navigationProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: navigationProps) {

  const imgUri = ["http://www.blogdarisonisantos.com/images/2018/01/cifrao.png",
    "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Euro-EUR-icon.png",
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png"];

  const [data, setData] = useState([] as any);
  const { user, signOut } = useAuth();

  useEffect(function () {
    async function getData() {
      const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL');
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
      <View style={styles.header}>
        <View style={styles.userWrapper}>
          <View style={styles.userInfo}>
            <Image style={styles.photo} source={{ uri: user?.photo  }} />
            <View style={styles.user}>
              <Text style={styles.userGreeting}>Olá,</Text>
              <Text style={styles.userName}>{user.name} {user?.lastName} </Text>
            </View>
          </View>
          <Button title="Sair" onPress={signOut} />
        </View>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>INVESTE AGORA</Text>
        <Text style={styles.subscription}>Informações em tempo real para você decidir investir na melhor moeda, no seu melhor momento 💰</Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.code}
        data={data}
        renderItem={({ item, index }) => (
          <ListItem
            name={item.name as string}
            symbol={item.code as number}
            currentPrice={item.bid}
            priceChange={item.pctChange}
            logoUri={imgUri[index]}
            codein={item.codein}
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
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  userWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 20,
    marginTop: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 48,
    height: 48,

    borderRadius: 10,
  },
  user: {
    marginLeft: 17,
  },
  userGreeting: {
    color: '#fff',
    fontSize: 18,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
