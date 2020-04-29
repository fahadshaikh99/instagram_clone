import React from  'react';
import { View, StyleSheet, ImageBackground} from 'react-native';
import SignInFields from '../Components/SignInFields';

class loginScreen extends React.Component {

    
    render() {

        console.disableYellowBox = true
        const image = { uri: "https://www.singhajit.com/wp-content/uploads/2015/09/gradient-2.png" };
       
        
        return(
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <View>
                        <SignInFields />
                    </View>
                    
                </ImageBackground>
            </View>
    
            
        );
    }
}   
    
    const styles = StyleSheet.create({
        container: {
          flex: 1
          
        },
        image: {
          flex: 1,
          resizeMode: "cover",
         
        },
        text: {
          color: 'white',
          fontSize: 25,
          fontWeight: "bold"
        }
      });
            

export default loginScreen;