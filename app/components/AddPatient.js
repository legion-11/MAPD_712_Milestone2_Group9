import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// screen for adding and editing patient
export default function AddPatient({ navigation, route })  {
  var patient = route.params.patient

  //hooks for patient info
  const [name, setName] = useState(patient.name || '');
  const [room, setRoom] = useState(patient.room || '');
  const [address, setAddress] = useState(patient.address || '');
  const [notes, setNotes] = useState(patient.notes || '');
  const [phone, setPhone] = useState(patient.phone || '');

  return (
    <View style={styles.container}>
        <ScrollView>
            <Text style={styles.text} >Patient Name</Text>
            <TextInput
              style={styles.textinput}
              value = {name}
              onChangeText= {text => setName(text)}
            />

            <Text style={styles.text} >Address</Text>
            <TextInput
              style={styles.textinput}
              value = {address}
              multiline={true}
              numberOfLines={2}
              onChangeText= {text => setAddress(text)}
            />

            <Text style={styles.text} >Phone number</Text>
            <TextInput
              style={styles.textinput}
              value = {phone}
              keyboardType='number-pad'
              onChangeText= {text => setPhone(text)}
            />

            <Text style={styles.text} >Room</Text>
            <TextInput
            style={styles.textinput}
              value = {room}
              keyboardType='number-pad'
              onChangeText= {text => setRoom(text)}
            />

            <Text style={styles.text} >Notes</Text>
            <TextInput
              style={styles.textinput}
              value = {notes}
              multiline={true}
              numberOfLines={3}
              onChangeText= {text => setNotes(text)}
            />
        </ScrollView>

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => // TODO: saving
            navigation.goBack()}
          >
          <Text style={styles.buttonText}>Save</Text>

        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container:{
      flex:1,
      padding: 22,
    },
    button:{
      backgroundColor: 'crimson',
      borderRadius:25,
      padding: 6,
      margin: 8
    },
    text: {
      fontSize: 22,
      fontFamily: "serif",
    },
    bottom: {
      justifyContent: 'flex-end',
    },
    buttonText:{
      fontFamily: "serif",
      color: "white",
      alignSelf: 'center',
      fontSize: 22,
    },
    textinput:{
      fontFamily: "serif",
      textAlignVertical: "top",
      alignSelf: 'stretch',
      fontSize: 20,
      marginBottom: 15,
      borderColor: '#0005',
      borderRadius: 10 ,
      borderWidth: 1,
    },
  }
);
