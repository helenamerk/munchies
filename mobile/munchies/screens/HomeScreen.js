import React from 'react';
import styles from '../config/styles';
import {View} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import Storage from '../lib/Storage'
// import {
//   refreshAllData,
//   logoutUser,
//   getUserCredentials,
// } from '../requests';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };

  // reroute to login if no account found
  componentDidMount() {
    console.log('prerendering maybe')
    // Storage.getItem('user_id').then((creds) => {
    //     console.log(creds)
    //   if (!creds) {
    //     console.log('navigating!')
    //     this.props.navigation.navigate('LoginScreen');
    //   } else {
    //     console.log('already logged in')
    //   }
    // });
  }

  handleStartPress = async () => {
    console.log('STARTED')

    this.props.navigation.navigate('DoneScreen');
  };

  handleRecentsPress = () => {
    console.log('STARTED')

    this.props.navigation.navigate('DoneScreen');
  };

  handleLogoutPress = () => {
    console.log('Logout');
    Storage.removeItem('user_id').then((res) => {
        console.log('logged out')
    });
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    let {navigation} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formFields}>
            <BlueButton label='Start Munchgroup' onPress={this.handleStartPress} />
            <InverseButton
              label='Start Themed Munchgroup'
              onPress={this.handleRecentsPress}
            />
            <View style={{marginTop: 50}}>
              <InverseButton label='Logout' onPress={this.handleLogoutPress} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default HomeScreen;
