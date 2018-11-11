import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
import NavigationBar from './NavigationBar'
import GitHubTrending from 'GitHubTrending'

const URL = 'https://github.com/trending/'

export default class TrendingTest extends Component {
  constructor(props) {
    super(props)
    this.trending = new GitHubTrending()
    this.state = {
      result: ''
    }
  }

  onLoad() {
    this.url = URL + this.text
    this.trending.fetchTrending(URL)
      .then(result => {
        this.setState({
          result: JSON.stringify(result)
          // result: result
        })
      })
      .catch(error => {
        this.setState({
          result: error
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='TrendingTest'
          style={{
            backgroundColor: '#64b4ff'
          }}
        />
        <TextInput
          style={{height: 30, borderWidth: 1}}
          onChangeText={text => this.text = text}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text} onPress={() => this.onLoad()}>
            加载数据
          </Text>
          <Text>{this.state.result}</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20
  }
})