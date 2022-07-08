import {View, TextInput,StyleSheet} from 'react-native';
import MyButton from './MyButton';

export default function CompanyForm({navigation,setCompany,company,action,handleSubmit,checkURL}) {
    return (
        <View style={styles.container}> 
                        
                        <TextInput style={styles.input} type="text" name="company" placeholder="Company name" value={company.name} onChangeText={(value)=>setCompany({...company, name:value})}></TextInput>
                        
                        <TextInput style={styles.input} type="text" name="address" placeholder="Address" value={company.address} onChangeText={(value)=>setCompany({...company, address:value})}></TextInput>
                        
                        <TextInput keyboardType='numeric' style={styles.input} type="text" name="phone" placeholder="Phone" value={company.phone} onChangeText={(value)=>setCompany({...company, phone:value})}></TextInput>
                    
                        <TextInput style={styles.input} type="text" name="website" placeholder="Website" value={company.website} onChangeText={(value)=>checkURL(value)}></TextInput>
                        
                        <TextInput style={styles.input} type="text" name="logo" placeholder="Logo" value={company.logo} onChangeText={(value)=>setCompany({...company, logo:value})}></TextInput>
                        <View style={styles.buttonContainer}>
                            <MyButton action={handleSubmit} text={action}/>
                            <MyButton action={()=>navigation.goBack()} text='Cancel'/>
                        </View>
                
               
            </View>
        
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        backgroundColor:'#f0efef',

    },
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        maxHeight:50,
        marginTop:10
    },
    input:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#4297A0',
        padding:10
    }

})
