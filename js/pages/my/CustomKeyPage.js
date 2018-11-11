import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import LanguageDao, { FLAG_LANGUAGE } from './../../expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../../util/ArrayUtils'

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataArray: []
    }
    this.isRemoveKey = this.props.isRemoveKey ? true : false
    this.array = []
    this.languageDao = new LanguageDao(this.props.flag)
    this.changeValues = []
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.languageDao.fetch().then(result => {
      this.setState({
        dataArray: result
      })
    }).catch(error => {
      console.log(error)
    })
  }

  onSave() {
    if (this.changeValues.length === 0) {
      console.log('ooo === ', this.props.navigator)
      this.props.navigator.pop()
      return
    }
    if (this.isRemoveKey) {
      for (let i = 0; i < this.changeValues.length; i++) {
        ArrayUtils.remove(this.state.dataArray, this.changeValues[i])
      }
    }
    this.languageDao.save(this.state.dataArray)
    this.props.navigator.pop()
  }

  onBack() {
    if (this.changeValues.length === 0) {
      this.props.navigator.pop()
      return
    }
    Alert.alert(
      'Message',
      'Do you want to save the change？',
      [
        {
          text: 'Cancel', onPress: () => {
            this.props.navigator.pop()
          }, style: 'cancel'
        },
        {
          text: 'Save', onPress: () => {
            this.onSave()
          }
        }
      ]
    )
  }

  renderView() {
    if (!this.state.dataArray || this.state.dataArray.length === 0) {
      return null
    }
    let len = this.state.dataArray.length
    let views = []
    for (let i = 0, l = len - 2; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.dataArray[i])}
            {this.renderCheckBox(this.state.dataArray[i + 1])}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }

    views.push(
      <View key={len - 1}>
        <View style={styles.item}>
          {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
          {this.renderCheckBox(this.state.dataArray[len - 1])}
        </View>
        <View style={styles.line}/>
      </View>
    )
    return views
  }

  renderCheckBox(data) {
    let leftText = data.name
    let isChecked = this.isRemoveKey ? false : data.checked
    return (
      <CheckBox
        style={{flex: 1, padding: 10}}
        onClick={() => this.onClick(data)}
        isChecked={isChecked}
        leftText={leftText}
        checkedImage={<Image source={require('../../pages/my/img/ic_check_box.png')}
                             style={{tintColor: '#2196F3'}}/>}
        unCheckedImage={<Image source={require('../../pages/my/img/ic_check_box_outline_blank.png')}
                               style={{tintColor: '#2196F3'}}/>}
      />
    )
  }

  onClick(data) {
    data.checked = !data.checked
    ArrayUtils.updateArray(this.changeValues, data)
  }

  render() {
    let title = this.isRemoveKey ? '标签移除' : '自定义标签'
    title = this.props.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : title
    let rightButtonTitle = this.isRemoveKey ? '移除' : '保存'

    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          style={{backgroundColor: '#2196F3'}}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={ViewUtils.getRightButton(() => this.onSave(), rightButtonTitle)}
        />
        <ScrollView>
          {this.renderView()}
        </ScrollView>
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
  },
  line: {
    height: 0.5,
    backgroundColor: 'darkgray'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})