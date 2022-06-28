import React, {useState} from 'react';
import {View, Text,TextInput,Button} from 'react-native';
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
        console.log(userId)
        fetch('http://localhost:3001/api/company',{
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
        // setShow('show')
        addCompany()
      };
  return (
    <View className="addCompanyContainer" >
        {/* <CompanyForm newCompany={newCompany} setNewCompany={setNewCompany} handleSubmit={handleSubmit} buttonName='Add' /> */}
      
                
                <TextInput type="text" name="company" placeholder="Company name" value={newCompany.name} onChangeText={(value)=>setNewCompany({...newCompany, name:value})}></TextInput>
                
                <TextInput type="text" name="address" placeholder="Address" value={newCompany.address} onChangeText={(value)=>setNewCompany({...newCompany, address:value})}></TextInput>
                
                <TextInput type="text" name="phone" placeholder="Phone" value={newCompany.phone} onChangeText={(value)=>setNewCompany({...newCompany, phone:value})}></TextInput>
               
                <TextInput type="text" name="website" placeholder="Website" value={newCompany.website} onChangeText={(value)=>checkURL(value)}></TextInput>
                
                <TextInput type="text" name="logo" placeholder="Logo" value={newCompany.logo} onChangeText={(value)=>setNewCompany({...newCompany, logo:value})}></TextInput>
                <View className="companyFormBtn">
                    <Button className='cancelButton' onPress={()=>navigation.navigate('Home')} title='Cancel'/>
                    <Button className="addButton" onPress={handleSubmit} title='Add'/>

                </View>
           
        {/* <ConfirmModal show={show} setShow={setShow} callBack={addCompany} action="create" name={newCompany.name}/> */}
    </View>
  );
}

export default AddCompany;
