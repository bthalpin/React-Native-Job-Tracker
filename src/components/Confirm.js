import { View, Text,Button} from 'react-native';

export default function Confirm({action,navigation,cancel,name}) {
    
    return (
        <View>
            <Text>Are you sure you want to delete {name}?</Text>
            <Button title='Confirm' onPress={()=>{action()}}/>
            <Button title='Cancel' onPress={()=>{cancel(false)}}/>
        </View>
    );
}