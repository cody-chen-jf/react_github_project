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
    this.array = []
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
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
      this.props.navigator.pop()
      return
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
    return (
      <CheckBox
        style={{flex: 1, padding: 10}}
        onClick={() => this.onClick(data)}
        isChecked={data.checked}
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
    let rightButton = <TouchableOpacity onPress={() => this.onSave()}>
      <View>
        <Text style={styles.right_button}>保存</Text>
      </View>
    </TouchableOpacity>
    return (
      <View style={styles.container}>
        <NavigationBar
          title='自定义标签'
          style={{backgroundColor: '#2196F3'}}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
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
  right_button: {
    color: 'white',
    fontSize: 16,
    margin: 5
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