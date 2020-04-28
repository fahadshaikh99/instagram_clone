import React from 'react';
import { View, Text} from 'react-native';

class upload extends React.Component {
    render() {
        return(
            <View style={{ justifyContent: 'center' , alignItems: 'center', flex: 1}}>
                <Text>
                    Upload Image
                </Text>
            </View>
        );
    }
}
export default upload;


// import React from 'react';
// import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
// import { f, auth, storage, database } from '../../config/config.js';
// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';





// class upload extends React.Component {
    
// constructor(props) {
//     super(props);
//     console.ignoredYellowBox = ['Setting a timer'];
//         this.state = {
//             loggedin: false,
//             ImageId: this.uniqueId(),
//             imageSelected: false,
//             uploading: false,
//             caption: '',
//             progress: 50
//         }
    
//    // alert(this.uniqueId());

//     }

// _checkPermissions = async () => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({
//         camera: status
//     });

//     const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     this.setState({
//         cameraRoll: statusRoll
//     });
//     console.log('permissons Started');
// }

// s4  = () => {
//     return Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);
// }

// uniqueId = () => {
//     return '1'+this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
//     this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
// }

// findNewImage = async () => {
//     this._checkPermissions();
//     let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: 'Images',
//         allowEditing: true,
//         quality: 1
//     });

//     console.log(result);
//     if(!result.cancelled) {
//         console.log("Iamge Upload");
//        // this.uploadImage(result.uri);
//         this.setState({
//             imageSelected: true,
//             imageId: this.uniqueId(),
//             uri: result.uri
//         })


        
//     }
//     else {
//         console.log("You cancelled upload image option");
//         this.setState({
//             imageSelected: false
//         })
//     }
// }

// uploadPublish = () => {
//     if(this.state.uploading == false){
//         if(this.state.caption != '') {
//             this.uploadImage(this.state.uri);
//         }
//         else {
//             alert("Please Caption Needed");
//         }
//     }else
//         {
//             console.log('ignore the button because photo is uploading');
//         }
// }

// uploadImage =  async (uri) => {
//     var that = this;
//     var userId = f.auth().currentUser.uid;
//     var imageId = this.state.ImageId;

//    var re = /(?:\.([^.]+))?$/;
//    var ext = re.exec(uri)[1];
//     that.setState({ currentFileType: 'jpg', uploading: true});

//     const response = await fetch(uri);
//     const blob = await response.blob();
//     var FilePath = imageId+'.'+this.state.currentFileType;
    
//     var uploadTask = storage.ref('user/'+userId+'/img').child(FilePath).put(blob);

//     uploadTask.on('state_changed', function(snapshot) {
//         var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
//         console.log('Upload is '+progress+'% complete');
//         that.setState({
//             progress: progress,
//         })
//     }, function(error) {
//         console.log('error with upload' +error);
//     }, function() {
//         //complete
//         that.setState({ progress: 100});
//         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//             console.log(downloadURL);
//             that.processUpload(downloadURL);
//         });
//     });

   
// }

// processUpload = (imageUrl) => {
//     // process here
//     var imageId = this.state.imageId;
//     var userId = f.auth().currentUser.uid;
//     var DateTime = Date.now();
//     var timestamp = Math.floor(DateTime / 1000);
//     var caption = this.state.caption;
//     //build photo object
//     console.log(userId);
//     //author, caption, posted, url
//     var photoObj = {
//         author: userId,
//         caption: caption,
//         posted: timestamp,
//         url: imageUrl
//     }

//     // Update DataBase

//     // Add to main feed
//         database.ref('/photos/'+imageId).set(photoObj);

//     // Add to user object

//         database.ref('/users/'+userId+'/photos/'+imageId).set(photoObj);
//         alert("Image is uploaded");
//         this.setState({
//             uploading: false,
//             imageSelected: false,
//             caption: '',
//             uri: ''
//         })
// }

// componentDidMount = () => {
    
//     var that = this;
//     f.auth().onAuthStateChanged(function(user) {
//             if(user) {
//                 that.setState({
//                     loggedin: true
//                 });
//             }
//             else {
//                 that.setState({
//                     loggedin: false
//                 });
//             }
//     });
// }
    
//     render() {
//         return (
//             <View style={{ flex: 1}}>
            
//             {this.state.loggedin == true ? (
//                   // if logged In

//                   <View style={{ flex: 1}}>
//                       { this.state.imageSelected == true ? (

//                         <View style={{ flex: 1}}>
//                             <View style={{ height: 70, paddingTop:30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}} >
//                                 <Text>
//                                     Upload
//                                 </Text>
//                             </View>
//                             <View style={{ padding:5}}>
//                                 <Text style={{ marginTop: 5}}>
//                                         Caption
//                                 </Text>
//                                 <TextInput
//                                     editable={true}
//                                     placeholder={'Enter your Caption '}
//                                     maxLength={150}
//                                     multiline={true}
//                                     numberOfLines={4}
//                                     onChangeText={(text) => this.setState({ caption: text})}
//                                     style={{ marginVertical: 10, height: 100, padding: 5, borderColor: 'grey', borderWidth: 1, borderRadius: 3, backgroundColor: 'white', color: 'black'}}
//                                 />

//                                 <TouchableOpacity
//                                 onPress={() => this.uploadPublish()}
//                                 style={{ alignSelf: 'center', width: 170, marginHorizontal: 'auto', backgroundColor: 'purple', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20}}
//                                 >
//                                     <Text style={{ textAlign: 'center', color: 'white'}}>Upload and Publish</Text>
//                                 </TouchableOpacity>
//                                 { this.state.uploading == true ? (
//                                     <View style={{ marginTop: 10}}>
//                                         <Text>{this.state.progress}%</Text>
//                                      {this.state.progress != 100 ? (
//                                          <ActivityIndicator size="small" color="blue" />
//                                      ) : (
//                                          <Text> Processing </Text>
//                                      )}
//                                     </View>
//                                 ) : (
//                                         <View></View>
//                                 )}
//                                 <Image 
//                                 source={{ uri: this.state.uri}}
//                                 style={{ marginTop: 10, resizeMode: 'cover', width: '100%', height: 275}}
//                                 />
//                             </View>
//                         </View>

//                        ) : ( 

//                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
//                     <Text style={{ fontSize: 28, paddingBottom: 15}}>
//                         Upload
//                     </Text>

//                     <TouchableOpacity
//                     style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'blue', borderRadius: 8 }}
//                     onPress={() => this.findNewImage()}
//                     >
//                         <Text style ={{ color: 'white'}}>Select Photo</Text>
//                     </TouchableOpacity>
//                   </View>
//                     )}
//                 </View>
                  
//             ): (
//                 // if not loggged In
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//                     <Text>Please LogIn first </Text>
//                 </View>
//             )}

        
//             </View>
//         );
//     }
// }
// export default upload;

