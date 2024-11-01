import React, {useState} from 'react';
import {
  Button,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
} from 'react-native';
import {createUser, signIn} from '../services/firebase';
import {navigate} from '../utils/rootNavigation';

const defaultCredentials = {
  email: '',
  password: '',
};

const SigninScreen = () => {
  const [formState, setFormState] = useState(defaultCredentials);

  const {email, password} = formState;

  const updateState = (
    key: string,
    value: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setFormState(prevState => ({...prevState, [key]: value}));
  };

  const signinNavigate = () => navigate('signup');

  return (
    <SafeAreaView style={styles.screen}>
      <TextInput
        placeholder={'Email'}
        value={email}
        // @ts-ignore:
        onChangeText={updateState.bind(this, 'email')}
        style={styles.input}
      />
      <TextInput
        placeholder={'password'}
        value={password}
        // @ts-ignore:
        onChangeText={updateState.bind(this, 'password')}
        secureTextEntry
        style={styles.input}
      />
      <Button onPress={signIn.bind(this, email, password)} title={'Login'} />
      <TouchableOpacity onPress={signinNavigate}>
        <Text>Dont have account yet? Click here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
    marginVertical: 1,
    padding: '5%',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default SigninScreen;
