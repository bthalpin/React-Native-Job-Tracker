import React, {useState,useEffect} from 'react';
import {View,StyleSheet} from 'react-native';
import JobForm from '../components/JobForm';
import Auth from '../utils/auth';

function EditJob({navigation,route}) {
    const {job} = route.params
    const [show,setShow] = useState('')
    const [jobData,setJobData] = useState([])
    const [newJob,setNewJob] = useState(job)
    const editJob = () => {
        let jobURL = `https://job-tracker-bh.herokuapp.com/api/jobs/${job.company._id}/${job._id}`;
        
        fetch(jobURL,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newJob)

        })
          .then((res) => res.json())
          .then((response) => {
                navigation.goBack()
            });
    }

    const checkURL = (value,property) => {
        const currentLength = value.length
        if (!value.startsWith('http'.slice(0,currentLength))&&value!==''){
            value = 'https://' + value;
        }
        switch (property) {
            case 'link':
                setNewJob({...newJob,link:value})
                break
            case 'resumeLink':
                setNewJob({...newJob,resumeLink:value})
                break
            case 'coverLetterLink':
                setNewJob({...newJob,coverLetterLink:value})
                break
            default:
                setNewJob({...newJob,link:value})
                break

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editJob()
    }
  return (
    <View style={styles.container} >
        <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} buttonName='Update' navigation={navigation} checkURL={checkURL}/>
        {/* <JobPostData setJobData={setJobData}/> */}
       
        {/* <Confirm show={show} setShow={setShow} callBack={addJob} action="create" name={newJob.title} type="job"/> */}

    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
export default EditJob;