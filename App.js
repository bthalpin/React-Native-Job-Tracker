import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home, Login,AllJobs,AddJob,Company,SelectedJob,AddCompany,EditCompany,EditJob} from './src/pages';
import Auth from './src/utils/auth';

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
    navigation.navigate(' ')
  }
  return (
      <View style={styles.container}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator >
            <Stack.Screen name=' ' component = {Login} />

            <Stack.Screen name='Home' component = {Home} 
                options={({navigation,route})=>({
                  headerLeft:()=>(<></>),
                  headerRight:()=>(
                    <TouchableOpacity 
                      style={styles.logout} 
                      onPress={()=>logout(navigation)}>
                        <Text style={styles.text}>Logout</Text>
                    </TouchableOpacity>)
                  })} />

            <Stack.Screen name='AllJobs' component = {AllJobs} 
                options={({navigation})=>({
                  headerRight:()=>(
                    <TouchableOpacity 
                      style={styles.logout} 
                      onPress={()=>logout(navigation)}>
                        <Text style={styles.text}>Logout</Text>
                    </TouchableOpacity>)
                  })} />

            <Stack.Screen name='AddCompany' component = {AddCompany}  />
            <Stack.Screen name='EditCompany' component = {EditCompany}  />
            <Stack.Screen name='AddJob' component = {AddJob}  />
            <Stack.Screen name='EditJob' component = {EditJob}  />

            <Stack.Screen name='Company' component = {Company}   
                options={({navigation})=>({
                  headerRight:()=>(
                    <TouchableOpacity 
                      style={styles.logout} 
                      onPress={()=>logout(navigation)}>
                        <Text style={styles.text}>Logout</Text>
                        </TouchableOpacity>)
                  })}/>

            <Stack.Screen name='SelectedJob' component = {SelectedJob}  
                options={({navigation})=>({
                  headerRight:()=>(
                    <TouchableOpacity 
                      style={styles.logout} 
                      onPress={()=>logout(navigation)}>
                        <Text style={styles.text}>Logout</Text>
                        </TouchableOpacity>)
                  })} />
                  
          </Stack.Navigator>
        </NavigationContainer>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0efef',
  },
  logout:{
    padding:10
  },
  text:{
    color:'white',
    fontWeight:"400",
    fontSize:18
  }
});
