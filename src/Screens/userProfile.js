import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { database } from '../../config/config.js';
import PhotoList from '../Components/photoList';
import Icon from 'react-native-vector-icons/FontAwesome';



class userProfile extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                loaded: false
            }
            
        }
    // this function will get the parameters form navigation and passed as a argument to fetchUserInfo
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


// This Function will fetch User info from firebase like: Name, username, avatar and etc
// we called this function inside componentDidMount function
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


// this we call checkParams function
componentDidMount = () => {
        
        this.checkParams();
 
}


    render() {
        return (
            <View style={{ flex: 1}}>
              
                
              { this.state.loaded == false ?  (
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center'}}><ActivityIndicator size="large" color="red" /></View>
              ) : (
                <View style={{ flex: 1, backgroundColor: 'white', borderWidth: 0.5 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 70, paddingTop:'2%', backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, alignItems: 'center'}} >
                        <TouchableOpacity 
                            style={{ width: 100}}
                            onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 5}}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 5}}>
                            Profile
                        </Text>
                        <Text style={{ width: 100}}></Text>
                    </View>


                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
                        <Image source={{ uri: this.state.avatar }}
                        style={{marginLeft: 10, height: 100, width: 100, borderRadius: 50}}
                        />

                    <View style={{ paddingRight: '10%'}}>
                        <Text style={{ fontSize: 20, fontStyle: 'italic'}}>{this.state.name}</Text>
                        <Text style={{ fontSize: 20, fontStyle: 'italic'}}>{this.state.username}</Text>
                        
                    </View>

                    </View>
                    <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>
                </View>
              )}
            </View>
        );
    }
}

userProfile.navigationOptions = {
    tabBarIcon: <Icon name="user" size={20}/>

}
export default userProfile;