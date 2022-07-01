import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,Button,TextInput,Image,StyleSheet,Linking} from 'react-native';
import MyButton from '../components/MyButton';
import Confirm from '../components/Confirm'
import { useIsFocused } from "@react-navigation/native";
// import {ConfirmModal,JobForm,JobPostData} from '../../components/';
import Auth from '../utils/auth';

function SelectedJob({route,navigation}) {
    const isFocused = useIsFocused()
    const {companyId,jobId} = route.params;
    const [confirm, setConfirm] = useState(false)
    const [show,setShow] = useState('')
    const [job,setJob ] = useState()
    const [jobData,setJobData] = useState({})
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
    const [edit,setEdit] = useState(false)

    const loadPage = async() => {
      const loadedToken = await Auth.getToken()
      setToken(loadedToken)
    }
    useEffect (()=>{
        if(jobData?.description?.length){
            if (jobData.title){
                setNewJob({...job,title:jobData.title,description:`-${jobData.description.join('\n-')}`,link:jobData.URL})
                editJob({...job,title:jobData.title,description:`-${jobData.description.join('\n-')}`,link:jobData.URL})
            }else{
                setNewJob({...job,description:`-${jobData.description.join('\n-')}`,link:jobData.URL})
                editJob({...job,description:`-${jobData.description.join('\n-')}`,link:jobData.URL})

            }
        }
    },[jobData])
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
      console.log(token,'token')
        let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/${companyId}/${jobId}`;
        console.log('here')
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
    const changeStatus = async (e) => {
        e.preventDefault()
        setJob({...newJob,status:e.target.value})
        setNewJob({...newJob,status:e.target.value})
    }

    const editJob = (updatedData) => {
        let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/${companyId}/${jobId}`;
        
        fetch(jobURL,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updatedData||newJob)

        })
          .then((res) => res.json())
          .then((response) => {
                setJob(response)
                setEdit(false)
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        editJob()
    }
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
               
                        {/* <View>
                            <Link to={`/company/${job?.company?._id}`}>{job?.company?.name}</Link>
                        </View> */}
                        {job?.link?
                        <Text style={styles.text} onPress={()=>Linking.openURL(job.link)}>{job?.title} - Job Post</Text>
                        :<></>}
                        <View className="resumeContainer">
                            {/* {job?.resumeLink?
                                <a href={job.resumeLink}>Resume</a>
                            :<></>}
                            {job?.coverLetterLink?
                                <a href={job.coverLetterLink}>Cover Letter</a>
                            :<></>} */}

                        </View>
                        {job?.description?
                            <View style={styles.section}>
                                <Text>Description:</Text>
                                <Text className="description">{job.description}</Text>
                            </View>
                        :<></>}
                        {job?.notes?
                            <View style={styles.section}>
                                <Text>Notes:</Text>
                                <Text className="notes">{job?.notes}</Text>
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
                {/* <ConfirmModal show={show} setShow={setShow} callBack={deleteJob} action="delete" name={newJob.title} type="job"/> */}
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
  section:{
    borderWidth:1,
    borderColor:'#4297A0',
    padding:5,
  },
  company:{
      flex:4,
      borderWidth:1,
      borderColor:'#4297A0',
      padding:5,
      justifyContent:'center',
      maxHeight:'50%'
  },
  buttons:{
      flex:1,
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between',
      // maxHeight:50,
      padding:10
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
      padding:10
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

export default SelectedJob;
