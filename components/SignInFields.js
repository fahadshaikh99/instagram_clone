import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import { f, auth, storage, database } from '../config/config';
import { withNavigation } from 'react-navigation';


class SignInFields extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: ''
        }
    }

login = async () => {

    const { navigate } = this.props.navigation;


    var email = this.state.email;
    var pass = this.state.pass;
    if(email != '' && pass != '') {
        try{
            let user = await auth.signInWithEmailAndPassword(email, pass);
            if(user) {
                navigate('Home');
            }
        }
        catch(error){
            console.log(error);
            alert(error);
        }
    }
    else {
        alert('email and password is empty');
    }
}


    render(){

    return(
        <View style={{ marginTop: '40%'}}>

                <View style={{ alignItems: 'center'}}>
                    <Text style={styles.text}>
                        Enter your phone number?
                    </Text>
                </View>

                <View style={{ alignItems: 'center'}}>
          
                <View style={styles.backgroundStyle}>
                    {/* <Icon style={styles.iconStyle}
                    name="phone"
                    /> */}
                    <TextInput 
                        style={styles.InputTextStyle}
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType={"email-address"}
                        editable={true}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text})}
                    //    value={term}
                     //   onChangeText={onTermChange}
                      //  onEndEditing={onTermSubmited}
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
                        editable={true}
                        value={this.state.pass}
                        onChangeText={(text) => this.setState({ pass: text})}
                    //    value={term}
                     //   onChangeText={onTermChange}
                      //  onEndEditing={onTermSubmited}
                    >
                
                    </TextInput>
                </View>
               
                       
                    <View style={{ marginLeft: '49%'}}>
                        <Text style={{ color: 'white', fontSize: 15}}>Forget Password</Text>
                    </View>
                </View>
                    {/* marginTop in percentage */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, justifyContent:'space-evenly'}}>
                    <View>
                       <TouchableOpacity
                        onPress={() => this.login()}
                       >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Login
                                </Text>
                            </View>
                    </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Signup
                                </Text>
                            </View>
                        </TouchableOpacity> 
                    </View> 
                   
                </View>
                {/* marginTop in percentage */}
                <View style={{  alignItems: 'center', justifyContent: 'center', marginTop: 12}}>
                        <Text style={{ color: 'white'}}>
                            Or connect with
                        </Text>
                </View>
                {/* marginTop in percentage */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, justifyContent:'space-evenly'}}>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Google
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Facebook
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                   
                </View>

        </View>
    );
}
}
// margins in percentage
const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        width: '80%',
        
    },
    iconStyle: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 13
    },
    InputTextStyle: {
        fontSize: 20,
        flex:1
    },
    text: {
      color: 'white',
      fontSize: 25,
      fontWeight: "bold"
    },
    button: {
        borderRadius:20,
        paddingVertical: 14,
        paddingHorizontal: 50,
        backgroundColor: 'white',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize:16,
        textAlign:'center'
    }
  });

export default withNavigation(SignInFields);

