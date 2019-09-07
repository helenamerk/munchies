import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {sendMessage, createMunch} from '../requests';
import TimePicker from 'react-native-simple-time-picker';
import RNPickerSelect from 'react-native-picker-select';

import styles from '../config/styles'
import { BlueButton } from '../components/Button';

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
    selectedHours: 0,
    //initial Hours
    selectedMinutes: 0,
    //initial Minutes
    venue_id: 0,
  };

  scheduleMunch = async () => {
    const d = new Date();
    d.setHours(d.getHours()+this.state.selectedHours,d.getMinutes()+this.state.selectedMinutes,0,0);
    const munch_id = await createMunch(d, this.state.venue_id)
    console.log(munch_id)
    await sendMessage(munch_id)
    console.log('sending message :-)')

    console.log('-----------------asdf')
    console.log(munch_id)
    this.props.navigation.replace('MunchScreen', {notification: {data: {munch_id: munch_id, venue_id: this.state.venue_id}}});
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;

    return (
        <View style={styles.container}>
        <Text style={{fontSize: 17, fontWeight: "bold", paddingTop: '20%', paddingBottom: '-10%'}}>
          Meet starting in {selectedHours}hr:{selectedMinutes}min
        </Text>

        <TimePicker
          selectedHours={selectedHours}
          //initial Hourse value
          selectedMinutes={selectedMinutes}
          //initial Minutes value
          onChange={(hours, minutes) =>
            this.setState({ selectedHours: hours, selectedMinutes: minutes })
          }
        />
        <RNPickerSelect
            placeholder={{
                label: 'Please select a nearby venue',
                value: null,
                color: 'grey',
                }}
            onValueChange={value =>
                this.setState({ venue_id: value })
                }
            items={[
                { label: 'Vegan', value: 1 },
                { label: 'Mexican', value: 2 },
                { label: 'Thai', value: 3 },
            ]}
            style={pickerSelectStyles}
        />
        <BlueButton label='Confirm' onPress={this.scheduleMunch} />
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      paddingTop: 10,
      paddingBottom: 10,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      paddingTop: 40,
      paddingBottom: 10,
    },
  });

export default DoneScreen;
