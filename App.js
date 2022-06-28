import React from 'react';
import { StyleSheet, Text, SafeAreaView, Button} from 'react-native';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home, Login,AllJobs,AddJob,Company,SelectedJob,AddCompany,Confirm} from './src/pages';
import Auth from './src/utils/auth';
import { TouchableOpacity } from 'react-native-web';

const Stack = createNativeStackNavigator();

const MyTheme = {
  colors: {
    card: '#4297A0',
    text: 'rgb(255,255,255)',
    border: '#4297A0',
  },
};
export default function App() {
  const logout = async (navigation) => {
    await Auth.logout()
    navigation.navigate('login')
  }
  return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name='login' component = {Login} />
          <Stack.Screen name='Home' component = {Home} options={({navigation})=>({headerRight:()=>(<TouchableOpacity style={styles.logout} onPress={()=>logout(navigation)}><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>)})}/>
          <Stack.Screen name='AllJobs' component = {AllJobs}  />
          <Stack.Screen name='AddCompany' component = {AddCompany}  />
          <Stack.Screen name='AddJob' component = {AddJob}  />
          <Stack.Screen name='Company' component = {Company}  />
          <Stack.Screen name='SelectedJob' component = {SelectedJob}  />
          <Stack.Screen name='Confirm' component = {Confirm}  />
        
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigation:{
    backgroundColor:'#2F5061'
  },
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout:{
    padding:10
  },
  logoutText:{
    color:'white',
    fontWeight:400,
    fontSize:18
  }
});
