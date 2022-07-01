import {TouchableOpacity,Text,StyleSheet} from 'react-native';

export default function MyButton({navigation,action,text,color,width,font}) {
    return (
        <TouchableOpacity style={styles(color,width).button} onPress={action}>
            <Text style={styles(font).text}>
                {text}
            </Text>
        </TouchableOpacity>
        
    );
}

const styles = (color='#f56f76',width="25%",font=15) => StyleSheet.create({
   button:{
    width:width,
    // maxWidth:100,
    backgroundColor:color,
    borderRadius:5,
    padding:10,
    margin:5,
    // justifyContent:'center',
    alignItems:'center'
   },
   text:{
    color:'#fff',
    fontSize:font
}
})
