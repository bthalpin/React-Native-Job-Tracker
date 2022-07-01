import {View, Text,TextInput,Button,StyleSheet} from 'react-native';
import MyButton from './MyButton';

export default function CompanyForm({navigation,setCompany,company,action,handleSubmit,checkURL}) {
    console.log(setCompany,company,handleSubmit,action)
    return (
        <View style={styles.container}> 
               
            
                        
                        <TextInput style={styles.input} type="text" name="company" placeholder="Company name" value={company.name} onChangeText={(value)=>setCompany({...company, name:value})}></TextInput>
                        
                        <TextInput style={styles.input} type="text" name="address" placeholder="Address" value={company.address} onChangeText={(value)=>setCompany({...company, address:value})}></TextInput>
                        
                        <TextInput style={styles.input} type="text" name="phone" placeholder="Phone" value={company.phone} onChangeText={(value)=>setCompany({...company, phone:value})}></TextInput>
                    
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
        // justifyContent:'center',
        backgroundColor:'#f0efef',

    },
    company:{
        flex:4,
        borderWidth:1,
        borderColor:'#4297A0',
        padding:5,
        justifyContent:'center',
        maxHeight:'50%'
    },
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        maxHeight:50,
        marginTop:10
    },
    name:{
        textAlign:'center'
    },
    image:{
        width:100,
        height:100,
        resizeMode:'contain',
        margin:'auto'
    },
    text:{
        textAlign:'center'
    },
    search:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center'
    },
    input:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#4297A0',
        padding:10
    },
    cardContainer:{
        flex:4,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        // width:'100%'
    },
    card:{
        marginBottom:10,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#4297A0',
        borderWidth:1,
        width:'49%',
        maxHeight:100
        // borderBottomWidth:1,
        // shadowColor:'black',
        // shadowOffset:{width:0,height:4},
        // shadowRadius:3,
        // shadowOpacity:0.2
    },

})
