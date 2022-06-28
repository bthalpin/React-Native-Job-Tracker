import { View, Text,Button} from 'react-native';

export default function Confirm({action,navigation,cancel}) {
    
    return (
        <View>
            <Text>Confirm</Text>
            <Button title='Confirm' onPress={()=>{action()}}/>
            <Button title='Cancel' onPress={()=>{cancel(false)}}/>
        </View>
    );
}