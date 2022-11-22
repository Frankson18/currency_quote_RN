import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
  

export default function Header() {
    return (
        <View style={styles.titleWrapper}>
            <Text style={styles.largeTitle}>INVESTE AGORA</Text>
        </View>
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
  }
});