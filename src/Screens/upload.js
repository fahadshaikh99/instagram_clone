import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import { f, auth, storage, database } from '../../config/config.js';
import ImagePicker from 'react-native-image-picker';


// This const variable is used for Image Gallery Options
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Gallery' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };



class upload extends React.Component {
    
    // Set Initial states
constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
        this.state = {
            loggedin: false,
            ImageId: this.uniqueId(),
            imageSelected: false,
            uploading: false,
            caption: '',
            progress: 50
        }
    

    }

    // S4 function is used to generate a random number or string
s4  = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

    // this uniqueId function will combine the multiple random string or number 

uniqueId = () => {
    return '1'+this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
}


// this findNewImage will open gallery when the user press button so that you can pick the image from gallery


findNewImage = async () => {
    ImagePicker.launchImageLibrary(options, (response) => {
        // Same code as in above section!

        if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {

        
          this.uploadPublish(response.uri);
            this.setState({
                imageSelected: true,
                imageId: this.uniqueId(),
                uri: response.uri
        })
          }
      });
}

    //this function will verify that user is added the caption or not.
        //  we called this function inside findNewImage function

uploadPublish = () => {
    if(this.state.uploading == false){
        if(this.state.caption !== '') {
            this.uploadImage(this.state.uri);
        }
        else {
            alert("Please Caption Needed");
        }
    }else
        {
            console.log('ignore the button because photo is uploading');
        }
}

// this function process the multiple functions, Like: Upload Image to firebase Storage, set the extension, and progress bar

uploadImage =  async (uri) => {
    var that = this;
    var userId = f.auth().currentUser.uid;
    var imageId = this.state.ImageId;

   var re = /(?:\.([^.]+))?$/;
   var ext = re.exec(uri)[1];
    that.setState({ currentFileType: 'jpg', uploading: true});

    const response = await fetch(uri);
    const blob = await response.blob();
    var FilePath = imageId+'.'+this.state.currentFileType;
    
    var uploadTask = storage.ref('user/'+userId+'/img').child(FilePath).put(blob);

    uploadTask.on('state_changed', function(snapshot) {
        var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
        console.log('Upload is '+progress+'% complete');
        that.setState({
            progress: progress,
        })
    }, function(error) {
        console.log('error with upload' +error);
    }, function() {
        //complete
        that.setState({ progress: 100});
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log(downloadURL);
            that.processUpload(downloadURL);
        });
    });

   
}

// we called this function inside Upload Imagge function. this function will add user post to main feed and user object

processUpload = (imageUrl) => {
    // process here
    var imageId = this.state.imageId;
    var userId = f.auth().currentUser.uid;
    var DateTime = Date.now();
    var timestamp = Math.floor(DateTime / 1000);
    var caption = this.state.caption;
    //build photo object
    console.log(userId);
    //author, caption, posted, url
    var photoObj = {
        author: userId,
        caption: caption,
        posted: timestamp,
        url: imageUrl
    }

    // Update DataBase

    // Add to main feed
        database.ref('/photos/'+imageId).set(photoObj);

    // Add to user object

        database.ref('/users/'+userId+'/photos/'+imageId).set(photoObj);
        alert("Image is uploaded");
        this.setState({
            uploading: false,
            imageSelected: false,
            caption: '',
            uri: ''
        })
}

    // component did mount function to verify that is user is logged In or not, this is not nesscery
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
}
    
    render() {
        return (
            <View style={{ flex: 1}}>
            
            {this.state.loggedin == true ? (
                  // if logged In

                  <View style={{ flex: 1}}>
                      { this.state.imageSelected == true ? (

                        <View style={{ flex: 1}}>
                            <View style={{ height: 70, paddingTop:30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}} >
                                <Text>
                                    Upload
                                </Text>
                            </View>
                            <View style={{ padding:5}}>
                                <Text style={{ marginTop: 5}}>
                                        Caption
                                </Text>
                                <TextInput
                                    editable={true}
                                    placeholder={'Enter your Caption '}
                                    maxLength={150}
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(text) => this.setState({ caption: text})}
                                    style={{ marginVertical: 10, height: 100, padding: 5, borderColor: 'grey', borderWidth: 1, borderRadius: 3, backgroundColor: 'white', color: 'black'}}
                                />

                                <TouchableOpacity
                                onPress={() => this.uploadPublish()}
                                style={{ alignSelf: 'center', width: 170, marginHorizontal: 'auto', backgroundColor: 'purple', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20}}
                                >
                                    <Text style={{ textAlign: 'center', color: 'white'}}>Upload and Publish</Text>
                                </TouchableOpacity>
                                { this.state.uploading == true ? (
                                    <View style={{ marginTop: 10}}>
                                        <Text>{this.state.progress}%</Text>
                                     {this.state.progress != 100 ? (
                                         <ActivityIndicator size="small" color="blue" />
                                     ) : (
                                         <Text> Processing </Text>
                                     )}
                                    </View>
                                ) : (
                                        <View></View>
                                )}
                                <Image 
                                source={{ uri: this.state.uri}}
                                style={{ marginTop: 10, resizeMode: 'cover', width: '100%', height: 275}}
                                />
                            </View>
                        </View>

                       ) : ( 

                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{ fontSize: 28, paddingBottom: 15}}>
                        Upload
                    </Text>

                    <TouchableOpacity
                    style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'blue', borderRadius: 8 }}
                    onPress={() => this.findNewImage()}
                    >
                        <Text style ={{ color: 'white'}}>Select Photo</Text>
                    </TouchableOpacity>
                  </View>
                    )}
                </View>
                  
            ): (
                // if not loggged In
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center'}}><ActivityIndicator size="large" color="green" /></View>
                </View>
            )}

        
            </View>
        );
    }
}
export default upload;

