import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { f, auth, storage, database } from '../../config/config.js';
import PhotoList from '../../components/photoList';


class profile extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                loggedin: false,
               
            }
            
        }
    
    componentDidMount = () => {
        
        var that = this;
        f.auth().onAuthStateChanged(function(user) {
                if(user) {
                    that.setState({
                        loggedin: true,
                        userId: user.uid
                    });
                }
                else {
                    that.setState({
                        loggedin: false
                    });
                }
        });
    }


    render() {
        return (
            <View style={{ flex: 1}}>
              
                {this.state.loggedin == true ? (
                // if logged In
                <View style={{ flex: 1}}>
                    <View style={{ height: 70, paddingTop:30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}} >
                        <Text>Profile</Text>
                    </View>


                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
                        <Image source={{ uri: 'https://www.gstatic.com/tv/thumb/persons/589228/589228_v9_ba.jpg' }}
                        style={{marginLeft: 10, height: 100, width: 100, borderRadius: 50}}
                        />

                    <View>
                        <Text>@username</Text>
                        <Text>Name</Text>
                    </View>

                    </View>
                    <View style={{ paddingBottom: 20, borderBottomWidth: 1}}>
                        <TouchableOpacity style={{ marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5}}>
                            <Text style={{ textAlign: 'center', color: 'grey'}}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5}}>
                        <Text style={{ textAlign: 'center', color: 'grey'}}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Upload')}
                            style={{backgroundColor: 'grey', marginTop: 10, marginHorizontal: 40, paddingVertical: 35, borderRadius: 20, borderColor: 'grey', borderWidth: 1.5}}>
                            <Text style={{ textAlign: 'center', color: 'white'}}>Upload New</Text>
                        </TouchableOpacity>
                    </View>
                    <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>
                </View>
            ): (


                // if user is not logged In
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Please LogIn first </Text>
                </View>
            )}
            </View>
        );
    }
}
export default profile;