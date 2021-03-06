import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';

var url = 'https://patientrecordsgroup.herokuapp.com';

// screen for adding and editing patient
export default function AddPatient({navigation, route}) {
  var patient = route.params.patient;
  console.log(
    'EditPatient start',
    patient._id,
    'user_id',
    route.params.user_id,
  );
  //hooks for patient info
  const [name, setName] = useState(patient.name || '');
  const [room, setRoom] = useState(patient.room || '');
  const [address, setAddress] = useState(patient.address || '');
  const [notes, setNotes] = useState(patient.notes || '');
  const [phone_number, setPhone] = useState(patient.phone || '');
  const [in_critical_condition, setCriticalcondition] = useState(
    patient.in_critical_condition || false,
  );

  let errorMessage = '';
  function save() {
    if (name.length === 0) {
      errorMessage = 'no name';
      Toast.show(errorMessage, Toast.LONG);
      return;
    }
    let url_id = patient._id !== undefined ? `/${patient._id}` : '';
    let method = patient._id !== undefined ? 'PUT' : 'POST';

    let newPatient = {
      name: name,
      room: room,
      address: address,
      notes: notes,
      phone_number: phone_number,
      user_id: route.params.user_id,
      in_critical_condition: in_critical_condition,
    };
    
    fetch(url + `/patients${url_id}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatient),
    })
      .then((response) => response.json())
      .then((json) => {
        errorMessage = 'all good';
        navigation.navigate('ViewPatient', {patient: json});
      })
      .catch((error) => {
        errorMessage = error.message;
        Toast.show(errorMessage, Toast.LONG);
      });
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => setCriticalcondition(!in_critical_condition)}>
          <Image
            source={
              in_critical_condition
                ? require('../assets/critical_condition.png')
                : require('../assets/ok_state.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Patient Name</Text>

        <TextInput
          style={styles.textinput}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.text}>Address</Text>
        <TextInput
          style={styles.textinput}
          value={address}
          multiline={true}
          numberOfLines={2}
          onChangeText={(text) => setAddress(text)}
        />

        <Text style={styles.text}>Phone number</Text>
        <TextInput
          style={styles.textinput}
          value={phone_number}
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text)}
        />

        <Text style={styles.text}>Room</Text>
        <TextInput
          style={styles.textinput}
          value={room}
          keyboardType="number-pad"
          onChangeText={(text) => setRoom(text)}
        />

        <Text style={styles.text}>Notes</Text>
        <TextInput
          style={styles.textinput}
          value={notes}
          multiline={true}
          numberOfLines={3}
          onChangeText={(text) => setNotes(text)}
        />
      </ScrollView>

      <TouchableOpacity style={[styles.button]} onPress={() => save()}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
  },
  button: {
    backgroundColor: 'crimson',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 6,
    margin: 5,
  },
  text: {
    fontSize: 22,
    fontFamily: 'serif',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontFamily: 'serif',
    color: 'white',
    alignSelf: 'center',
    fontSize: 22,
  },
  textinput: {
    fontFamily: 'serif',
    textAlignVertical: 'top',
    alignSelf: 'stretch',
    fontSize: 20,
    marginBottom: 15,
    borderColor: '#0005',
    borderRadius: 10,
    borderWidth: 1,
  },
  image: {
    resizeMode: 'center',
    paddingVertical: 5,
    height: 60,
    width: 60,
  },
});
