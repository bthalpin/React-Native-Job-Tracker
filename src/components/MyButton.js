import {TouchableOpacity,Text,StyleSheet} from 'react-native';

export default function MyButton({action,text,color,width,textSize}) {
    return (
        <TouchableOpacity style={styles(color,width).button} onPress={action}>
            <Text style={styles(textSize).text}>
                {text}
            </Text>
        </TouchableOpacity>
        
    );
}

const styles = (color='#f56f76',width="25%",textSize=15) => StyleSheet.create({
    button:{
        width:width,
        backgroundColor:color,
        borderRadius:5,
        padding:10,
        margin:5,
        alignItems:'center'
    },
    text:{
        color:'#fff',
        fontSize:textSize
    }
})
