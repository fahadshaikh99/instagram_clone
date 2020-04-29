import React from 'react';
import { View, Text,  Image,  TouchableOpacity, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import { f, database } from '../../config/config.js';
import PhotoList from '../Components/photoList';
import Icon from 'react-native-vector-icons/FontAwesome';


class profile extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                loggedin: false,
               
            }
            
        }

    fetchUserInfo = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                that.setState({
                    username: data.username,
                    name: data.name,
                    avatar: data.avatar,
                    loggedin: true,
                    userId: userId

                })
        });
    }
    
    componentDidMount = () => {
        
        var that = this;
        f.auth().onAuthStateChanged(function(user) {
                if(user) {
                   that.fetchUserInfo(user.uid);
                }
                else {
                    that.setState({
                        loggedin: false
                    });
                }
        });
    }

    logoutUser = () => {
        f.auth().signOut();
        alert('Logged Out');
    }
    editable = () => {
        this.setState({ editingProfile: true})
    }

    saveProfile = () => {
        var name = this.state.name;
        var username = this.state.username;

        if(name !== '') {
            database.ref('users').child(this.state.userId).child('name').set(name);
        }

        if(username !== '') {
            database.ref('users').child(this.state.userId).child('username').set(username);
        }
        this.setState({ editingProfile: false});
    }

    render() {
        return (
            <View style={{ flex: 1}}>
              
                {this.state.loggedin == true ? (
                // if logged In
                <View style={{ flex: 1}}>
                    <View style={{ height: 65, paddingTop:10, backgroundColor: 'white', borderColor: 'lightgrey',  justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5}} >
                        <Text style={{marginBottom:'2%', fontStyle: 'italic', backgroundColor: 'white', fontWeight: 'bold', fontSize: 28}}>Profile</Text>
                    </View>


                    <View style={{ marginBottom:'2%', backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
                        <Image source={{ uri: this.state.avatar }}
                        style={{marginLeft: 10, height: 100, width: 100, borderRadius: 50}}
                        />

                    <View style={{ paddingRight: '10%'}}>
                        <Text style={{ fontSize: 20, fontStyle: 'italic'}}>{this.state.name}</Text>
                        <Text style={{ fontSize: 20, fontStyle: 'italic'}}>{this.state.username}</Text>
                        
                    </View>

                    </View>
                    {this.state.editingProfile == true ? (
                        <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 20}}>
                            <TouchableOpacity onPress={() => this.setState({ editingProfile: false})}>
                                <Text style={{ fontWeight: 'bold'}}>Cancel Editing</Text>
                            </TouchableOpacity>
                            <Text>Name</Text>
                            <TextInput 
                                editable={true}
                                placeholder={'Enter your name'}
                                onChangeText={(text) => this.setState({ name: text})}
                                value={this.state.name}
                                style={{ width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                            />
                            <Text>Username</Text>
                            <TextInput 
                                editable={true}
                                placeholder={'Enter your username'}
                                onChangeText={(text) => this.setState({ username: text})}
                                value={this.state.username}
                                style={{ width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                            />
                            <TouchableOpacity
                                onPress={() => this.saveProfile()}>
                                <Text style={{backgroundColor: 'blue', color: 'white',padding: 10, fontWeight: 'bold'}}> Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    ): (

            
                    <View style={{marginBottom:'2%',backgroundColor:'white', paddingBottom: 20, flexDirection: 'row', alignItems:'center', justifyContent:'space-evenly', paddingTop: '2%'}}>
                      
                        <TouchableOpacity 
                            onPress={() => this.editable()}
                            
                            >
                        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="edit" size={25}/>
                        <Text style={{ textAlign: 'center', color: 'black'}}>Edit Profile</Text>
                        </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Upload')}
                            
                            >
                            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name="upload" size={25}/>
                            <Text style={{ textAlign: 'center', color: 'black'}}>Upload New</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={ () => this.logoutUser()}
                            >
                            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name="sign-out" size={25} />
                            <Text style={{ textAlign: 'center', color: 'black'}}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    )}
                    <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>
                </View>
            ): (


                // if user is not logged In
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )}
            </View>
        );
    }
}

profile.navigationOptions = {
    tabBarIcon: <Icon name="user-circle" size={25}/>

}
export default profile;