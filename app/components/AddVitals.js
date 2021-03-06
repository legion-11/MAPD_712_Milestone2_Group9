import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';

var url = 'https://patientrecordsgroup.herokuapp.com';
// screen for adding and editing vital
export default function AddVitals({navigation, route}) {
  var vital = route.params.vital;

  let errorMessage = '';

  //hooks for vitals info
  const [bloodPresure, setBloodPresure] = useState(vital.bloodPresure || '');
  const [respiratoryRate, setRespiratoryRate] = useState(
    vital.respiratoryRate || '',
  );
  const [bloodOxigen, setBloodOxigen] = useState(vital.bloodOxigen || '');
  hearthRate;
  const [hearthRate, setHearthRate] = useState(vital.hearthRate || '');

  // need for datetime picker
  const [date, setDate] = useState(new Date(vital.date || Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // showing datetime picker
  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };

  const createVitals = () => {
    if (
      bloodPresure.length === 0 &&
      respiratoryRate.length === 0 &&
      bloodOxigen.length === 0 &&
      hearthRate.length === 0
    ) {
      errorMessage = 'no data';
      console.log(errorMessage);
      Toast.show(errorMessage, Toast.LONG);
    } else {
      let vital_id = vital._id !== undefined ? `/${vital._id}` : '';
      let method = vital._id !== undefined ? 'PUT' : 'POST';
      let new_vital = {
        bloodPresure: bloodPresure,
        respiratoryRate: respiratoryRate,
        bloodOxigen: bloodOxigen,
        hearthRate: hearthRate,
        date: date,
      };
      fetch(url + `/patients/${route.params.patient._id}/records${vital_id}`, {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_vital),
      })
        .then((response) => response.json())
        .then((json) => {
          errorMessage = 'all good';
          navigation.navigate('ViewVitals', {
            vital: json,
            patient: route.params.patient,
          });
        })
        .catch((error) => {
          errorMessage = error.message;
          console.log(errorMessage);
          Toast.show(errorMessage, Toast.LONG);
        });
    }
  };

  const deleteVital = () => {
    if (vital._id !== undefined){
      fetch(
        url + `/patients/${route.params.patient._id}/records/${vital._id}`,
        {
        method: 'DELETE',
      })
      .catch((error) => {
        errorMessage = error.message;
        Toast.show(errorMessage, Toast.LONG);
      });
    }
    navigation.navigate('ViewPatient', {patient: route.params.patient})
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => deleteVital()}>
          <Image
            source={require('../assets/trash-bin.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <Text style={[styles.text, {alignSelf: 'center', fontSize: 28}]}>
          Measurements made
        </Text>

        <View style={styles.inLine}>
          <TouchableOpacity style={{flex: 1}} onPress={showTimepicker}>
            <Text style={[styles.text, {alignSelf: 'center'}]}>Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}} onPress={showDatepicker}>
            <Text style={[styles.text, {alignSelf: 'center'}]}>Date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inLine}>
          <TouchableOpacity style={{flex: 1}} onPress={showTimepicker}>
            <Text style={[styles.text, styles.textDateTime]}>
              {date.getHours() + '-' + date.getMinutes()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}} onPress={showDatepicker}>
            <Text style={[styles.text, styles.textDateTime]}>
              {date.getDate() +
                '-' +
                date.getMonth() +
                '-' +
                date.getFullYear()}
            </Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View>
          <Text style={styles.text}>Blood Presure</Text>
          <TextInput
            style={styles.textinput}
            keyboardType="number-pad"
            value={bloodPresure}
            onChangeText={(text) => setBloodPresure(text)}
          />

          <Text style={styles.text}>Respiratory Rate</Text>
          <TextInput
            style={styles.textinput}
            keyboardType="number-pad"
            value={respiratoryRate}
            onChangeText={(text) => setRespiratoryRate(text)}
          />

          <Text style={styles.text}>Blood Oxigen Level</Text>
          <TextInput
            style={styles.textinput}
            keyboardType="number-pad"
            value={bloodOxigen}
            onChangeText={(text) => setBloodOxigen(text)}
          />

          <Text style={styles.text}> Hearth Rate</Text>
          <TextInput
            style={styles.textinput}
            keyboardType="number-pad"
            value={hearthRate}
            onChangeText={(text) => setHearthRate(text)}
          />
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => createVitals()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
  },
  image: {
    resizeMode: 'center',
    paddingVertical: 5,
    height: 50,
    width: 50,
    margin: 10,
  },
  button: {
    backgroundColor: 'crimson',
    borderRadius: 25,
    padding: 6,
    margin: 5,
  },
  text: {
    fontFamily: 'serif',
    fontSize: 22,
  },
  inLine: {
    flexDirection: 'row',
    marginBottom: 10,
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
    alignSelf: 'stretch',
    height: 40,
    fontSize: 20,
    marginBottom: 15,
    borderColor: '#0005',
    borderRadius: 10,
    borderWidth: 1,
  },
  textDateTime: {
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    padding: 6,
  },
});
