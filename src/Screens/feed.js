import React from 'react';
import { View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import { f, auth, storage, database } from '../../config/config.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FetchImage from '../Components/FetchImage';
import { withNavigation } from 'react-navigation';


class feed extends React.Component {

    constructor(props) {
        super(props);

        // disable Yellow warning Code
        console.disableYellowBox = true
        console.ignoredYellowBox = ['Setting a timer'];
        // end of yellow warning code


        this.login();
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }


// this function will check if user is logged in or not, if not it will navigate to login Component
// we Called this function inside constructor 
login = async (props) => {
    const { navigate } = this.props.navigation;
    f.auth().onAuthStateChanged(function(user) {
        if(!user) {
           console.log("You are not loged In");
            navigate('login');
           
        }
        else if(user) {
            console.log("You are loged In");
        }
    });
    

 }
 

// this function will load or feed

componentDidMount = () => {
        this.LoadFeed();
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
        return interval+ ' mins'+this.pluralCheck(interval);
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

LoadFeed = () => {
    this.setState({
        refresh: true,
        photo_feed: []
});
        
    
        var that = this;
        database.ref('photos').orderByChild('posted').once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                var photo_feed = that.state.photo_feed;
                for(var photo in data) {
                    that.addToFlatList(photo_feed, data, photo);
                }
        }).catch(error => console.log(error));

    }

// this function will call LoadFeed Function
// we called this function inside Flat list.

LoadNew = () => {

    this.LoadFeed();
    
}



render() {


    return (
            <View style={{ flex: 1 }} >
                <View style={{ height: '10%', paddingTop:'5%', backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{ fontSize: 30}}>
                        Feed
                    </Text>
                    </View>
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

                <View key={index} style={{ width: '100%', overflow: 'hidden', marginBottom: 5, borderBottomWidth: 1, borderColor: 'grey'}}>
                    <View style={{ flexDirection: 'row', padding: 5, width: '100%'}}>
                        
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('User', { userId: item.authorId})}>
                            <View style={{ flexDirection: 'row'}}>
                                <View>
                                <FetchImage 
                                    objectUrl={item.authorId}
                                />
                                </View>
                                <View style={{ marginTop: '5%', paddingLeft: '4%'}}>
                                    <Text>
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
export default withNavigation(feed);