import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { f, auth, storage, database } from '../../config/config.js';
import PhotoList from '../Components/photoList';



class userProfile extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                loaded: false
            }
            
        }
    
    checkParams = () => {

        var params = this.props.navigation.state.params;
        if(params) {
            if(params.userId){
                this.setState({
                    userId: params.userId
                });
            this.fetchUserInfo(params.userId);
            }
        }
    }

    fetchUserInfo = (userId) => {
        var that = this;
        database.ref('users').child(userId).child('username').once('value').then(function(snapshot) {
            const exists = (snapshot.val()!== null);
            if(exists) data = snapshot.val();
                that.setState({ username: data});
        }).catch(error => console.log(error));
        
        database.ref('users').child(userId).child('name').once('value').then(function(snapshot) {
            const exists = (snapshot.val()!== null);
            if(exists) data = snapshot.val();
                that.setState({ name: data});
        }).catch(error => console.log(error));
       
        database.ref('users').child(userId).child('avatar').once('value').then(function(snapshot) {
            const exists = (snapshot.val()!== null);
            if(exists) data = snapshot.val();
                that.setState({ avatar: data, loaded: true});
        }).catch(error => console.log(error));
    }

    componentDidMount = () => {
        
        this.checkParams();
 
    }


    render() {
        return (
            <View style={{ flex: 1}}>
              
                
              { this.state.loaded == false ?  (
                  <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center'}}><ActivityIndicator size="large" color="red" /></View>
              ) : (
                <View style={{ flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 70, paddingTop:30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, alignItems: 'center'}} >
                        <TouchableOpacity 
                        style={{ width: 100}}
                        onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, paddingLeft: 5}}>
                                go back
                            </Text>
                        </TouchableOpacity>
                        <Text>Profile</Text>
                        <Text style={{ width: 100}}></Text>
                    </View>


                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
                        <Image source={{ uri: this.state.avatar }}
                        style={{marginLeft: 10, height: 100, width: 100, borderRadius: 50}}
                        />

                    <View>
                        <Text>{this.state.username}</Text>
                        <Text>{this.state.name}</Text>
                    </View>

                    </View>
                    <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>
                </View>
              )}
            </View>
        );
    }
}
export default userProfile;