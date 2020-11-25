import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';

var url = 'https://patientrecordsgroup.herokuapp.com';

function checkemail(email) {
  // TODO:
  if (email === '') {
    return true;
  }
  return false;
}
//screen for signing up
export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');

  var errorMessage = '';

  const sendInfoOnServer = () => {
    if (username.length < 4) {
      errorMessage = 'username should be at least 4 char long';
      console.log(errorMessage);
      Toast.show('username should be at least 4 char long', Toast.LONG);
    } else if (password !== undefined && password.length < 6) {
      errorMessage = 'password should be at least 6 char long';
      console.log(errorMessage);
      Toast.show('password should be at least 6 char long', Toast.LONG);
    } else if (password !== undefined && password !== password2) {
      errorMessage = 'passwords are different';
      console.log(errorMessage);
      Toast.show('passwords are different', Toast.LONG);
    } else if (checkemail(email)) {
      errorMessage = 'email error';
      console.log(errorMessage);
      Toast.show('email error', Toast.LONG);
    } else {
      fetch(url + '/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          errorMessage = 'all good';
          navigation.navigate('ViewPatients', {user_id: json._id});
        })
        .catch((error) => {
          errorMessage = error.message;
          console.log(error.message);
          Toast.show(error.message, Toast.LONG);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>

      <TextInput
        style={styles.textinput}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword2(text)}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => sendInfoOnServer()}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  textinput: {
    fontFamily: 'serif',
    alignSelf: 'stretch',
    marginBottom: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    fontSize: 20,
  },
  text: {
    fontFamily: 'serif',
    textAlign: 'left',
    alignSelf: 'center',
    fontSize: 32,
  },
  errortext: {
    fontFamily: 'serif',
    textAlign: 'left',
    alignSelf: 'center',
    fontSize: 22,
  },
  button: {
    backgroundColor: 'crimson',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 4,
  },
  buttonText: {
    fontFamily: 'serif',
    color: 'white',
    alignSelf: 'center',
    fontSize: 32,
  },
});
