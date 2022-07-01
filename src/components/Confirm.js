import { View, Text,Button,StyleSheet} from 'react-native';
import MyButton from './MyButton';

export default function Confirm({action,navigation,cancel,name}) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Are you sure you want to delete {name}?</Text>
            <View style={styles.buttonContainer}>
                <MyButton text='Confirm' action={()=>{action()}}/>
                <MyButton text='Cancel' action={()=>{cancel(false)}}/>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:'#4297A0',
        padding:20,
        flex:2
    },
    text:{
        textAlign:'center',
        fontSize:20
    },
    buttonContainer:{
        marginTop:70,
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
    }
})