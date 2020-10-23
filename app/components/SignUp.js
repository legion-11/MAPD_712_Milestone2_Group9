import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//screen for signing up
export default function SignIn({navigation})  {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [email, setEmail] = useState();

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Sign Up</Text>

        <TextInput style={styles.textinput}
          placeholder="Username"
          onChangeText= {text => setUsername(text)}
        />
        <TextInput style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText= {text => setPassword(text)}
        />
        <TextInput style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText= {text => setPassword2(text)}
        />
        <TextInput style={styles.textinput}
          placeholder="Email"
          onChangeText= {text => setEmail(text)}
        />

        <TouchableOpacity
          style={styles.button}
          // onPress={() => ()}
          >
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
    container:{
      flex:1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingHorizontal: 30,
      paddingVertical: 20
    },
    textinput:{
      fontFamily: "serif",
      alignSelf: 'stretch',
      marginBottom: 30,
      borderBottomColor: '#000',
      borderBottomWidth: 1,
      fontSize: 20,
    },
    text:{
      fontFamily: "serif",
      textAlign: 'left',
      alignSelf: 'center',
      fontSize: 32,
    },
    button:{
      backgroundColor: 'crimson',
      borderRadius:25,
      borderWidth: 1,
      borderColor: '#fff',
      padding: 4,
    },
    buttonText:{
      fontFamily: "serif",
      color: "white",
      alignSelf: 'center',
      fontSize: 32,
    },
});
