import React from  'react';
import { View, Text, Image} from 'react-native';
import { database } from '../config/config';

class FetchImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: ''
        }
         this.fetchUserInfo(this.props.objectUrl);   
    }
    
    fetchUserInfo = (userId) => {
        var that = this;
        
        database.ref('users').child(userId).child('avatar').once('value').then(function(snapshot) {
            const exists = (snapshot.val()!== null);
            if(exists) data = snapshot.val();
                that.setState({ avatar: data});
               // console.log(that.state.avatar)
        }).catch(error => console.log(error));
    }



    render() {
        
        return(
            <View>
                { this.state.loaded == '' ?  (
                  <View><Text> Loading ....</Text></View>
                ) : (
                <Image
                    source={{ uri: this.state.avatar }}
                    style={{marginLeft: 10, height: 100, width: 100, borderRadius: 50}}
                />
                )}
            </View>
        );
    }
}

export default FetchImage;