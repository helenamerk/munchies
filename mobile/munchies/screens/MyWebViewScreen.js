import * as React from 'react';
import {WebView} from 'react-native';

class MyWebViewScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: params ? params.viewTitle : 'Web View',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    const {navigation} = this.props;
    const url = navigation.getParam('viewSource', 'NO-URL');

    return <WebView source={{uri: url}} style={{marginTop: 0}} />;
  }
}

export default MyWebViewScreen;
