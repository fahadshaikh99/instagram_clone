import React from 'react';
import { View, Text,  TouchableOpacity, FlatList, Image, ActivityIndicator} from 'react-native';
import { f, auth, storage, database } from '../config/config';

class photoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }

    componentDidMount = () => {
        const { isUser, userId} = this.props;
        console.log(userId);
        if(isUser == true) {
            //Profile
            //userId
            this.LoadFeed(userId);

        }
        else {
            this.LoadFeed('');
        }
    }

    pluralCheck = (s) => {
        if(s == 1) {
            return ' ago';
        }
        else {
            return 's ago';
        }
    }
    
    
    timeConvertor = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if(interval > 1) {
            return interval+ ' year'+this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 2592000);
        if(interval > 1) {
            return interval+ ' month'+this.pluralCheck(interval);
        } 
        interval = Math.floor(seconds / 86400);
        if(interval > 1) {
            return interval+ ' days'+this.pluralCheck(interval);
        } 
        interval = Math.floor(seconds / 3600);
        if(interval > 1) {
            return interval+ ' hours'+this.pluralCheck(interval);
        } 
        interval = Math.floor(seconds / 60);
        if(interval > 1) {
            return interval+ ' mints'+this.pluralCheck(interval);
        } 
        return Math.floor(seconds) + ' second'+this.pluralCheck(seconds);
    }
    
    addToFlatList = (photo_feed, data, photo) => {
        var that = this;
        var photoObj = data[photo];
        database.ref('users').child(photoObj.author).child('username').once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            photo_feed.push({
                id: photo,
                url: photoObj.url,
                caption: photoObj.caption,
                posted: that.timeConvertor(photoObj.posted),
                author: data,
                authorId: photoObj.author
            });
    
            that.setState({
                refresh: false,
                loading: false
            });
    
        }).catch(error => console.log(error));
    }
    
    
    LoadFeed = (userId = '') => {
        this.setState({
            refresh: true,
            photo_feed: []
    });
          console.log(userId);  
        
            var that = this;

            var loadRef = database.ref('photos');
            if(userId != '') {
                loadRef = database.ref('users').child(userId).child('photos');
            }

            loadRef.orderByChild('posted').once('value').then(function(snapshot) {
                const exists = (snapshot.val() !== null);
                if(exists) data = snapshot.val();
                    var photo_feed = that.state.photo_feed;
                    for(var photo in data) {
                        that.addToFlatList(photo_feed, data, photo);
                    }
            }).catch(error => console.log(error));
    
        }
     
    LoadNew = () => {
    
        this.LoadFeed();
        
    }



    render() {


        return (
                <View style={{ flex: 1 }} >
                 {this.state.loading ==  true ? (
                     <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center'}}><ActivityIndicator size="large" color="red" /></View>
                 ) : ( 
    
                <FlatList 
                    refreshing={this.state.refresh}
                    onRefresh={this.LoadNew}
                    data={this.state.photo_feed}
                    keyExtractor={(item, index) => index.toString()}
                    style={{flex: 1, backgroundColor: '#eee'}}
                    renderItem={({item, index}) => (
    
                    <View key={index} style={{ width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-around', borderBottomWidth: 1, borderColor: 'grey'}}>
                        <View style={{ flexDirection: 'row', padding: 5, width: '100%', justifyContent: 'space-between'}}>
                            <Text>{item.posted}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('User', { userId: item.authorId})}>
                            <Text>{item.author}</Text>
                            </TouchableOpacity>
                        </View>
                    
                        <View>
                            <Image 
                            source={{ uri: item.url }} 
                            style={{ resizeMode: 'cover', width: '100%', height: 275 }}
                            />
                        </View>
    
                        <View style={{ padding: 5}}>
                            <Text>{item.caption}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { photoId: item.id})}>
                            <Text style={{ textAlign: 'center', marginTop: 10 }}> View Comments...</Text>
                            </TouchableOpacity>
                        </View>
    
                    </View>
                    )}
                />
    
                )}
                       
                    
                </View>
            );
        }
}

export default photoList;