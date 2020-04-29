import React from 'react';
import { View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class IconLike extends React.Component {
    render() {
        return(
            <View>
                <Icon name="heart" size={28}  color="#f76868"/>
            </View>
        );
    }
}

export default IconLike;