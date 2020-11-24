import React, { useEffect, useState } from 'react';
import {HeaderBackButton} from '@react-navigation/stack';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  BackHandler,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// provide big screen for vital
export default function ViewVitals({ navigation, route })  {
  var vital = route.params.vital
  const [date, setDate] = useState(new Date(vital.date));
  console.log("view vital with id ", vital._id, " of patient ", route.params.patient._id);

  React.useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft:()=>(
        <HeaderBackButton
            onPress={ () => { navigation.navigate('ViewPatient', {patient: route.params.patient}) } }
        />
      )
    })
  })

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        ()=>{
          navigation.navigate('ViewPatient', {patient: route.params.patient} )
        }
      );
      return () => navigation.navigate('ViewPatient', {patient: route.params.patient} );
},[])

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled = {true}>
        <Text style={styles.text}>Measurements made</Text>

        <Text style={styles.textResults}>
          {date.getHours() + "-"+ date.getMinutes() + "  " +
           date.getDate() + "-"+ date.getMonth() + "-"+ date.getFullYear()}
        </Text>

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
      margin: 5,
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
