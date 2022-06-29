import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,Button,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native';

// import {ConfirmModal,JobForm,JobPostData} from '../../components/';
import Auth from '../utils/auth';

function SelectedJob({route,navigation}) {
    const {companyId,jobId} = route.params;

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
      }, []);
    useEffect(() => {
        if (token){
          getJob();

        }
      }, [token]);
    useEffect(()=>{
        if(newJob.title){
        let jobURL = `http://localhost:3001/api/jobs/${companyId}/${jobId}`;
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
        let jobURL = `http://localhost:3001/api/jobs/${companyId}/${jobId}`;
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
        let jobURL = `http://localhost:3001/api/jobs/${companyId}/${jobId}`;
        
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
        let jobURL = `http://localhost:3001/api/jobs/${companyId}/${jobId}`;
        
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
        <View className={`${job?.status}job jobPage`} >
            <View className={`jobContainer`}>
                {edit
                ?
                    <>  
                        {/* <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} setEdit={setEdit} ButtonName='Save' /> */}

                        
                    </>
                :
                    <>
                        <Text>{job?.title}</Text>
                        <Text>{job?.contactInfo}</Text>
               
                        {/* <View>
                            <Link to={`/company/${job?.company?._id}`}>{job?.company?.name}</Link>
                        </View> */}
                        {/* <a href={job?.link}>{job?.title} - Job Post</a> */}
                        <View className="resumeContainer">
                            {/* {job?.resumeLink?
                                <a href={job.resumeLink}>Resume</a>
                            :<></>}
                            {job?.coverLetterLink?
                                <a href={job.coverLetterLink}>Cover Letter</a>
                            :<></>} */}

                        </View>
                        {job?.description?
                            <>
                                <Text>Description:</Text>
                                <Text className="description">{job.description}</Text>
                            </>
                        :<></>}
                        {job?.notes?
                            <>
                                <Text>Notes:</Text>
                                <Text className="notes">{job?.notes}</Text>
                            </>
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

                        <View className="jobButtonContainer">
                            <Button className="jobButton deleteJob" onPress={()=>deleteJob()}>Delete</Button>
                            <Button className="jobButton" onPress={()=>setEdit(true)}>Edit</Button>
                        </View>
                
                    </>
            
                }
                {/* <ConfirmModal show={show} setShow={setShow} callBack={deleteJob} action="delete" name={newJob.title} type="job"/> */}
            </View>

        </View>
  );
}

export default SelectedJob;
