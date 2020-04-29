import React from 'react';
import { View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import { f, database } from '../../config/config.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FetchImage from '../Components/FetchImage';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import IconComment from '../Components/IconComment';
import IconLike from '../Components/IconLike.js';


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
        return ' ago';
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
            <View style={{ flex: 1}} >
                <View style={{flexDirection: 'row', height: '10%', paddingTop:'1%', backgroundColor: 'white', borderColor: '#e1eaea', borderBottomWidth: 7, alignItems: 'center'}} >
                    <View style={{ paddingLeft: 7, opacity: 0.7}}>
                        <Image 
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png'}}
                            style={{ height: 40, width: 40, borderRadius: 20}}
                        />
                    </View>
                    <View style={{ paddingLeft: 20}}>
                        <Text style={{ fontSize: 30, fontStyle: 'italic'}}>
                            Instagram
                        </Text>
                    </View>
                    </View>
             {this.state.loading ==  true ? (
                 <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center'}}><ActivityIndicator size="large" color="red" /></View>
             ) : ( 

            <FlatList 
                refreshing={this.state.refresh}
                onRefresh={this.LoadNew}
                data={this.state.photo_feed}
                keyExtractor={(item, index) => index.toString()}
                style={{flex: 1, backgroundColor: 'white'}}
                renderItem={({item, index}) => (

                <View key={index} style={{ width: '100%', overflow: 'hidden', marginBottom: 5, borderBottomColor: '#e1eaea',borderBottomWidth: 7, marginBottom: '2%', borderColor: 'grey'}}>
                    <View style={{ flexDirection: 'row', padding: 5, width: '100%'}}>
                        
                        
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

                    <View style={{ padding: 5,}}>
                        <View style={{ padding: '3%'}}>
                            <Text style={{fontWeight: 'bold', fontStyle: 'italic', fontSize: 15}}>{item.caption}</Text>
                        </View>
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



feed.navigationOptions = {
    tabBarIcon: <Icon name="instagram" size={25}/>

}
export default withNavigation(feed);