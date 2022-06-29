import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,Button,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native';

import Auth from '../utils/auth';

function AllJobs() {
    const [allJobs,setAllJobs ] = useState([])
    const [jobSearch,setJobSearch] = useState('');
    const [hideArchived,setHideArchived] = useState('archived')
    
    useEffect(() => {
        getAllJobs();
    }, []);

    const getAllJobs = async () => {
      const token = await Auth.getToken();

        let jobURL = `http://localhost:3001/api/jobs/myjobs`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => setAllJobs(response));
    };

    
  return (
      <View>
            {hideArchived?
                <Button className="archiveBtn" onClick={()=>setHideArchived('')}>View Archived</Button>
                :<Button className="archiveBtn" onClick={()=>setHideArchived('archived')}>Hide Archived</Button>}
                
            <TextInput name="jobSearch" className="jobSearch"  placeholder="Search your jobs" value={jobSearch} onChange={(e)=>setJobSearch(e.target.value)}></TextInput>
            <Button className="clearJobSearch" onClick={()=>setJobSearch('')}>Clear</Button>

            <View className="allJobContainer" >
                
                {allJobs.filter(job=>job.title.toUpperCase().includes(jobSearch.toUpperCase())&&job.status!==hideArchived).map((job,index)=>{
                    return (
                        <View to={`/jobs/${job.company}/${job._id}`} className={`allJobCard ${job.status}`} key={index}>
                            <Text className="jobTitle">{job.title}</Text>
                            <Text>{job.contactInfo}</Text>
                            {job.createdAt?<Text>Created on {job.date}</Text>:<></>}
                        </View>
                    )
                })}

            </View>
      </View>
  );
}

export default AllJobs;
