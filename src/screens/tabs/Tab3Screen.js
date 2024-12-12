import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Tab3Screen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Tab3Screen;
