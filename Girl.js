import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

import NavigationBar from './NavigationBar'

export default class Girl extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderButton(image) {
    return <TouchableOpacity
      onPress={() => {
        this.props.navigator.pop()
      }}>
      <Image source={image} style={{width: 25, height: 25, margin: 5}}/>
    </TouchableOpacity>
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Girl'}
          style={{
            backgroundColor: '#FF5A5B'
          }}
          leftButton={
            this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            this.renderButton(require('./res/images/ic_star.png'))
          }
        />

        <Text style={styles.text}>I am Girl</Text>
        <Text style={styles.text}>{this.props.word}</Text>
        <Text style={styles.text}
              onPress={() => {
                this.props.onCallBack('一盒巧克力')
                this.props.navigator.pop()
              }}>回送</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 18
  }
})