import React, { useState, useEffect } from 'react';
import { View,Text,Button,Image } from 'react-native';
import Confirm from '../components/Confirm'
import { useIsFocused } from "@react-navigation/native";
import Auth from '../utils/auth';
import { TouchableOpacity } from 'react-native-web';

export default function Company({route,navigation}) {
    const isFocused = useIsFocused()
    const {companyId,action} = route.params;
    // console.log(action)
    const [token,setToken] = useState('')
    const [show,setShow] = useState('')
    const [confirm,setConfirm] = useState(false)
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
        }, [isFocused]);
    
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
            .then((response) => navigation.navigate('Home'))
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
            {confirm?
                <Confirm action={deleteCompany} cancel={setConfirm} name={company.name}/>
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
                        <Button className="companyEdit" onPress={()=>navigation.navigate('EditCompany',{company:company})} title='Edit'>Edit</Button>
                        <Button className="delete" onPress={()=>setConfirm(true)} title='Delete'>Delete</Button>
                    </View>
                </View>
            }
            <View className="addJobContainer">

                <Button className="addJobBtn"  title='Add Job' onPress={()=>navigation.navigate('AddJob',{companyId:company._id})} >Add Job</Button>
            </View>
            {company?.jobs?.length?
                <>
                {hideArchived?
                    <Button className="archiveButton" onPress={()=>setHideArchived('')} title='View Archived'></Button>
                    :
                    <Button className="archiveButton" onPress={()=>setHideArchived('archived')} title='Hide Archived'></Button>
                }
                <input name="jobSearch" className="jobSearch"  placeholder={`Filter ${company.name} jobs`} value={jobSearch} onChange={(e)=>setJobSearch(e.target.value)}></input>
                <Button color='black' className="clearJobSearch" onPress={()=>setJobSearch('')} title='Clear'>Clear</Button>
                <View className="companyJobContainer" >
                                
                    {allJobs.filter(job=>job.title.toUpperCase().includes(jobSearch.toUpperCase())&&job.status!==hideArchived).map((job,index)=>{
                        return (
                            <TouchableOpacity onPress={()=>navigation.navigate('SelectedJob',{
                                companyId:companyId,
                                jobId:job._id
                            })} key={index}>
                                <Text className="jobTitle">{job.title}</Text>
                                <Text>{job.contactInfo}</Text>
                                {job.createdAt?<Text>Created on {job.date}</Text>:<></>}
                            </TouchableOpacity>
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