import React from 'react';
import styles from '../config/styles';
import {View, Text} from 'react-native';
import Storage from '../lib/Storage'
// import {
//   refreshAllData,
//   logoutUser,
//   getUserCredentials,
// } from '../requests';

class LoadingScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };

  // reroute to login if no account found
  componentDidMount() {    
    Storage.getItem('user_id').then((creds) => {
        console.log('getting from db')
        console.log(creds)
      if (!creds) {
        this.props.navigation.navigate('LoginScreen');
      } else {
        this.props.navigation.navigate('HomeScreen');
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
}
export default LoadingScreen;
