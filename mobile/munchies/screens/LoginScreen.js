import * as React from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {BlueButton} from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import styles from '../config/styles';
import Storage from '../lib/Storage';
import Lottie from 'lottie-react-native';
import {registerUser} from '../requests';

class LoginScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: '',
      /* These values are used instead of the shared configuration! */
      header: null,
    };
  };

  state = {
    email: '',
    name: '',
  };

  handleEmailChange = (email) => {
    this.setState({email: email});
  };

  handleNameChange = (name) => {
    this.setState({name: name});
  };

  handleLoginPress = async () => {
    console.log(this.state.email)
    console.log(this.state.name)
    const res = await registerUser(this.state.name, this.state.email);
    console.log('done waiting')
    console.log(Object.keys(res))
    //await Storage.setItem('user_id', res.id);
    this.props.navigation.replace('OnboardingModals');
  };

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  componentDidMount() {
    console.log('HELLO from login')
    //this.animation.play();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.form}>
          {/* <Lottie
            ref={(animation) => {
              this.animation = animation;
            }}
            style={{
              flex: 1,
              top: 25,
              left: -80,
              height: 100,
              width: 100,
              backgroundColor: 'transparent',
            }}
            source={require('../assets/loading.json')}
          /> */}
          <View style={styles.formFields}>
            <FormTextInput
              value={this.state.name}
              onChangeText={this.handleNameChange}
              placeholder='Name'
            />
            <FormTextInput
              value={this.state.email}
              onChangeText={this.handleEmailChange}
              placeholder='Email'
            />
            <BlueButton label='Start' onPress={this.handleLoginPress} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
