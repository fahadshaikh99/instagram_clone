import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { f, database } from '../../config/config.js';
import FetchImage from '../Components/FetchImage';

class comments extends React.Component {
    
constructor(props) {
    super(props);
        this.state = {
            loading: true,
            refresh: true,
            loggedin: false,
            comments_list: []
        }
        
    }

checkParams = () => {

    var params = this.props.navigation.state.params;
        if(params) {
            if(params.photoId){
                this.setState({
                    photoId: params.photoId
                });
            this.fetchComments(params.photoId);
            }
        }
    }

addCommentsToList = (comments_list, data, comment) => {

// console.log(comments_list, data, comment);
    var that = this;
    var commentObj = data[comment];
    database.ref('users').child(commentObj.author).child('username').once('value').then(function(snapshot){
        
        const exists = (snapshot.val() !== null );
        if(exists) data = snapshot.val();

        comments_list.push({
            id: comment,
            comment: commentObj.comment,
            posted: that.timeConvertor(commentObj.posted),
            author: data,
            authorId: commentObj.author
        });

        that.setState({
            refresh: false,
            loading: false
        })

    }).catch(error => console.log(error));


}

fetchComments = (photoId) => {
        // fetch coometns here

        var that = this;
        database.ref('comments').child(photoId).orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) {
                // if comment add to array
                data = snapshot.val();
                var comments_list = that.state.comments_list;

                for ( var comment in data) {
                    that.addCommentsToList(comments_list, data, comment);
                }
            }
            else {
                that.setState({
                    comments_list: []
                });
            }
        }).catch(error => console.log(error));
}

componentDidMount = () => {
    
    var that = this;
    f.auth().onAuthStateChanged(function(user) {
            if(user) {
                that.setState({
                    loggedin: true
                });
            }
            else {
                that.setState({
                    loggedin: false
                });
            }
    });

    this.checkParams();
}


s4  = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

uniqueId = () => {
    return 'a'+this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
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
    
postComment = () => {
   // console.log("Hello Add text", comment);
    var comment = this.state.comment;
    if( comment != ''){

        // send to firebase
        var imageId = this.state.photoId;
        var userId = f.auth().currentUser.uid;
        var commentId = this.uniqueId();
        var dataTime = Date.now();
        var timestamp = Math.floor( dataTime / 1000);

        this.setState({ 
            comment: ''
        });

        var commentObj = {
            posted: timestamp,
            author: userId,
            comment: comment
        };

        database.ref('/comments/'+imageId+'/'+commentId).set(commentObj);
    
        // reload Comment List
        this.reloadCommentList();
    }
    else {
        alert("Please Enter a comment")
    }

}

reloadCommentList = () => {
    this.setState({
        comments_list: []
    });
    this.fetchComments(this.state.photoId);
}


    render() {
        return (
            <View style={{ flex: 1}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '10%', paddingTop:'4%', backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, alignItems: 'center'}} >
                        <TouchableOpacity 
                        style={{ width: 100}}
                        onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ fontSize: 17, fontStyle: 'italic'}}>
                                Go back
                            </Text>
                        </TouchableOpacity>
                        <View style={{ paddingLeft: 20}}>
                            <Text style={{ fontSize: 30, fontStyle: 'italic'}}>
                                Comments
                            </Text>
                        </View>
                        <Text style={{ width: 100}}></Text>
                    </View>

            {this.state.comments_list.length == 0 ? (
                 <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center'}}><Text> This Post don't have any comments</Text></View>
            ) : (
                <FlatList
                    data={this.state.comments_list}
                    refreshing={this.state.refresh}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1, backgroundColor: '#eee'}}
                    renderItem={({item, index}) => (
                        <View key={index} style={{backgroundColor:'white', width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between',  borderColor: 'grey'}}>
                            
                            
                            
                        <View style={{ flexDirection: 'row', padding: 5, width: '100%'}}>
                            
                            
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('User', { userId: item.authorId})}>
                                <View style={{ flexDirection: 'row'}}>
                                    <View>
                                    <FetchImage 
                                        objectUrl={item.authorId}
                                    />
                                    </View>
                                    <View style={{ marginTop: '10%', paddingLeft: '4%'}}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, fontStyle: 'italic'}}>
                                            {item.author}:
                                        </Text> 
                                        <Text style={{ fontSize: 10}}>{item.posted}</Text> 
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                                <Text>{item.comment}</Text>
                            </View>
                        </View>
                            
                        </View>
                )}
                />
            )}      
            {this.state.loggedin == true ? (
                  // if logged In
                  // behavior="padding" enabled 
                 // <View style={{ height: 70, paddingTop:30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}} >
                  <KeyboardAvoidingView  style={{borderTopWidth:1, borderTopColor: 'grey', padding: 10, marginBottom: 15 }}>
                      <Text style={{fontWeight: 'bold'}}> Post Comments</Text>
                      <TextInput
                      editable={true}
                      placeholder={'enter Your comment here'}
                      onChangeText={(text) => this.setState({comment: text})}
                      style={{ marginVertical: 10, height: 50, padding: 5, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white', color: 'black'}}
                      />
                    <TouchableOpacity 
                        onPress={() => this.postComment()}
                        style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#4d94ff', borderRadius: 5}}
                    >
                        <Text style={{ color: 'white'}}>Post</Text>
                    </TouchableOpacity>
                    
                  </KeyboardAvoidingView>      
                

                  
            ): (
                // if not loggged In
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                
            </View>
            )}

        
            </View>
        );
    }
}
export default comments;