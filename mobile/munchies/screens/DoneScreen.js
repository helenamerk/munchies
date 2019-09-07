import * as React from 'react';
import {Text, View} from 'react-native';
import {sendMessage} from '../requests';

class DoneScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'Done',
      /* These values are used instead of the shared configuration! */
      header: null,
    };
  };

  state = {
    email: '',
    password: '',
    failed: false,
  };

  componentDidMount() {
    sendMessage()
    console.log('sending message :-)')
  }

  render() {
    return (
      <View><Text>Hello</Text></View>
    );
  }
}

export default DoneScreen;
