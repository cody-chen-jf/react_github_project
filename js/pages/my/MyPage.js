import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'
import { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao'

export default class MyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='我的'
          style={{backgroundColor: '#2196F3'}}
        />
        <Text
          style={styles.text}
          onPress={() => {
            this.props.navigator.push({
              component: CustomKeyPage,
              params: {
                ...this.props,
                flag: FLAG_LANGUAGE.flag_key
              }
            })
          }}>自定义标签</Text>

        <Text
          style={styles.text}
          onPress={() => {
            this.props.navigator.push({
              component: CustomKeyPage,
              params: {
                ...this.props,
                flag: FLAG_LANGUAGE.flag_language
              }
            })
          }}>自定义语言</Text>

        <Text
          style={styles.text}
          onPress={() => {
            this.props.navigator.push({
              component: SortKeyPage,
              params: {
                ...this.props,
                flag: FLAG_LANGUAGE.flag_key
              }
            })
          }}>标签排序</Text>

        <Text
          style={styles.text}
          onPress={() => {
            this.props.navigator.push({
              component: SortKeyPage,
              params: {
                ...this.props,
                flag: FLAG_LANGUAGE.flag_language
              }
            })
          }}>语言排序</Text>

        <Text
          style={styles.text}
          onPress={() => {
            this.props.navigator.push({
              component: CustomKeyPage,
              params: {
                ...this.props,
                isRemoveKey: true
              }
            })
          }}>标签移除</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 18,
    margin: 10
  }
})