import React, { useState } from 'react';
import {View,Text,Button,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native';
import Auth from '../utils/auth';

function Login({navigation}) {
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    
    const [loginOrRegister,setLoginOrRegister] = useState('login')
    const [errorMessage,setErrorMessage] = useState('')

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
        fetch('http://localhost:3001/user',{
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

    
    const login = (e) => {
        e.preventDefault();
        if (user.email===''||user.password===''){
            return
        }
        fetch('http://localhost:3001/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...user,email:user.email.toLowerCase()})

        }).then(response=>response.json())
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
        <View style={styles.container}>
        
                <Image style={styles.image} source={require("../images/logo512.png")} alt="JobTracker Logo"></Image>
                {loginOrRegister==='login'?
                <>
                    
                        <View style={styles.inputContainer}>
                          
                            <TextInput style={styles.input} name="email" type="email" value={user.email} onChangeText={(text)=>setUser({...user,email:text})} placeholder="Enter Email" required></TextInput>
                            
                            <TextInput style={styles.input} name="password" type="password" value={user.password} onChangeText={(text)=>setUser({...user,password:text})} placeholder="Enter Password" required></TextInput>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={login}>
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                    
                    <Text onPress={()=>changeLogin('register')}>Click to Register</Text>
                    <Text>{errorMessage}</Text>
                </>
                :
                <>
                   
                        <View style={styles.inputContainer}>
                           
                            <TextInput style={styles.input} name="name" type="text" value={user.name} onChangeText={(text)=>setUser({...user,name:text})} placeholder="Enter Name" required></TextInput>
                           
                            <TextInput style={styles.input} name="email" type="email" value={user.email} onChangeText={(text)=>setUser({...user,email:text})} placeholder="Enter Email" required></TextInput>
                            
                            <TextInput style={styles.input} name="password" type="password" value={user.password} onChangeText={(text)=>setUser({...user,password:text})} placeholder="Enter Password" required></TextInput>
                        
                        </View>
                        <TouchableOpacity style={styles.button} onPress={register} >
                            <Text style={styles.text}>Register</Text>
                        </TouchableOpacity>
                    
                    <Text onPress={()=>changeLogin('login')}>Return to Login</Text>
                    <Text>{errorMessage}</Text>
                </>
                }
               
          
        </View>
        </>
    );
  }

  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f0efef',
        // justifyContent:'center',
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
        paddingLeft:5,
        paddingRight:5
    },
    button:{
        backgroundColor:'#f56f76',
        padding:10,
        color:'white',
        borderRadius:5,
        margin:10
    },
    text:{
        color:'white'
    }
  })
export default Login;
