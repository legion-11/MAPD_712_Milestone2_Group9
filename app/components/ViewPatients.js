import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';


export default function ViewPatients({ navigation })  {
  const [isLoading, setLoading] = useState(true);
  const [patientsList, setPatientsList] = useState([]);

  // load list of patients
  useEffect(() => { // TODO: change to oue domain
    fetch('https://my-json-server.typicode.com/legion-11/demo/patients')
      .then((response) => response.json())
      .then((json)=>setPatientsList(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("AddPatient", { patient: '' })}
          >
          <Text style={styles.buttonText}>{"  +  "}</Text>
        </TouchableOpacity>

        
        <View style={{flexDirection:'row'}}>
          <Text style={[styles.firstColumn, styles.defaultFont]}></Text>
          <Text style={[styles.secondColumn, styles.defaultFont]}>Name</Text>
          <Text style={[styles.thirdColumn, styles.defaultFont]}>State</Text>
        </View>

        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={patientsList}
            renderItem={({ item }) => (
              <ListItem item={item} navigation={navigation}/>
            )}
          />
        )}

    </View>
  );
};

const styles = StyleSheet.create(
  {
    container:{
      flex:1,
      padding: 16,
    },
    firstColumn:{
      flex: 2,
      padding: 5,
    },
    secondColumn:{
      flex: 10,
      padding: 5,
      fontSize: 18,
    },
    thirdColumn:{
      flex: 2,
      padding: 5,
      fontSize: 18,
      textAlign: 'center'},
    button:{
      backgroundColor: 'crimson',
      borderRadius:25,
      paddingVertical: 8,
      paddingHorizontal: 6,
      margin: 5,
      alignSelf: 'flex-end',
    },
    defaultFont: {
      fontFamily: "serif",
    },
    buttonText:{
      color: "white",
      alignSelf: 'center',
      fontSize: 24,
    },
  }
);
// Each item of the list is photo, full name, and status picture that redirect to patient's screen
function ListItem(props){
  return (
    <TouchableOpacity
      key={props.item.id}
      style={listStyles.container}
      onPress={() =>
        props.navigation.navigate('ViewPatient', { patient: props.item })
      }>

      <Image source={{uri:props.item.photo}} style={listStyles.image} />
      <Text style={listStyles.text}>{props.item.name}</Text>
      <Image source={{uri:props.item.photo}} style={listStyles.image} />

    </TouchableOpacity>);
}
const listStyles = StyleSheet.create(
  {
    container:{
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 1,
    },
    image:{
      flex:2,
      alignSelf: 'center',
      resizeMode: "center",
      padding: 5,
      height: 60,
    },
    text:{
      fontFamily: "serif",
      alignSelf: 'center',
      marginBottom:10,
      padding:5,
      fontSize: 20,
      flex:10,
    },
  }
);
