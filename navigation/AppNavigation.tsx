import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import {navigationRef} from '../utils/rootNavigation';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

interface UserType {
  displayName: null;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {creationTime: number; lastSignInTime: number};
  // multiFactor: {enrolledFactors: [Array]};
  phoneNumber: null;
  photoURL: null;
  providerData: [[Object]];
  providerId: 'firebase';
  tenantId: null;
  uid: string;
}

const AppNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChanged = (user: any | UserType) => {
    setUser(user ? user : null);
    setIsAuth(user ? true : false);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={'signup'}>
        {isAuth ? (
          <Stack.Group>
            <Stack.Screen name={'home'}>
              {() => <HomeScreen user={user} />}
            </Stack.Screen>
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name={'signup'} component={SignupScreen} />
            <Stack.Screen name={'signin'} component={SigninScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNavigation;
