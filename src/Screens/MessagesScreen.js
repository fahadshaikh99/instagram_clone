import React from 'react';
import { View, Text} from 'react-native';


class MessagesScreen extends React.Component {
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Text> You Don't have any messages</Text>
            </View>
        );
    }
}

export default MessagesScreen;