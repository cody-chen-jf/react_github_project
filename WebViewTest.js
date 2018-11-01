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
import NavigationBar from './NavigationBar'

const URL = 'https://github.com/facebook/react-native'

export default class WebViewTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: URL,
      title: '',
      canGoBack: false
    }
  }

  go() {
    this.setState({
      url: this.text
    })
  }

  goBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      DeviceEventEmitter.emit('showToast', '到顶了')
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
          title='WebView使用'
          style={{backgroundColor: '#2196F3'}}
        />
        <View style={styles.row}>
          <Text
            style={styles.tips}
            onPress={() => this.goBack()}
          >返回</Text>
          <TextInput
            style={styles.input}
            value={URL}
            onChangeText={text => this.text = text}
          >
          </TextInput>
          <Text
            style={styles.tips}
            onPress={() => this.go()}
          >前往</Text>
        </View>
        <WebView
          ref={webView => this.webView = webView}
          source={{uri: this.state.url}}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
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