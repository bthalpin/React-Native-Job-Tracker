import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,StyleSheet,Linking} from 'react-native';
import MyButton from '../components/MyButton';
import Confirm from '../components/Confirm'
import { useIsFocused } from "@react-navigation/native";
import Auth from '../utils/auth';

function SelectedJob({route,navigation}) {
    const isFocused = useIsFocused()
    const {companyId,jobId} = route.params;
    const [confirm, setConfirm] = useState(false)
    const [job,setJob ] = useState()
    const [token,setToken] = useState('')
    const [newJob,setNewJob] = useState({
        title:'',
        description:'',
        contactInfo:'',
        link:'',
        resumeLink:'',
        coverLetterLink: '',
        notes:'',
        status:'created',
        company:companyId
    })

    const loadPage = async() => {
      const loadedToken = await Auth.getToken()
      setToken(loadedToken)
    }

    useEffect(() => {
        loadPage();
      }, [isFocused]);

    useEffect(() => {
        if (token){
          getJob();
        }
      }, [token,isFocused]);

    useEffect(()=>{
        if(newJob.title){
        let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/${companyId}/${jobId}`;
        fetch(jobURL,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newJob)

        })
          .then((res) => res.json())
          .then((response) => {
              
                setJob(response)
            });}
    },[newJob.status])
    
    const getJob = () => {
        let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/${companyId}/${jobId}`;
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => {
              setJob(response)
              setNewJob(response)
            });
    };
    
    const deleteJob = () => {
        let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            },
            method:'DELETE'
        })
          .then((res) => res.json())
          .then(() => {
              navigation.goBack()
            });
    }

    // const changeStatus = async (e) => {
    //     e.preventDefault()
    //     setJob({...newJob,status:e.target.value})
    //     setNewJob({...newJob,status:e.target.value})
    // }

    // const editJob = (updatedData) => {
    //     let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/${companyId}/${jobId}`;
        
    //     fetch(jobURL,{
    //         method:'PUT',
    //         headers:{
    //             'Content-Type': 'application/json'
    //         },
    //         body:JSON.stringify(updatedData||newJob)

    //     })
    //       .then((res) => res.json())
    //       .then((response) => {
    //             setJob(response)
    //             setEdit(false)
    //         });
    // }
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     editJob()
    // }

    return (
        <View style={styles.container} >
            <ScrollView >
                {confirm
                ?
                    <>  
                    <Confirm action={deleteJob} cancel={setConfirm} name={job.title}/>
                        
                    </>
                :
                    <>
                    <Text style={styles.title}>{job?.title}</Text>
                    <Text style={styles.text}>{job?.contactInfo}</Text>
               
                    {job?.link?
                        <Text style={styles.text} onPress={()=>Linking.openURL(job.link)}>{job?.title} - Job Post</Text>
                    :<></>}
                    <View>
                            {job?.resumeLink?
                                <Text style={styles.documents} onPress={()=>Linking.openURL(job.resumeLink)}>Resume</Text>
                                :<></>}
                            {job?.coverLetterLink?
                                <Text style={styles.documents} onPress={()=>Linking.openURL(job.coverLetterLink)}>Cover Letter</Text>
                            :<></>}

                    </View>
                    {job?.description?
                        <View style={styles.section}>
                            <Text>Description:</Text>
                            <Text>{job.description}</Text>
                        </View>
                    :<></>}
                    {job?.notes?
                        <View style={styles.section}>
                            <Text>Notes:</Text>
                            <Text>{job?.notes}</Text>
                        </View>
                    :<></>}
                
                    {/* <JobPostData setJobData={setJobData} /> */}
                
                    {/* <label htmlFor="status">Set status: </label>
                    <select name="status" value={newJob.status} onChange={changeStatus}>
                        <option value="created" >---</option>
                        <option value="applied">Applied</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                        <option value="archived">Archive</option>
                    </select> */}

                    <View style={styles.buttons}>
                        <MyButton color='#f56f76' action={()=>setConfirm(true)} text='Delete'/>
                        <MyButton color='#f56f76' action={()=>navigation.navigate('EditJob',{job:job})} text='Edit'/>
                    </View>
                
                    </>
            
                }
               
            </ScrollView>

        </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        backgroundColor:'#f0efef',

    },
    section:{
        borderWidth:1,
        borderColor:'#4297A0',
        padding:5,
    },
    buttons:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        padding:10
    },
    title:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold',
        padding:10

    },
    text:{
        textAlign:'center',
        paddingBottom:10

    },
    documents:{
        textAlign:'center',
        paddingBottom:10,
        color:'blue'
    }

})

export default SelectedJob;
