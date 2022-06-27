import React, { useState, useEffect } from 'react';
import {ScrollView,View,Text,Button,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native';

// import {Link} from 'react-router-dom';
// import {ConfirmModal,CompanyForm} from '../../components/';
import Auth from '../utils/auth';

function Home() {
    // const token = await Auth.getToken();
    const [show,setShow] = useState('')
    const [add,setAdd] = useState(false)
    const [search,setSearch] = useState('');
    // const [order,setOrder] = useState('Ascending');
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })
    const [allCompanies,setAllCompanies ] = useState([])
    const loadCompanies = async () => {
        const token = await Auth.getToken();
        getCompanies(token)
    }
    useEffect(() => {
        loadCompanies();
      }, []);
    
    const getCompanies = (token) => {
        console.log(token)
        let companyURL = `http://localhost:3001/api/company/`;
        
        fetch(companyURL,{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((response) => setAllCompanies(response));
    };
  
    const addCompany = () => {
        fetch('http://localhost:3001/api/company',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...newCompany,userId:Auth.getProfile().data._id})

        }).then(response=>response.json())
        .then(company=>{
            getCompanies()
            setNewCompany({
                name:'',
                address:'',
                phone:'',
                website:'',
                logo:'',
            })
            setAdd(false)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCompany.name.trim()){
            return
        }
        setShow('show')
    };
    return (
        <View className="page">    
            <TextInput name="search" className="search" placeholder="Filter Your Companies" value={search} onChange={(e)=>setSearch(e.target.value)}></TextInput>
            <Button className="clearSearch" onClick={()=>setSearch('')}>Clear</Button>

            {allCompanies.length?<></>
            :<View>
                <Text><span className="welcome">Welcome to JobTracker!</span> To begin, start by adding a company that you are applying to.  Once the company is created you can then add inViewidual jobs and mark the jobs once you apply, get an offer, or are rejected.</Text>
            </View>}

            {add?
                <View className="addCompanyContainer" >
                   
                </View>
            :
                <View className="addContainer">
                    <Button className="addCompany" onClick={()=>setAdd(true)}>Add Company</Button>
                </View>
            }
            <ScrollView className="homeContainer" >
                {allCompanies.filter(company=>company.name.toUpperCase().includes(search.toUpperCase())).map((company,index)=>{
                    return (
                        <View className="homeCard" key={index}>
                        
                         
                                <View className="cardContent">
                                    <View className="imageContainer">
                                        <Image src={company.logo||'/images/default.png'} alt="Company logo"></Image>
                                    </View>
                                    <View>
                                        <Text>{company.name}</Text>
                                        <Text>{company.jobs.length} {company.jobs.length===1?'Job':'Jobs'} - Applied {company.jobs.filter(job=>job.status!=='created').length}</Text>
                                    </View>

                                </View>
                           
                        </View>
                    )
                })}

            </ScrollView>
        </View>
  );
}

export default Home;
