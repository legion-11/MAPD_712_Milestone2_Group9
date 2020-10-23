import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// provide big screen for vital
export default function ViewVitals({ navigation, route })  {
  var vital = route.params.vital
  const [date, setDate] = useState(new Date(vital.date));


  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled = {true}>
        <Text style={styles.text}>Measurements made</Text>

        <Text style={styles.textResults}>
          {date.getHours() + "-"+ date.getMinutes() + "  " +
           date.getDate() + "-"+ date.getMonth() + "-"+ date.getFullYear()}
        </Text>

        <Text style={styles.text}>Measured by</Text>
        <Text style={styles.textResults}>{vital.measured} </Text>

        <Text style={styles.text}>Blood Presure</Text>
        <Text style={styles.textResults}>{vital.bloodPresure + ' mm Hg'} </Text>

        <Text style={styles.text}>Respiratory Rate</Text>
        <Text style={styles.textResults}>{vital.respiratoryRate + ' / min'} </Text>

        <Text style={styles.text}>Blood Oxigen Level</Text>
        <Text style={styles.textResults}>{vital.bloodOxigen + ' %'} </Text>

        <Text style={styles.text}>Hearth Rate</Text>
        <Text style={styles.textResults}>{vital.hearthRate + ' / min'} </Text>
      </ScrollView>

      
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => // TODO: save vitals
            navigation.navigate("AddVitals", {vital: vital, patient: route.params.patient})}
          >
            <Text style={styles.buttonText}>Edit</Text>
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
    buttonText:{
      color: "white",
      alignSelf: 'center',
      fontSize: 22,
    },
    text: {
      fontFamily: "serif",
      fontSize: 22,
    },
    textResults: {
      fontFamily: "serif",
      fontSize: 22,
      marginBottom: 15,
      marginTop: 5,
      borderBottomWidth: 1,
    },
    bottom: {
      flex:1,
      justifyContent: 'flex-end'
    },
  }
);
