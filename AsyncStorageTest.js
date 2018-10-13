import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput
} from 'react-native'
import NavigationBar from './NavigationBar'
import Toast, { DURATION } from 'react-native-easy-toast'

const KEY = 'KEY'

export default class AsyncStorageTest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onSave() {
    AsyncStorage.setItem(KEY, this.text, (error) => {
      if (!error) {
        this.toast.show('保存成功', DURATION.LONG)
      }
    })
  }

  onRemove() {
    AsyncStorage.removeItem(KEY, (error) => {
      if(!error) {
        this.toast.show('移除成功', DURATION.LONG)
      }
    })
  }

  onFetch() {
    AsyncStorage.getItem(KEY, (error, result) => {
      if(!error){
        this.toast.show('取出的内容为: ' + result, DURATION.LONG)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='AsyncStorage的使用'
          style={{backgroundColor: '#2196F3'}}
        />
        <TextInput
          style={{borderWidth: 1, height: 40, margin: 5}}
          onChangeText={text => this.text = text}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text} onPress={() => this.onSave()}>保存</Text>
          <Text style={styles.text} onPress={() => this.onRemove()}>移除</Text>
          <Text style={styles.text} onPress={() => this.onFetch()}>取出</Text>
        </View>

        <Toast ref={toast => this.toast = toast}></Toast>
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