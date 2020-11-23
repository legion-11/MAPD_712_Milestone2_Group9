import React, { useEffect, useState,  } from 'react';
import {
  ScrollView,
  StyleSheet,
  BackHandler,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


var url = "http://127.0.0.1:3009"
// screen for adding and editing vital
export default function AddVitals({ navigation, route })  {
  var vital = route.params.vital

  //hooks for vitals info
  const [bloodPresure, setBloodPresure] = useState(vital.bloodPresure || '');
  const [respiratoryRate, setRespiratoryRate] = useState(vital.respiratoryRate || '');
  const [bloodOxigen, setBloodOxigen] = useState(vital.bloodOxigen || ''); hearthRate
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

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled = {true}>
        <Text style={[styles.text]}>Measurements made</Text>

        <View style={styles.inLine}>
            <Text style={[{flex: 1}, styles.text]} >
              {"Time"}
            </Text>
            <Text style={[{flex: 1}, styles.text]} >
              {"Date"}
            </Text>
        </View>

        <View style={styles.inLine}>
            <Text style={[{flex: 1}, styles.text]} onPress={showTimepicker}>
              { date.getHours() + "-"+ date.getMinutes()}
            </Text>
            <Text style={[{flex: 1}, styles.text]} onPress={showDatepicker}>
              {date.getDate() + "-"+ date.getMonth() + "-"+ date.getFullYear()}
            </Text>
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
            <TextInput style={styles.textinput}
              keyboardType='number-pad'
              value = {bloodPresure}
              onChangeText= {text => setBloodPresure(text)}
            />

            <Text style={styles.text}>Respiratory Rate</Text>
            <TextInput style={styles.textinput}
              keyboardType='number-pad'
              value = {respiratoryRate}
              onChangeText= {text => setRespiratoryRate(text)}
            />

            <Text style={styles.text}>Blood Oxigen Level</Text>
            <TextInput style={styles.textinput}
              keyboardType='number-pad'
              value = {bloodOxigen}
              onChangeText= {text => setBloodOxigen(text)}
            />

            <Text style={styles.text}> Hearth Rate</Text>
            <TextInput style={styles.textinput}
              keyboardType='number-pad'
              value = {hearthRate}
              onChangeText= {text => setHearthRate(text)}
            />
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => // TODO: save vitals
          {

            if (bloodPresure.length==0 && respiratoryRate.length==0&&bloodOxigen.length==0&&hearthRate.length==0) {
              console.log('error');
            }else {
              let vital_id = (vital._id != undefined) ? `/${vital._id}` : ''
              let method = (vital._id != undefined) ? `PUT` : 'POST'
              let new_vital = {bloodPresure: bloodPresure,
                            respiratoryRate: respiratoryRate,
                            bloodOxigen: bloodOxigen,
                            hearthRate: hearthRate,
                            date: date
                            }
              fetch(url + `/patients/${route.params.patient._id}/records${vital_id}`, {
                method: method,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(new_vital)
              })
              .then((response) => response.json())
              .then((json)=> {new_vital = json})
              .catch((error) => console.error(error))
              .then( () => {
                navigation.navigate( "ViewVitals", { vital: new_vital, patient: route.params.patient} )
                }
              );
            }
          }}
        >
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

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
      margin: 5
    },
    text: {
      fontFamily: "serif",
      fontSize: 22,
    },
    inLine: {
      flexDirection:'row',
       marginBottom: 10,
    },
    bottom: {
      justifyContent: 'flex-end'
    },
    buttonText:{
      fontFamily: "serif",
      color: "white",
      alignSelf: 'center',
      fontSize: 22,
    },
    textinput:{
      fontFamily: "serif",
      alignSelf: 'stretch',
      height: 40,
      fontSize: 20,
      marginBottom: 15,
      borderColor: '#0005',
      borderRadius: 10 ,
      borderWidth: 1,
    },
  }
);
