import React, {useEffect, useState} from 'react';
import {View,StyleSheet} from 'react-native';
import CompanyForm from '../components/CompanyForm';

function EditCompany({route,navigation}) {
    const {company} = route.params
    useEffect(()=>{
        setNewCompany(company)
    },[])
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })

    const checkURL = (value) => {
        const currentLength = value.length
        if (!value.startsWith('http'.slice(0,currentLength))&&value!==''){
            value = 'https://' + value;
        }
        setNewCompany({...newCompany,website:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCompany.name){
            return
        }
        fetch(`https://job-tracker-bh.herokuapp.com/api/company/${newCompany._id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            
            body:JSON.stringify(newCompany)

        }).then(response=>response.json())
        .then(company=>{
            navigation.goBack()
        })
    };

  return (
    <View style={styles.container} >
        <CompanyForm company={newCompany} setCompany={setNewCompany} handleSubmit={handleSubmit} action='Update' navigation={navigation} checkURL={checkURL} />
      
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
export default EditCompany;
