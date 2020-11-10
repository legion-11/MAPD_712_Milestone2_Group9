import React, { useEffect, useState } from 'react';
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

// provide information about patient, and his vitals
export default function ViewPatient({ navigation, route })  {
  const [isLoading, setLoading] = useState(true);
  const [VitalsList, setVitalsList] = useState([]);
  var patient = route.params.patient
  console.log(1, patient._id)
  // load list of vitals
  useEffect(() => { // TODO: change to oue domain
    fetch('https://my-json-server.typicode.com/legion-11/demo/vitals')
      .then((response) => response.json())
      .then((json)=>setVitalsList(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
            <View style={{maxHeight: 60}}>
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

            <View style={{height:"30%"}}>
              {isLoading ? <ActivityIndicator/> : (
                  <FlatList nestedScrollEnabled = {true} style={{borderWidth: 1, borderColor: "#0005"}}
                    data={VitalsList}
                    renderItem={({ item }) => (<ListItem item={item} navigation={navigation} patient={patient}/>)}
                  />
              )}
            </View>
        </ScrollView >

        <View style={styles.bottom}>
          <TouchableOpacity style={[styles.button, styles.leftHalf, {}]}
            onPress={() => navigation.navigate("AddPatient", { patient: patient })}
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
  return (
    <TouchableOpacity
      key={props.item.id}
      style={list.container}
      onPress={() =>
        props.navigation.navigate('ViewVitals', { vital: props.item, patient: props.patient})
      }>
      <View style={{ marginBottom:10, padding:5}}>
          <Text style={list.text}>{props.item.date.split("T").join("\n")}</Text>
      </View>
      <View style={{ marginBottom:10, padding:5}}>
          <Text style={list.text}>Blood Presure</Text>
          <Text style={list.text}>Respiratory Rate</Text>
          <Text style={list.text}>Blood Oxigen</Text>
          <Text style={list.text}>Hearth Rate</Text>
      </View>

      <View style={{ marginBottom:10, padding:5, flex:1}}>
          <Text style={list.text}>{props.item.bloodPresure}</Text>
          <Text style={list.text}>{props.item.respiratoryRate}</Text>
          <Text style={list.text}>{props.item.bloodOxigen}</Text>
          <Text style={list.text}>{props.item.hearthRate}</Text>
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
