import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import NavigationBar from './NavigationBar'
import HttpUtils from './HttpUtils'

export default class FetchTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
  }

  async onLoad(url) {
    let response = await HttpUtils.get(url)
    this.setState({
      result: JSON.stringify(response)
    })

  }

  async submitData(url, data) {
    let responseJson = await HttpUtils.post(url, data)
    this.setState({
      result: JSON.stringify(responseJson)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="FetchTest"
        />
        <Text
          onPress={() => {
            console.log('oooooo')
            this.onLoad('https://facebook.github.io/react-native/movies.json')
          }}
        >
          获取数据
        </Text>

        <Text
          onPress={() => {
            this.submitData('https://track.cargosmart.ai/api/public/login', {userName: 'demouser', password: 'demo!!'})
          }}
        >
          发送数据
        </Text>

        <Text>
          {this.state.result}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 18
  },
  linearGradient: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  }
})