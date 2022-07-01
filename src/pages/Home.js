import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,Button,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import MyButton from '../components/MyButton';
// import {Link} from 'react-router-dom';
// import {ConfirmModal,CompanyForm} from '../../components/';
import Auth from '../utils/auth';

function Home({navigation}) {
    const isFocused = useIsFocused()
    // const token = await Auth.getToken();
    const [show,setShow] = useState('')
    const [add,setAdd] = useState(false)
    const [search,setSearch] = useState('');
    // const [order,setOrder] = useState('Ascending');
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const [allCompanies,setAllCompanies ] = useState([])
    const loadCompanies = async () => {
        const token = await Auth.getToken();
        getCompanies(token)
    }
    useEffect(() => {
        loadCompanies();
      }, [isFocused]);
    
    const getCompanies = (token) => {
        console.log(token)
        let companyURL = `https://job-tracker-bh.herokuapp.com/api/company/`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => setAllCompanies(response));
    };
  
    const addCompany = () => {
        fetch('https://job-tracker-bh.herokuapp.com/api/company',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...newCompany,userId:Auth.getProfile().data._id})

        }).then(response=>response.json())
        .then(company=>{
            getCompanies()
            setNewCompany({
                name:'',
                address:'',
                phone:'',
                website:'',
                logo:'',
            })
            setAdd(false)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCompany.name.trim()){
            return
        }
        setShow('show')
    };
    return (
        <View style={styles.container}>    
            <View style={styles.buttonContainer}>
                <TextInput style={styles.searchInput} name="search"  placeholder="Filter Your Companies" value={search} onChangeText={(value)=>setSearch(value)}></TextInput>
                <MyButton color="#7b839c" action={()=>setSearch('')} text='Clear'/>

            </View>

            {allCompanies.length?<></>
            :<View style={styles.welcome}>
                <Text>Welcome to JobTracker! To begin, start by adding a company that you are applying to.  Once the company is created you can then add inViewidual jobs and mark the jobs once you apply, get an offer, or are rejected.</Text>
            </View>}

            {/* {add?
                <View  >
                   
                </View>
            : */}
                <View style={styles.buttonContainer}>
                    <MyButton width="40%" color='#f56f76' action={()=>navigation.navigate('AddCompany')} text='Add Company'/>
                    <MyButton  width="40%" color='#f56f76' action={()=>navigation.navigate('AllJobs')} text='View All Jobs'/>
                </View>
            {/* } */}
            <View style={styles.companyContainer}>

                <ScrollView contentContainerStyle={styles.companies}>
                    {allCompanies.filter(company=>company.name.toUpperCase().includes(search.toUpperCase())).map((company,index)=>{
                        return (
                            <View  style={styles.cardContainer}  key={index}>
                                {/* {console.log(company._id)} */}
                            
                                    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Company',{companyId:company._id})} >
                                        <View >
                                            <Image style={styles.image} source={company.logo?{uri:company.logo}:require('../images/logo512.png')} alt="Company logo"></Image>
                                        </View>
                                        <View>
                                            <Text style={styles.name}>{company.name}</Text>
                                            <Text style={styles.jobs}>{company.jobs.length} {company.jobs.length===1?'Job':'Jobs'} - Applied {company.jobs.filter(job=>job.status!=='created').length}</Text>
                                        </View>

                                    </TouchableOpacity >
                            
                            </View>
                        )
                    })}

                </ScrollView>
            </View>
        </View>
  );}
  const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:2
    },
    companyContainer:{
        flex:4,
        minHeight:80
    },
    companies:{
        flexGrow:1,
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    welcome:{
        textAlign:'center',
        flex:1,
        padding:10
    },  
    searchContainer:{
        flex:1,
        flexWrap:'wrap',
    },
    searchInput:{
        width:'72%',
        backgroundColor:'white',
        padding:10,
        borderWidth:1,
        borderColor:'#4297A0'
    },
    button:{
        flex:0.5,
        width:'25%'
    },
    buttonContainer: {
      flex: 1,
      flexDirection:'row',
      flexWrap:'wrap',
      paddingTop:5,
      height:10,
      backgroundColor: '#f0efef',
    //   alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    cardContainer:{
        width:'49%'
    },
    card:{
        marginBottom:10,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#4297A0',
        borderWidth:1,
        // borderBottomWidth:1,
        // shadowColor:'black',
        // shadowOffset:{width:0,height:4},
        // shadowRadius:3,
        // shadowOpacity:0.2
    },
    name:{
        textAlign:'center',
        fontSize:15
    },
    jobs:{
        textAlign:'center',
        fontSize:11

    },
    image:{
        width:100,
        height:80,
        maxHeight:50,
        resizeMode:'contain'
    }
})


export default Home;
