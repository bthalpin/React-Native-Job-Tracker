import React, { useState, useEffect } from 'react';
import { View,Text,TextInput,Image,StyleSheet,Linking,ScrollView,TouchableOpacity} from 'react-native';
import Confirm from '../components/Confirm'
import MyButton from '../components/MyButton';
import { useIsFocused } from "@react-navigation/native";
import Auth from '../utils/auth';

export default function Company({route,navigation}) {
    const isFocused = useIsFocused()
    const {companyId} = route.params;
    const [token,setToken] = useState('')
    const [confirm,setConfirm] = useState(false)
    const [edit,setEdit] = useState(false)
    const [allJobs,setAllJobs ] = useState([])
    const [company,setCompany ] = useState({})
    const [hideArchived,setHideArchived] = useState('archived')
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const [jobSearch,setJobSearch] = useState('');
    const loadPage = async () => {
        const token = await Auth.getToken()
        setToken(token)
        getCompany(token)
        getJobs(token)
    }
    useEffect(() => {
        loadPage()
    }, [isFocused]);
    
    const getCompany = (token) => {
        let companyURL = `https://job-tracker-bh.herokuapp.com/api/company/${companyId}`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((response) => {
                setNewCompany(response)
                setCompany(response)});
    };

    const getJobs = (token) => {
        let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/${companyId}`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((response) => setAllJobs(response));
    };

    const deleteCompany = () => {
        let companyURL = `https://job-tracker-bh.herokuapp.com/api/company/${companyId}`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            },
            method:'DELETE'
        })
            .then((res) => res.json())
            .then((response) => navigation.navigate('Home'))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCompany.name){
            return
        }
        fetch(`https://job-tracker-bh.herokuapp.com/api/company/${companyId}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            
            body:JSON.stringify(newCompany)

        }).then(response=>response.json())
        .then(company=>{
            setCompany(company)
            setNewCompany(company)
            setEdit(false)
        })
    };

    return (
        <View style={styles.container}>
            {confirm?
                <Confirm action={deleteCompany} cancel={setConfirm} name={company.name}/>
            :
                <View style={styles.company}>
                    <Text style={styles.text}>{company.name}</Text>
                    <Image style={styles.image}  source={company.logo?{uri:company.logo}:require('../images/logo512.png')} alt="logo"></Image>
                    
                    {company?.address?
                        <Text style={styles.text} onPress={()=>Linking.openURL(`https://google.com/maps/place/${company?.address?.split(' ').join('+')}`)}>{company.address}</Text>
                    :<></>}

                    {company?.phone?
                        <Text style={styles.text} onPress={()=>Linking.openURL(`tel:${company.phone}`)}>
                            {company.phone}
                        </Text>
                    :<></>}

                    {company?.website?
                        <Text style={styles.text} onPress={()=>Linking.openURL(company.website)}>{company.name} Website</Text>
                    :<></>}
                    <View style={styles.buttonContainer}>
                        <MyButton color='#f56f76' action={()=>navigation.navigate('EditCompany',{company:company})} text='Edit' />
                        <MyButton color='#f56f76' action={()=>setConfirm(true)} text='Delete' />
                    </View>
                </View>
            }

            <View style={styles.buttonContainer}>
                <MyButton color='#f56f76'  text='Add Job' action={()=>navigation.navigate('AddJob',{companyId:company._id})} />
            </View>

            <View style={styles.jobContainer}>

                {company?.jobs?.length?
                    <>
                    <View style={styles.search}>
                        {hideArchived?
                            <MyButton font={10} width='33%' color="#7b839c" action={()=>setHideArchived('')} text='View Archived' />
                            :
                            <MyButton width='33%' color="#7b839c" action={()=>setHideArchived('archived')} text='Hide Archived' />
                        }
                        <TextInput name="jobSearch" style={styles.input}  placeholder={`Filter ${company.name} jobs`} value={jobSearch} onChangeText={setJobSearch}></TextInput>
                        <MyButton width='17%' color='#7b839c' action={()=>setJobSearch('')} text='Clear' />

                    </View>

                    <View style={styles.jobContainer}>

                        <ScrollView contentContainerStyle={styles.jobs} >
                                
                            {allJobs.filter(job=>job.title.toUpperCase().includes(jobSearch.toUpperCase())&&job.status!==hideArchived).map((job,index)=>{
                                return (
                                    

                                    <TouchableOpacity key={index} style={styles.card} onPress={()=>navigation.navigate('SelectedJob',{
                                        companyId:companyId,
                                        jobId:job._id
                                    })}>
                                        <Text >{job.title}</Text>
                                        <Text>{job.contactInfo}</Text>
                                        {job.createdAt?<Text>Created on {job.date}</Text>:<></>}
                                    </TouchableOpacity>
                                
                            )
                            })}
                        </ScrollView>
                    </View>

                    </>
                :
                    <View>
                        <Text>You currently do not have any jobs for {company.name}, press the add job Button to track your first job.</Text>
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        backgroundColor:'#f0efef',

    },
    company:{
        flex:4,
        borderWidth:1,
        borderColor:'#4297A0',
        padding:5,
        justifyContent:'center',
        maxHeight:'50%'
    },
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        maxHeight:50,
        marginTop:10
    },
    jobContainer:{
        marginTop:10,
        flex:6,
        flexWrap:'wrap'
    },
    jobs:{
        flexGrow:1,
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image:{
        flex:1,
        alignSelf:'center',
        width:100,
        height:100,
        resizeMode:'contain',
        margin:'auto'
    },
    text:{
        textAlign:'center'
    },
    search:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center'
    },
    input:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#4297A0',
        padding:5
    },
    card:{
        marginBottom:10,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#4297A0',
        borderWidth:1,
        minWidth:'49%',
        width:'49%',
    },

})
