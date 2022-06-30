import {View, Text,TextInput,Button} from 'react-native';

export default function JobForm({navigation,handleSubmit,buttonName,newJob,setNewJob}) {
    return (
        <View>
               
            
               
                <TextInput type="text" name="Job" placeholder="Job Title" value={newJob.title} onChange={(e)=>setNewJob({...newJob, title:e.target.value})}></TextInput>
                
                <TextInput name="Description" placeholder="Description" value={newJob.description} onChange={(e)=>setNewJob({...newJob, description:e.target.value})}></TextInput>
                <TextInput type="text" name="contact" placeholder="Contact Information" value={newJob.contactInfo} onChange={(e)=>setNewJob({...newJob, contactInfo:e.target.value})}></TextInput>
                <TextInput type="text" name="link" placeholder="URL of job post" value={newJob.link} onChange={(e)=>setNewJob({...newJob, link:e.target.value})}></TextInput>
                 <TextInput type="text" name="resume" placeholder="URL of resume" value={newJob.resumeLink} onChange={(e)=>setNewJob({...newJob, resumeLink:e.target.value})}></TextInput>
                <TextInput type="text" name="cover" placeholder="URL of cover letter" value={newJob.coverLetterLink} onChange={(e)=>setNewJob({...newJob, coverLetterLink:e.target.value})}></TextInput>
                 <TextInput name="notes" placeholder="Notes" value={newJob.notes} onChange={(e)=>setNewJob({...newJob, notes:e.target.value})}></TextInput>

                <View>
                    
                    <Button className="jobFormAddBtn" onPress={handleSubmit} title={buttonName}></Button>
                    <Button title='Cancel' onPress={()=>navigation.goBack()}></Button>
                </View>
               
            </View>
        
    );
}