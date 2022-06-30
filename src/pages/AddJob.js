import React, {useState,useEffect} from 'react';
import JobForm from '../components/JobForm';
import Auth from '../utils/auth';

function AddJob({navigation,route}) {
    const {companyId} = route.params
    const [show,setShow] = useState('')
    const [jobData,setJobData] = useState([])
    const [newJob,setNewJob] = useState({
        title:'',
        description:'',
        contactInfo:'',
        link:'',
        notes:'',
        status:'created',
        company:companyId
    })
    useEffect (()=>{
        if(jobData?.description?.length){

            setNewJob({...newJob,description:`-${jobData.description.join('\n-')}`,link:jobData.URL,title:jobData.title})
        }
    },[jobData,newJob])
  
    const addJob = async () =>{
        const user = await Auth.getProfile()
        const userId = user.data._id
        fetch(`http://localhost:3001/api/jobs/${companyId}`,{
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
                notes:'',
                status:'created',
                company:companyId
            })

            navigation.goBack()
            
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addJob()
      };
  return (
    <div className="AddJobContainer" >
        <JobForm newJob={newJob} setNewJob={setNewJob} handleSubmit={handleSubmit} buttonName='Add' />
        {/* <JobPostData setJobData={setJobData}/> */}
       
        {/* <Confirm show={show} setShow={setShow} callBack={addJob} action="create" name={newJob.title} type="job"/> */}

    </div>
  );
}

export default AddJob;
