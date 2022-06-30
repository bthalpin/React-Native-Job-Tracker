import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,Button,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
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
        let companyURL = `http://localhost:3001/api/company/`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => setAllCompanies(response));
    };
  
    const addCompany = () => {
        fetch('http://localhost:3001/api/company',{
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
        <View >    
            <TextInput name="search"  placeholder="Filter Your Companies" value={search} onChangeText={(value)=>setSearch(value)}></TextInput>
            <Button  onPress={()=>setSearch('')} title='Clear'/>

            {allCompanies.length?<></>
            :<View>
                <Text><span >Welcome to JobTracker!</span> To begin, start by adding a company that you are applying to.  Once the company is created you can then add inViewidual jobs and mark the jobs once you apply, get an offer, or are rejected.</Text>
            </View>}

            {add?
                <View  >
                   
                </View>
            :
                <View>
                    <Button  onPress={()=>navigation.navigate('AddCompany')} title='Add Company'/>
                    <Button  onPress={()=>navigation.navigate('AllJobs')} title='View All Jobs'/>
                </View>
            }
            <View>

                <ScrollView  showsVerticalScrollIndicator={false}>
                    {allCompanies.filter(company=>company.name.toUpperCase().includes(search.toUpperCase())).map((company,index)=>{
                        return (
                            <View   key={index}>
                                {/* {console.log(company._id)} */}
                            
                                    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Company',{companyId:company._id})} >
                                        <View >
                                            <Image src={company.logo||'/images/default.png'} alt="Company logo"></Image>
                                        </View>
                                        <View>
                                            <Text>{company.name}</Text>
                                            <Text>{company.jobs.length} {company.jobs.length===1?'Job':'Jobs'} - Applied {company.jobs.filter(job=>job.status!=='created').length}</Text>
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
    navigation:{
      backgroundColor:'#2F5061'
    },
    container: {
      flex: 1,
      // backgroundColor: '#2b2b2b',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    card:{
        marginBottom:10,
        padding:20,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderTopWidth:1,
        borderBottomWidth:1,
        shadowColor:'black',
        shadowOffset:{width:0,height:4},
        shadowRadius:3,
        shadowOpacity:0.2
    }
})


export default Home;
