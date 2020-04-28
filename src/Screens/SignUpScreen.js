import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';
import { f, auth, storage, database } from '../../config/config.js';




class SignUpScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: ''
        }
    }

createUserObj = (userObj, email) => {
    console.log(userObj, email, userObj.uid);
    var uObj = {
        name: 'Enter name',
        username: '@name',
        avatar: 'https://aboutreact.com/wp-content/uploads/2018/07/react_native_bottom_navigation.png',
        email: email
    };
    database.ref('users').child(userObj.uid).set(uObj);
}

signup = async() => {
    var email = this.state.email;
    var pass = this.state.pass;
    if(email != '' && pass != '') {
        try{
            let user = await auth.createUserWithEmailAndPassword(email, pass)
            .then((userObj) => this.createUserObj(userObj.user, email))
            .catch((error) => alert(error));
        }catch(error){
            console.log(error);
            alert(error);
        }
        }
        else{ 
            alert('Email or password is empty');
        }
    }








    render() {

        console.disableYellowBox = true
        const image = { uri: "https://www.singhajit.com/wp-content/uploads/2015/09/gradient-2.png" };
        const { goBack } = this.props.navigation;
     return(
        <View style={{ flex: 1}}>
            <ImageBackground source={image} style={styles.image}>
            <View style={{ alignItems: 'center'}}>
              <Image 
                    style={{ height: 150, width: 150, borderRadius: 75, marginTop: '15%'  }}
                        source={{ uri: 'https://i.ya-webdesign.com/images/android-camera-icon-png-17.png'}}
                    />
            
            </View>
            {/* margin top in percentage */}
            <View style={{ marginTop: 13, alignItems: 'center'}}>

                <View style={styles.backgroundStyle}>
                        {/* <Icon style={styles.iconStyle}
                             name="mail"
                         /> */}
                        <TextInput 
                            style={styles.InputTextStyle}
                            placeholder="Email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            KeyboardAvoidingView
                            keyboardType={"email-address"}
                            editable={true}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text})}
                        
                        >
                
                        </TextInput>
                </View>

                <View style={styles.backgroundStyle}>
                        {/* <Icon style={styles.iconStyle}
                             name="lock"
                         /> */}
                        <TextInput 
                            style={styles.InputTextStyle}
                            placeholder="Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            KeyboardAvoidingView
                            editable={true}
                            value={this.state.pass}
                            onChangeText={(text) => this.setState({ pass: text})}
                        >
                
                        </TextInput>
                </View>

                {/* marginTop in percentage */}

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, justifyContent:'center'}}>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.signup()}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Create Account 
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: '7%'}}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                   Back to Login
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                   
                </View>
            </View>
           </ImageBackground>
        </View>
    );
}

}

// margins in percentage
const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        marginTop: 7,
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
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontWeight: "bold"
      },
      button: {
          borderRadius:10,
          paddingVertical: 14,
          paddingHorizontal: 50,
          backgroundColor: 'orange',
      },
      buttonText: {
          color: 'white',
          fontWeight: 'bold',
          fontSize:16,
          textAlign:'center'
      },
      image: {
        flex: 1,
        resizeMode: "cover",
       
      }
});

export default withNavigation(SignUpScreen);