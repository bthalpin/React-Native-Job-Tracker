import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import MyButton from '../components/MyButton';
import Auth from '../utils/auth';

function AllJobs({navigation}) {
    const [allJobs,setAllJobs ] = useState([])
    const [jobSearch,setJobSearch] = useState('');
    const [hideArchived,setHideArchived] = useState('archived')
    
    useEffect(() => {
        getAllJobs();
    }, []);

    const getAllJobs = async () => {
      const token = await Auth.getToken();

        let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/myjobs`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => setAllJobs(response));
    };

    
    return (
        <View style={styles.container}>
            <View style={styles.search}>
                {hideArchived?
                    <MyButton width="33%" color="#7b839c" action={()=>setHideArchived('')} text='View Archived'/>
                    :<MyButton width="33%" color="#7b839c" action={()=>setHideArchived('archived')} text='Hide Archived'/>
                }
                <TextInput name="jobSearch" style={styles.input}  placeholder="Search your jobs" value={jobSearch} onChangeText={setJobSearch}></TextInput>
                <MyButton width="17%" color="#7b839c" action={()=>setJobSearch('')} text='Clear'/>
                  
            </View>

            <View style={styles.jobContainer}>
                <ScrollView contentContainerStyle={styles.jobs} >
                    
                    {allJobs.filter(job=>job.title.toUpperCase().includes(jobSearch.toUpperCase())&&job.status!==hideArchived).map((job,index)=>{
                        return (
                            <TouchableOpacity style={styles.card} key={index} onPress={()=>navigation.navigate('SelectedJob',{
                            companyId:job.company._id,
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
      </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        backgroundColor:'#f0efef',

    },
    jobContainer:{
        marginTop:5,
        flex:5,
        flexWrap:'wrap',
    },
    jobs:{
        flexGrow:1,
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-between'
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
        padding:5,
        width:'42%'
    },
    card:{
        marginBottom:10,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#4297A0',
        borderWidth:1,
        width:'49%',
        maxHeight:100
    },

})

export default AllJobs;
