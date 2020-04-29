import React from 'react';
import { View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class IconComment extends React.Component {
    render() {
        return(
            <View>
                <Icon name="comments" size={28} color="#575757"/>
            </View>
        );
    }
}

export default IconComment;