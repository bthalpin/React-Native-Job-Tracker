import React, {useState} from 'react';
import {View,StyleSheet} from 'react-native';
import CompanyForm from '../components/CompanyForm';
import Auth from '../utils/auth';

function AddCompany({navigation}) {
    const [newCompany,setNewCompany] = useState({
        name:'',
        address:'',
        phone:'',
        website:'',
        logo:'',
    })

    const addCompany = async () => {
        const userId = await Auth.getProfile()
        fetch('https://job-tracker-bh.herokuapp.com/api/company',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...newCompany,userId:userId.data._id})

        }).then(response=>response.json())
        .then(company=>{
            setNewCompany({
                name:'',
                address:'',
                phone:'',
                website:'',
                logo:'',
            })
            navigation.navigate('Home')
        })
    }

    const checkURL = (value) => {
        const currentLength = value.length
        if (!value.startsWith('http'.slice(0,currentLength))&&value!==''){
            value = 'https://' + value;
        }
        setNewCompany({...newCompany,website:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCompany.name.trim()===''){
            return
        }
        addCompany()
    };

    return (
        <View style={styles.container} >
            <CompanyForm company={newCompany} setCompany={setNewCompany} handleSubmit={handleSubmit} action='Add' navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default AddCompany;
