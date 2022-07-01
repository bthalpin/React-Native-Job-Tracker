import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,Button,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native';
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
                  <MyButton width="33%" color="#7b839c" onClick={()=>setHideArchived('')} text='View Archived'/>
                  :<MYButton width="33%" color="#7b839c" onClick={()=>setHideArchived('archived')} text='Hide Archived'/>}
                  
              <TextInput name="jobSearch" style={styles.input}  placeholder="Search your jobs" value={jobSearch} onChange={(e)=>setJobSearch(e.target.value)}></TextInput>
              <MyButton width="25%" color="#7b839c" onClick={()=>setJobSearch('')} text='Clear'/>

            </View>

            <ScrollView contentContainerStyle={styles.jobContainer} >
                
                {allJobs.filter(job=>job.title.toUpperCase().includes(jobSearch.toUpperCase())&&job.status!==hideArchived).map((job,index)=>{
                    return (
                        <TouchableOpacity style={styles.card} key={index} onPress={()=>navigation.navigate('SelectedJob',{
                          companyId:job.company._id,
                          jobId:job._id
                      })}>
                            <Text className="jobTitle">{job.title}</Text>
                            <Text>{job.contactInfo}</Text>
                            {job.createdAt?<Text>Created on {job.date}</Text>:<></>}
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
      </View>
  );
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      padding:5,
      // justifyContent:'center',
      backgroundColor:'#f0efef',

  },
  jobContainer:{
    marginTop:5,
    flex:5,
    flexGrow:1,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  buttonContainer:{
      flex:1,
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between',
      maxHeight:50
      // marginTop:10
  },
  name:{
      textAlign:'center'
  },
  image:{
      width:100,
      height:100,
      resizeMode:'contain',
      margin:'auto'
  },
  text:{
      textAlign:'center'
  },
  search:{
      flex:1,
      flexDirection:'row',
      flexWrap:'wrap',
      alignItems:'center'
  },
  input:{
      backgroundColor:'white',
      borderWidth:1,
      borderColor:'#4297A0',
      padding:10,
      width:'42%'
  },
  cardContainer:{
      flex:4,
      flexDirection:'row',
      justifyContent:'space-between',
      flexWrap:'wrap',
      // width:'100%'
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
      // borderBottomWidth:1,
      // shadowColor:'black',
      // shadowOffset:{width:0,height:4},
      // shadowRadius:3,
      // shadowOpacity:0.2
  },

})

export default AllJobs;
