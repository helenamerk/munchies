import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Storage from './lib/Storage';

const exposed_url = 'http://0bc906c1.ngrok.io' //'http://localhost:3000'
const CREATE_USER_ENDPOINT = exposed_url + '/users'
const LOC_ENDPOINT = exposed_url + '/users/location'
const PUSH_ENDPOINT = exposed_url + '/token'
const MSG_ENDPOINT = exposed_url + '/message'

export const registerUser = async (name, email) => {
    return fetch(CREATE_USER_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name: name,
            email: email,
            pass: 'pass',
          },
        }),
      }).then((response) => {
        return response.json().then(data => {
          // do something with your data
          console.log('printing now finally:)')
          console.log(data.user_id)
          return Storage.setItem('user_id', data.user_id).then(() => {
            return data;
          })
        });
      }).catch(err => {
        console.log('here----')
        console.error(err)
        return 'err'
      })
    
}

export const storeUserLocation = async (location) => {
    let lat = String(location['latitude']);
    let long = String(location['longitude']);

    let user_id = await Storage.getItem('user_id');

    return fetch(LOC_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: {
            lat: lat,
            long: long,
          },
          user: {
            user_id: user_id,
          },
        }),
      });
};



export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  let user_id = await Storage.getItem('user_id');

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user_id: {
        value: user_id,
      },
    }),
  });
}

export const sendMessage = () => {
  return fetch(MSG_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'test message from sender'
      }),
    });

}