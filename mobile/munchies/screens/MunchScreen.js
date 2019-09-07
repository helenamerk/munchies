import * as React from 'react';
import {Text, View} from 'react-native';
import { getVenueDetails, joinMunch, getMunchMembers } from '../requests';

class DoneScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Munch Guidance',
      /* These values are used instead of the shared configuration! */
      header: null,
    };
  };

  state = {
    notification: {},
    venue: ''
  };

  componentDidMount = async () => {
    let {navigation} = this.props;
    let notif = navigation.getParam('notification')

    console.log(notif.data.munch_id)
    let venue = await getVenueDetails(notif.data.munch_id);
    await joinMunch(notif.data.munch_id);
    let members = await getMunchMembers(notif.data.munch_id); //'you and the organizer:)'

    this.setState({notification: notif, venue: venue, members: members});
    console.log('sending message :-)')
    console.log(venue)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Group Members: {this.state.members}</Text>
        <Text>Location: {this.state.venue}</Text>
      </View>
    );
  }
}

export default DoneScreen;
