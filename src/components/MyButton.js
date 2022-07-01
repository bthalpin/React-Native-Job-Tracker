import {TouchableOpacity,Text,StyleSheet} from 'react-native';

export default function MyButton({navigation,action,text,color,width}) {
    return (
        <TouchableOpacity style={styles(color,width).button} onPress={action}>
            <Text style={styles().text}>
                {text}
            </Text>
        </TouchableOpacity>
        
    );
}

const styles = (color,width="25%") => StyleSheet.create({
   button:{
    width:width,
    // maxWidth:100,
    backgroundColor:color,
    borderRadius:5,
    padding:10,
    margin:'auto',
    justifyContent:'center',
    alignItems:'center'
   },
   text:{
    color:'#fff',
    fontSize:16
}
})
