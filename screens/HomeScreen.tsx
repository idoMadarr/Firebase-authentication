import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {signOut} from '../services/firebase';

const HomeScreen = ({user}: {user: any}) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>Home Screen</Text>
      <Text>{`Hello, ${user?.email}`}</Text>
      <Button onPress={signOut} title={'Signout'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
