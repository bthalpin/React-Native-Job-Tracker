import React, { useState,useEffect } from 'react';
import {View,Text,TextInput,Image,StyleSheet} from 'react-native';
import MyButton from '../components/MyButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Auth from '../utils/auth';

function Login({navigation}) {
    const isFocused = useIsFocused()
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    // const [isSelected,setSelection] = useState(false)
    const [loginOrRegister,setLoginOrRegister] = useState('login')
    const [errorMessage,setErrorMessage] = useState('')

    // const saveSelected = async() => {
    //     if (isSelected){
    //         await AsyncStorage.setItem('selected', true);
    //     }else{
    //         await AsyncStorage.removeItem('selected');
    //     }
    // }

    // const saveLogin = async () => {
    //     if (isSelected){
    //         await AsyncStorage.setItem('loginInfo', JSON.stringify(user));

    //     }
    // }
    // const removeLogin = async () => {
    //     await AsyncStorage.removeItem('loginInfo');

    // }

    // const loadLogin = async () => {
    //     const selected = await AsyncStorage.getItem('selected')||''
    //   
    //     if (selected===''){
    //         removeLogin()
    //         return
    //     }
    //     const userData = await AsyncStorage.getItem('loginInfo')||''
    //     if (userData){
    //         setUser(JSON.parse(userData))
    //         setSelection(true)
    //     }
        
        

    // }
    const checkLoggedIn = async() => {
        const loggedIn = await Auth.loggedIn()
        if (loggedIn){
            navigation.navigate('Home')
        }
    }
    useEffect (()=>{
        checkLoggedIn()
    },[isFocused])
    // useEffect(()=>{
    //     if (isSelected){
    //         saveLogin()
    //     }
    // },[user])
    // useEffect(()=>{
    //     loadLogin()
    // },[isFocused])
    // useEffect(()=>{
    //     saveSelected()
    //     saveLogin()
    // },[isSelected])
    const changeLogin = (path)=>{
        setLoginOrRegister(path)
        setErrorMessage('')
        setUser({
            name:'',
            email:'',
            password:''
        })
    }
    const register = (e) => {
        e.preventDefault();
        if (user.name===''||user.email===''||user.password===''){
            return
        }
        if (!user.email.toLowerCase().match(/.+@.+\..+/)){
            setErrorMessage('Must enter valid email')

            return
        }
        if (user.password.length<8){
            setErrorMessage('Password must be at least 8 characters')
            return
        }
        fetch('https://job-tracker-bh.herokuapp.com/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...user,email:user.email.toLowerCase()})

        }).then(response=>response.json())
        .then(data=>{
            if(data.code===11000){
                setErrorMessage('An account with that email is already used.')
                return
            }
            if (!data.token){       
                setErrorMessage('invalid')
                return
            }
            Auth.login(data.token)
            setErrorMessage('')
            navigation.navigate('Home')
        })
    }

    // const handleInput = ({email,password}) => {
    //     if (email || email===''){
    //         setUser({...user,email:email})
    //     }
    //     if (password || password ==='') {
    //         setUser({...user,password:password})
    //     }
        // if (isSelected){
        //     saveLogin()

        // }
    // }
    const login = (e) => {
        e.preventDefault();
        if (user.email===''||user.password===''){
            return
        }
        fetch('https://job-tracker-bh.herokuapp.com/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...user,email:user.email.toLowerCase()})

        }).then(response=>{
            return response.json()})
        .then(data=>{
            if (!data.token){
                setErrorMessage('Invalid username or password')
                return
            }
            Auth.login(data.token)
            setErrorMessage('')
            navigation.navigate('Home')
        })
    }

    return (
        <>
        
        
        {loginOrRegister==='login'?
            <KeyboardAwareScrollView  contentContainerStyle={styles.container}>

                <Image style={styles.image} source={require("../images/logo512.png")} alt="JobTracker Logo"></Image>
                <View style={styles.inputContainer}>
                    
                    <TextInput style={styles.input} name="email" type="email" value={user.email} onChangeText={(text)=>setUser({...user,email:text})} placeholder="Enter Email" required autoComplete='email'></TextInput>
                    
                    <TextInput style={styles.input} name="password" type="password" value={user.password} onChangeText={(text)=>setUser({...user,password:text})} placeholder="Enter Password" required secureTextEntry autoComplete='password'></TextInput>
                </View>
                <View style={styles.buttonContainer}>
                    <MyButton width='100%' action={login} text='Login' />
                </View>
                    
                <Text onPress={()=>changeLogin('register')}>Click to Register</Text>
                <Text>{errorMessage}</Text>
                    
            </KeyboardAwareScrollView>
        :
            <KeyboardAwareScrollView  contentContainerStyle={styles.container}>
                <Image style={styles.image} source={require("../images/logo512.png")} alt="JobTracker Logo"></Image>
                <View style={styles.inputContainer}>

                    <TextInput style={styles.input} name="name" type="text" value={user.name} onChangeText={(text)=>setUser({...user,name:text})} placeholder="Enter Name" required></TextInput>
                    
                    <TextInput style={styles.input} name="email" type="email" value={user.email} onChangeText={(text)=>setUser({...user,email:text})} placeholder="Enter Email" required></TextInput>
                    
                    <TextInput style={styles.input} name="password" type="password" value={user.password} onChangeText={(text)=>setUser({...user,password:text})} placeholder="Enter Password" required></TextInput>
                
                </View>
                <View style={styles.buttonContainer}>
                    <MyButton width='100%' action={register} text='Register' />
                </View>
                
                <Text onPress={()=>changeLogin('login')}>Return to Login</Text>
                <Text>{errorMessage}</Text>
            </KeyboardAwareScrollView>
        }
        </>
    );
  }

  const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        paddingTop:50
    },
    image:{
        width:200,
        height:200
    },
    inputContainer:{
        margin:30,
        width:300,

    },
    input:{
        margin:3,
        width:300,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#4297A0',
        padding:10,
    },
    buttonContainer:{
        paddingBottom:20,
    },
  })
export default Login;
