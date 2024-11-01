import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const createUser = (email: string, password: string) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('Success:', 'User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      }

      console.error(error);
    });
};

export const signIn = (email: string, password: string) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('Success:', 'User signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error:', 'No user found with this email!');
      }

      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error:', 'Incorrect password!');
      }

      console.error(error);
    });
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => Alert.alert('Notice:', 'User signed out!'));
};
