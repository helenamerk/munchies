import React from 'react';
import styles from '../config/styles';
import {View} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import Storage from '../lib/Storage';
import {Notifications} from 'expo';
import { registerForPushNotificationsAsync } from '../requests';

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

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    console.log('HERE IT MIGHT NOT BE DEFINED')
    console.log(notification.data)
    this.props.navigation.navigate('MunchScreen', {notification: notification});
  };

  handleStartPress = async () => {
    console.log('STARTED')

    this.props.navigation.navigate('DoneScreen');
  };

  handleThemedPress = () => {
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
              onPress={this.handleThemedPress}
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
