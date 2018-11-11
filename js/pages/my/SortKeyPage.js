import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import ArrayUtils from '../../util/ArrayUtils'
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao'
import SortableListView from 'react-native-sortable-listview'
import ViewUtils from '../../util/ViewUtils'

export default class SortKeyPage extends Component {
  constructor(props) {
    super(props)
    this.dataArray = []
    this.sortResultArray = []
    this.originalCheckedArray = []
    this.state = {
      checkedArray: []
    }
  }

  componentDidMount() {
    this.languageDao = new LanguageDao(this.props.flag)
    this.loadData()
  }

  loadData() {
    this.languageDao.fetch()
      .then(result => {
        console.log('result === ', result)
        this.getCheckedItems(result)
      })
      .catch(error => {

      })
  }

  getCheckedItems(result) {
    this.dataArray = result
    let checkedArray = []
    for (let i = 0, len = result.length; i < len; i++) {
      let data = result[i]
      console.log('data ==== ', data)
      if (data.checked) {
        checkedArray.push(data)
      }
    }
    console.log('checkedArray === ', checkedArray)
    this.setState({
      checkedArray: checkedArray
    })

    this.originalCheckedArray = ArrayUtils.clone(checkedArray)
    console.log('originalCheckedArray === ', this.originalCheckedArray)

  }

  onBack() {
    if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigator.pop()
      return
    }
    Alert.alert(
      '提示',
      '是否保存修改',
      [
        {
          text: '否', onPress: () => {
            this.props.navigator.pop()
          }, style: 'cancel'
        },
        {
          text: '是', onPress: () => {
            this.onSave(true)
          }
        }
      ]
    )
  }

  onSave(isChecked) {
    if (!isChecked && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigator.pop()
      return
    }
    this.getSortResult()
    this.languageDao.save(this.sortResultArray)
    this.props.navigator.pop()
  }

  getSortResult() {
    this.sortResultArray = ArrayUtils.clone(this.dataArray)
    for (let i = 0; i < this.originalCheckedArray.length; i++) {
      let item = this.originalCheckedArray[i]
      let index = this.dataArray.indexOf(item)
      this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
    }
  }

  render() {
    let title = this.props.flag === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序'
    let rightButton = <TouchableOpacity onPress={() => this.onSave()}>
      <View>
        <Text style={styles.right_button}>保存</Text>
      </View>
    </TouchableOpacity>
    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          statusBar={{
            backgroundColor: '#2196F3',
            barStyle: 'light-content'
          }}
          style={{backgroundColor: '#2196F3'}}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
        />
        <SortableListView
          style={{flex: 1}}
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={row => <SortCell data={row}/>}
        />
      </View>
    )
  }
}

class SortCell extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={styles.item}
        {...this.props.sortHandlers}
      >
        <View style={styles.row}>
          <Image style={styles.image} source={require('./img/ic_sort.png')}/>
          <Text>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    tintColor: '#2196F3',
    height: 16,
    width: 16,
    marginRight: 10
  },
  right_button: {
    color: 'white',
    fontSize: 16,
    margin: 5
  }
})