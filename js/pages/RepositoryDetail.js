import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput,
  WebView,
  DeviceEventEmitter
} from 'react-native'
import NavigationBar from './../common/NavigationBar'
import ViewUtils from './../util/ViewUtils'

const URL = 'https://github.com/facebook/react-native'
const TRENDING_URL = 'https://github.com/'

export default class RepositoryDetail extends Component {
  constructor(props) {
    super(props)
    this.url = this.props.item.html_url ? this.props.item.html_url : TRENDING_URL + this.props.item.fullName
    this.title = this.props.item.full_name ? this.props.item.full_name : this.props.item.fullName
    this.state = {
      url: this.url,
      title: this.title,
      canGoBack: false
    }
  }

  go() {
    this.setState({
      url: this.text
    })
  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      this.props.navigator.pop()
    }
  }

  onNavigationStateChange(e) {
    this.setState({
      canGoBack: e.canGoBack,
      title: e.title
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.title}
          style={{backgroundColor: '#2196F3'}}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
        />
        <WebView
          ref={webView => this.webView = webView}
          source={{uri: this.state.url}}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
          startInLoadingState={true}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tips: {
    fontSize: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    margin: 2
  }
})