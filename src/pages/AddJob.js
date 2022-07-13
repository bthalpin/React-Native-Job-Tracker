import React, {useState} from 'react';
import {View,StyleSheet} from 'react-native';
import JobForm from '../components/JobForm';
import Auth from '../utils/auth';

function AddJob({navigation,route}) {
    const {companyId} = route.params
    const [newJob,setNewJob] = useState({
        title:'',
        description:'',
        contactInfo:'',
        link:'',
        resumeLink:'',
        coverLetterLink:'',
        notes:'',
        status:'created',
        company:companyId
    })
  
    const addJob = async () =>{
        const user = await Auth.getProfile()
        const userId = user.data._id
        fetch(`https://job-tracker-bh.herokuapp.com/api/jobs/${companyId}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...newJob,userId:userId})

        }).then(response=>response.json())
        .then(job=>{
            setNewJob({
                title:'',
                description:'',
                contactInfo:'',
                link:'',
                resumeLink:'',
                coverLetterLink:'',
                notes:'',
                status:'created',
                company:companyId
            })
            navigation.goBack() 
        })
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
        e.preventDefault();
        addJob()
      };
    return (
        <View style={styles.container} >
            <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} buttonName='Add' navigation={navigation} checkURL={checkURL}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default AddJob;
