import * as React from 'react';
import {View, Text} from 'react-native';
import { BlueButton } from '../components/Button';
import styles from '../config/styles';

import {storeUserLocation, registerForPushNotificationsAsync} from '../requests';

class OnboardingModals extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: params ? params.viewTitle : 'Permissions',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

    state = {
        location_permission: false,
        notification_permission: false,
    };

    enableLocations = async () => {
        console.log('LOCATIONS HERE')
        this.setState({location_permission: true});
        getCurrentLocation = async () => {
            return navigator.geolocation.getCurrentPosition(
            (location) => {
                console.log(location.coords);
                storeUserLocation(location.coords).then(() => {
                    return location.coords;
                });
            },
            (error) => Alert.alert(error.message),
                {enableHighAccuracy: true, timeout: 0, maximumAge: 1000}
            );
        };
    }

    enableNotifs = async () => {
        res = await registerForPushNotificationsAsync();
        console.log(res);
        this.setState({notification_permission: true})
        this.props.navigation.replace('HomeScreen');
    }

    render() {
    const request_location = !this.state.location_permission
    const request_notification = !request_location && !this.state.notification_permission

    return <View styles={styles.container}>
            {request_location && (
                <View>
                    <Text>To properly match you with nearby munchers, we need access to your location.</Text>
                    <BlueButton label='Enable Location'  onPress={() => this.enableLocations()} />
                </View>
            )}
            {request_notification && (
                <View>    
                    <Text>To properly alert you of nearby munchers, we need permission to send you push notifications.</Text>
                    <BlueButton label='Enable Notifications'  onPress={() => this.enableNotifs()} />
                </View>
            )}
        </View>;
    }
}

export default OnboardingModals;
