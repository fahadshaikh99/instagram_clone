import React from 'react';
import { View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class MessagesScreen extends React.Component {
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Text> You Don't have any messages</Text>
            </View>
        );
    }
}


MessagesScreen.navigationOptions = {
    tabBarIcon: <Icon name="message" size={25}/>

}

export default MessagesScreen;