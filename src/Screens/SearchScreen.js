import React from 'react';
import { View, Text} from 'react-native';
import SearchBar from '../Components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';

class SearchScreen extends React.Component {
    render() {
        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                <SearchBar
                    placeholder="Search Messages"
                />
                <View style={{ marginTop: '30%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Search People</Text>
                </View>
            </View>
        );
    }
}

SearchScreen.navigationOptions = {
    tabBarIcon: <Icon name="search" size={25}/>

}

export default SearchScreen;