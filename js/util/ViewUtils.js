import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

export default class ViewUtils {
  static getLeftButton(callback) {
    return (
      <TouchableOpacity
        onPress={callback}>
        <Image
          source={require('../../res/images/ic_arrow_back_white_36pt.png')}
          style={{width: 25, height: 25, margin: 5}}
        />
      </TouchableOpacity>
    )
  }

  static getRightButton(callBack, rightButtonTitle) {
    return (
      <TouchableOpacity onPress={callBack}>
        <View>
          <Text style={{
            color: 'white',
            fontSize: 16,
            margin: 5
          }}>{rightButtonTitle}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}