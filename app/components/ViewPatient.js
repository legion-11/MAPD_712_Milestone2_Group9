import React, { useEffect, useState } from 'react';
import {HeaderBackButton} from '@react-navigation/stack';

import {
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

var url = "http://127.0.0.1:3009"
// provide information about patient, and his vitals
export default function ViewPatient({ navigation, route })  {
  const [isLoading, setLoading] = useState(true);
  const [VitalsList, setVitalsList] = useState([]);
  var patient = route.params.patient
  console.log("view of patient with id", patient._id);
  // load list of vitals

  const getVitals = () => {
    fetch(url + `/patients/${patient._id}/records`)
      .then((response) => response.json())
      .then((json)=>setVitalsList(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }
  
  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          getVitals()
          console.log("reloaded");
      });
  }, []);

 

  React.useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft:()=>(
        <HeaderBackButton
            onPress={ () => {navigation.navigate('ViewPatients') } }
        />
      )
    })
  })

  return (
    <View style={styles.container}>
        <ScrollView nestedScrollEnabled = {true}>
            <View style={styles.inLine}>
                <Text style={styles.firstColumn}>Room</Text>
                <Text style={styles.secondColumn}>{patient.room}</Text>
            </View>

            <View style={styles.inLine}>
                <Text style={styles.firstColumn}>Phone number</Text>
                <Text style={styles.secondColumn}>{patient.phone_number}</Text>
            </View>

            <View style={styles.inLine}>
              <Text style={styles.firstColumn}>Address</Text>
            </View>
            <View style={{maxHeight: 120}}>
              <ScrollView nestedScrollEnabled = {true}>
                <Text style={{paddingHorizontal: 10, fontSize: 18, fontFamily: "serif", textAlignVertical: 'top'}}>{patient.address}</Text>
              </ScrollView>
            </View>

            <View style={styles.inLine}>
              <Text style={styles.firstColumn}>Notes</Text>
            </View>
            <View style={{maxHeight: 90, borderWidth: 1, borderColor: "#0005"}}>
              <ScrollView nestedScrollEnabled = {true}>
                <Text style={{paddingHorizontal: 10, fontSize: 18, textAlignVertical: 'top', fontFamily: "serif"}}>{patient.notes}</Text>
              </ScrollView>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.leftHalf]}
              onPress={() => navigation.navigate("AddVitals", { patient: patient, vital: '' })}
              >
                <Text style={styles.buttonText}>Add Vitals</Text>

            </TouchableOpacity>

            <View style={{height:180}}>
              {isLoading ? <ActivityIndicator/> : (
                  <FlatList nestedScrollEnabled = {true} style={{borderWidth: 1, borderColor: "#0005"}}
                    data={VitalsList}
                    renderItem={({ item }) => (<ListItem item={item} navigation={navigation} patient={patient} />)}
                  />
              )}
            </View>
        </ScrollView >

        <View style={styles.bottom}>
          <TouchableOpacity style={[styles.button, styles.leftHalf, {}]}
            onPress={() => navigation.navigate("AddPatient", { patient: patient, user_id: route.params.user_id })}
            >
            <Text style={styles.buttonText}>{"Edit"}</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container:{
      flex:1,
      paddingHorizontal: 22,

    },
    inLine: {
      flexDirection:'row',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    firstColumn: {
      fontFamily: "serif",
      flex: 3,
      fontSize: 20,
      marginRight: 10,
    },
    secondColumn: {
      fontFamily: "serif",
      flex: 4,
      fontSize: 20
    },
    multiline: {
      fontFamily: "serif",
      fontSize: 20
    },
    button:{
      backgroundColor: 'crimson',
      borderRadius:25,
      padding: 6,
      marginVertical: 8,
    },
    leftHalf:{
      alignSelf: 'flex-end',
       width: "50%",
    },
    buttonText:{
      fontFamily: "serif",
      color: "white",
      alignSelf: 'center',
      fontSize: 22,
    },
    bottom: {
      justifyContent: 'flex-end'
    },
  }
);

function ListItem(props){
  function checkVital(vital, text){
    if (vital!='') {return <Text style={list.text}>{text}</Text>}
  }
  let date = new Date(props.item.date)
  return (
    <TouchableOpacity
      key={props.item.id}
      style={list.container}
      onPress={() =>
        props.navigation.navigate('ViewVitals', { vital: props.item, patient: props.patient})
      }>
      <View style={{ marginBottom:10, padding:5}}>
          <Text style={list.text}>
          {
          date.getDate() + "-"+ date.getMonth() + "-"+ date.getFullYear() + "\n" +
            date.getHours() + "-"+ date.getMinutes()
          }
          </Text>
      </View>
      <View style={{ marginBottom:10, padding:5}}>
      {checkVital(props.item.bloodPresure, "Blood Presure")}
      {checkVital(props.item.respiratoryRate, "Respiratory Rate")}
      {checkVital(props.item.bloodOxigen, "Blood Oxigen")}
      {checkVital(props.item.hearthRate, "Hearth Rate")}
      </View>

      <View style={{ marginBottom:10, padding:5, flex:1}}>
      {checkVital(props.item.bloodPresure, props.item.bloodPresure)}
      {checkVital(props.item.respiratoryRate, props.item.respiratoryRate)}
      {checkVital(props.item.bloodOxigen, props.item.bloodOxigen)}
      {checkVital(props.item.hearthRate, props.item.hearthRate)}
      </View>

    </TouchableOpacity>
  );
}
const list = StyleSheet.create(
  {
    container:{
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "#0005",
    },
    text: {
      fontFamily: "serif",
    },
  }
);
