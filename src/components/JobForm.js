import {View,TextInput,StyleSheet} from 'react-native';
import MyButton from './MyButton';

export default function JobForm({navigation,handleSubmit,buttonName,newJob,setNewJob,checkURL}) {
    return (
        <View style={styles.container}>
               
                <TextInput style={styles.input} type="text" name="Job" placeholder="Job Title" value={newJob.title} onChangeText={(value)=>setNewJob({...newJob, title:value})}></TextInput>
                <TextInput style={styles.input} name="Description" placeholder="Description" value={newJob.description} onChangeText={(value)=>setNewJob({...newJob, description:value})}></TextInput>
                <TextInput style={styles.input} type="text" name="contact" placeholder="Contact Information" value={newJob.contactInfo} onChangeText={(value)=>setNewJob({...newJob, contactInfo:value})}></TextInput>
                <TextInput style={styles.input} type="text" name="link" placeholder="URL of job post" value={newJob.link} onChangeText={(value)=>checkURL(value,'link')}></TextInput>
                <TextInput style={styles.input} type="text" name="resume" placeholder="URL of resume" value={newJob.resumeLink} onChangeText={(value)=>checkURL(value,'resumeLink')}></TextInput>
                <TextInput style={styles.input} type="text" name="cover" placeholder="URL of cover letter" value={newJob.coverLetterLink} onChangeText={(value)=>checkURL(value,'coverLetterLink')}></TextInput>
                <TextInput style={styles.input} name="notes" placeholder="Notes" value={newJob.notes} onChangeText={(value)=>setNewJob({...newJob, notes:value})}></TextInput>

                <View style={styles.buttonContainer}>
                    <MyButton action={handleSubmit} text={buttonName}/>
                    <MyButton text='Cancel' action={()=>navigation.goBack()}/>
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
