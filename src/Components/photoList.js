import React from 'react';
import { View, Text,  TouchableOpacity, FlatList, Image, ActivityIndicator} from 'react-native';
import { database } from '../../config/config';
import FetchImage from '../Components/FetchImage';
import IconComment from './IconComment';
import IconLike from './IconLike';

class photoList extends React.Component {

    // Set Initial state

    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }

    // this componentDidMount will call Loadfeed function when component will pass porps to this component

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

    // this function will check plural check for or timeStamp function 

pluralCheck = (s) => {
        if(s == 1) {
            return ' ago';
        }
        else {
            return 's ago';
        }
}
    

// this function will convert timeStamp into seconds months and Years
// we called this function inside AddToFlatList function
    

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

// this function will push our data(Firebase data) into photo_feed array
// we called this function inside Loadfeed function    

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
    
 // This function will fetch our data from firebase so that we can pass this data to addToFlatList function


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

// this function will reload the whole
// we called this function inside Flat list .

LoadNew = () => {
    
    

    const { isUser, userId} = this.props;
 
    if(isUser == true) {
        //Profile
        //userId
        this.LoadFeed(userId);

    }
    else {
        this.LoadFeed('');
    }
        
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
    
                                <View key={index} style={{backgroundColor: 'white', width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-around'}}>
                                    <View style={{ flexDirection: 'row', padding: 5, width: '100%', justifyContent: 'space-between'}}>
                                       
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('User', { userId: item.authorId})}>
                                    <View style={{ flexDirection: 'row'}}>
                                        <View>
                                        <FetchImage 
                                            objectUrl={item.authorId}
                                        />
                                        </View>
                                        <View style={{ marginTop: '5%', paddingLeft: '4%'}}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15, fontStyle: 'italic'}}>
                                                {item.author}
                                            </Text> 
                                            <Text>{item.posted}</Text> 
                                        </View>
                                     </View>
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
                                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}> 
                                        <TouchableOpacity>
                                
                                            <IconLike />
                        
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { photoId: item.id})}>
                            
                                        <IconComment />
                           
                                        </TouchableOpacity>
                                    </View>
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