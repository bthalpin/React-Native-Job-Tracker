import React, { useState, useEffect } from 'react';
import { View,Text,Button,Image } from 'react-native';
import Auth from '../utils/auth';

export default function Company({route}) {
    const {companyId} = route.params;
    const [token,setToken] = useState('')
    const [show,setShow] = useState('')
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
    // const token = await Auth.getToken();
    const loadPage = async () => {
        const token = await Auth.getToken()
        setToken(token)
        getCompany(token)
        getJobs(token)
    }
    useEffect(() => {
        loadPage()
        }, []);
    
    const getCompany = (token) => {
        let companyURL = `http://localhost:3001/api/company/${companyId}`;
        
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
        let jobURL = `http://localhost:3001/api/jobs/${companyId}`;
        
        fetch(jobURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((response) => setAllJobs(response));
        };
    const deleteCompany = () => {
        let companyURL = `http://localhost:3001/api/company/${companyId}`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            },
            method:'DELETE'
        })
            .then((res) => res.json())
            .then((response) => navigate('/home/'))
        };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCompany.name){
            return
        }
        fetch(`http://localhost:3001/api/company/${companyId}`,{
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
        <View>
            {edit?
                <View className='addCompanyContainer'>
                    {/* <CompanyForm setEdit={setEdit} newCompany={newCompany} setNewCompany={setNewCompany} handleSubmit={handleSubmit} ButtonName='Save' /> */}
                </View>
            :
                <View className="companyContainer">
                    <Text>{company.name}</Text>
                    <Image className="companyLogo" source={company.logo||'/images/default.png'} alt="logo"></Image>
                    <Text>
                        <Text href={`https://google.com/maps/place/${company?.address?.split(' ').join('+')}`}>{company.address}</Text>
                    </Text>
                    <Text>
                        {company.phone}
                    </Text>
                    <Text href={company.website}>{company.name}</Text>
                    <View className="companyBtnContainer">
                        <Button className="companyEdit" onClick={()=>setEdit(true)}>Edit</Button>
                        <Button className="delete" onClick={()=>setShow('show')}>Delete</Button>
                    </View>
                </View>
            }
            <View className="addJobContainer">

                <Button className="addJobBtn" to={`/company/add/${companyId}`} >Add Job</Button>
            </View>
            {company?.jobs?.length?
                <>
                {hideArchived?
                    <Button className="archiveButton" onClick={()=>setHideArchived('')}>View Archived</Button>
                    :
                    <Button className="archiveButton" onClick={()=>setHideArchived('archived')}>Hide Archived</Button>
                }
                <input name="jobSearch" className="jobSearch"  placeholder={`Filter ${company.name} jobs`} value={jobSearch} onChange={(e)=>setJobSearch(e.target.value)}></input>
                <Button className="clearJobSearch" onClick={()=>setJobSearch('')}>Clear</Button>
                <View className="companyJobContainer" >
                                
                    {allJobs.filter(job=>job.title.toUpperCase().includes(jobSearch.toUpperCase())&&job.status!==hideArchived).map((job,index)=>{
                        return (
                            <View to={`/jobs/${companyId}/${job._id}`} className={`companyCard ${job.status}`} key={index}>
                                <Text className="jobTitle">{job.title}</Text>
                                <Text>{job.contactInfo}</Text>
                                {job.createdAt?<Text>Created on {job.date}</Text>:<></>}
                            </View>
                    )
                    })}

                </View>
                </>
            :
                <View>
                    <Text className="noJobs">You currently do not have any jobs for {company.name}, press the add job Button to track your first job.</Text>
                </View>}
            {/* <ConfirmModal show={show} setShow={setShow} callBack={deleteCompany} action="delete" name={company.name} type="company"/> */}

        </View>
    );
}