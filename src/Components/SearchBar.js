import React from 'react';
import {View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SearchBar extends React.Component {

    render() {
        return(
                <View style={styles.backgroundStyle}>
                    <Icon style={styles.iconStyle}
                    name="search"
                    /> 
                    <TextInput 
                    style={styles.InputTextStyle}
                    placeholder={this.props.placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                
                    >
                        
                    </TextInput>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        
    },
    iconStyle: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 13
    },
    InputTextStyle: {
        fontSize: 20,
        flex: 1
    }
});

export default SearchBar;