import {View, Text,TextInput,Button,StyleSheet} from 'react-native';
import MyButton from './MyButton';

export default function JobForm({navigation,handleSubmit,buttonName,newJob,setNewJob}) {
    return (
        <View style={styles.container}>
               
            
               
                <TextInput style={styles.input} type="text" name="Job" placeholder="Job Title" value={newJob.title} onChangeText={(value)=>setNewJob({...newJob, title:value})}></TextInput>
                
                <TextInput style={styles.input} name="Description" placeholder="Description" value={newJob.description} onChangeText={(value)=>setNewJob({...newJob, description:value})}></TextInput>
                <TextInput style={styles.input} type="text" name="contact" placeholder="Contact Information" value={newJob.contactInfo} onChangeText={(value)=>setNewJob({...newJob, contactInfo:value})}></TextInput>
                <TextInput style={styles.input} type="text" name="link" placeholder="URL of job post" value={newJob.link} onChangeText={(value)=>setNewJob({...newJob, link:value})}></TextInput>
                 <TextInput style={styles.input} type="text" name="resume" placeholder="URL of resume" value={newJob.resumeLink} onChangeText={(value)=>setNewJob({...newJob, resumeLink:value})}></TextInput>
                <TextInput style={styles.input} type="text" name="cover" placeholder="URL of cover letter" value={newJob.coverLetterLink} onChangeText={(value)=>setNewJob({...newJob, coverLetterLink:value})}></TextInput>
                 <TextInput style={styles.input} name="notes" placeholder="Notes" value={newJob.notes} onChangeText={(value)=>setNewJob({...newJob, notes:value})}></TextInput>

                <View style={styles.buttonContainer}>
                    
                    <MyButton className="jobFormAddBtn" action={handleSubmit} text={buttonName}/>
                    <MyButton text='Cancel' action={()=>navigation.goBack()}/>
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
