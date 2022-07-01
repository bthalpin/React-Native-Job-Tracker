import {View, Text,TextInput,Button} from 'react-native';

export default function CompanyForm({navigation,setCompany,company,action,handleSubmit,checkURL}) {
    console.log(setCompany,company,handleSubmit,action)
    return (
        <View>
               
            
                        
                        <TextInput type="text" name="company" placeholder="Company name" value={company.name} onChangeText={(value)=>setCompany({...company, name:value})}></TextInput>
                        
                        <TextInput type="text" name="address" placeholder="Address" value={company.address} onChangeText={(value)=>setCompany({...company, address:value})}></TextInput>
                        
                        <TextInput type="text" name="phone" placeholder="Phone" value={company.phone} onChangeText={(value)=>setCompany({...company, phone:value})}></TextInput>
                    
                        <TextInput type="text" name="website" placeholder="Website" value={company.website} onChangeText={(value)=>checkURL(value)}></TextInput>
                        
                        <TextInput type="text" name="logo" placeholder="Logo" value={company.logo} onChangeText={(value)=>setCompany({...company, logo:value})}></TextInput>
                        <View className="companyFormBtn">
                            <Button className='cancelButton' onPress={()=>navigation.goBack()} title='Cancel'/>
                            <Button className="addButton" onPress={handleSubmit} title={action}/>

                        </View>
                
               
            </View>
        
    );
}