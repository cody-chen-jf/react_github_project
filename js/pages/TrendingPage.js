import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native'
import NavigationBar from './../common/NavigationBar'
import DataRepository, { FLAG_STORAGE } from '../expand/dao/DataRepository'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import TrendingCell from '../common/TrendingCell'
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao'
import RepositoryDetail from './RepositoryDetail'
import TimeSpan from './../model/TimeSpan'
import Popover from './../common/Popover'

const timeSpanTextArray = [
  new TimeSpan('今 天', 'since=daily'),
  new TimeSpan('本 周', 'since=weekly'),
  new TimeSpan('本 月', 'since=monthly')
]

export default class TrendingPage extends Component {
  constructor(props) {
    super(props)
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language)
    this.state = {
      languages: [],
      isVisible: false,
      buttonRect: {},
      timeSpan: timeSpanTextArray[0]
    }
  }

  componentDidMount() {
    this.loadTrendingData()
  }

  async loadTrendingData() {
    let result = await this.languageDao.fetch()
    this.setState({
      languages: result
    })
  }

  showPopover() {
    this.refs.button.measure((ox, oy, width, height, px, py) => {
      this.setState({
        isVisible: true,
        buttonRect: {x: px, y: py, width: width, height: height}
      })
    })
  }

  closePopover() {
    this.setState({isVisible: false})
  }

  renderTitleView() {
    return <View>
      <TouchableOpacity
        ref='button'
        onPress={() => this.showPopover()}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: '#FFFFFF', fontWeight: '400'}}>趋势 {this.state.timeSpan.showText}</Text>
          <Image style={{width: 12, height: 12, marginLeft: 5}}
                 source={require('../../res/images/ic_spinner_triangle.png')}/>
        </View>
      </TouchableOpacity>


    </View>
  }

  onSelectTimeSpan(timeSpan) {
    this.setState({
      timeSpan: timeSpan,
      isVisible: false
    })
  }

  render() {
    let content = this.state.languages.length > 0 ?
      <ScrollableTabView
        renderTabBar={() => <ScrollableTabBar/>}
        tabBarBackgroundColor="#2196F3"
        tabBarActiveTextColor="white"
        tabBarInactiveTextColor="mintcream"
        tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
      >
        {
          this.state.languages.map((result, index, array) => {
            let language = array[index]
            return language.checked ? <TrendingTab key={index} tabLabel={language.name} {...this.props} timeSpan={this.state.timeSpan} /> : null
          })
        }
      </ScrollableTabView> : null

    let timeSpanView =
      <Popover
        isVisible={this.state.isVisible}
        fromRect={this.state.buttonRect}
        placement='bottom'
        onClose={() => this.closePopover()}
        contentStyle={{backgroundColor: '#343434', opacity: 0.7}}
      >
        {
          timeSpanTextArray.map((result, i, arr) => {
            return <TouchableOpacity
              key={i}
              underlayColor='transparent'
              onPress={() => this.onSelectTimeSpan(arr[i])}
            >
              <Text style={{fontSize: 18, color: '#FFFFFF', fontWeight: '400', padding: 8}}>{arr[i].showText}</Text>
            </TouchableOpacity>
          })
        }
      </Popover>

    return (
      <View style={styles.container}>
        <NavigationBar
          titleView={this.renderTitleView()}
          statusBar={{
            backgroundColor: '#2196F3',
            barStyle: 'light-content'
          }}
          style={{backgroundColor: '#2196F3'}}
        />

        {content}
        {timeSpanView}

      </View>
    )
  }
}

class TrendingTab extends Component {
  constructor(props) {
    super(props)
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending)
    this.state = {
      result: '',
      isLoading: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.timeSpan !== this.props.timeSpan) {
      await this.onLoad(nextProps.timeSpan)
    }
  }

  async componentDidMount() {
    await this.onLoad(this.props.timeSpan, true)
  }

  generateUrl(timeSpan, category) {
    return `https://github.com/trending/${category}?${timeSpan}`
  }

  renderRow(data) {
    return <TrendingCell
      key={data.id}
      data={data}
      onSelect={() => this.onSelect(data)}
    />
  }

  onSelect(item) {
    this.props.navigator.push({
      component: RepositoryDetail,
      params: {
        item: item,
        ...this.props
      }
    })
  }

  async onLoad(timeSpan, isRefresh) {
    this.updateState({
      isLoading: true
    })
    let url = this.generateUrl(timeSpan.searchText, this.props.tabLabel)

    let data = await this.dataRepository.fetchRepository(url)
    let items = data && data.items ? data.items : data ? data : []
    if (items) {
      this.updateState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        isLoading: false
      })
    }
    if (data && data.update_date && !this.dataRepository.checkDate(data.update_date)) {
      DeviceEventEmitter.emit('showToast', '数据过时')
      let data = await this.dataRepository.fetchNetRepository(url)
      let items = data.items
      if (!items || items.length === 0) {
        return
      }
      this.updateState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      })
      DeviceEventEmitter.emit('showToast', '显示网络数据')
    } else {
      DeviceEventEmitter.emit('showToast', '显示缓存数据')
    }
  }

  onRefresh() {
    this.onLoad(this.props.timeSpan)
  }

  updateState(dic) {
    if(!this) {
      return
    }
    this.setState(dic)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => {this.onRefresh()}}
              colors={['#2196F3']}
              tintColor={'#2196F3'}
              title={'Loading ...'}
              titleColor={'#2196F3'}
            />
          }
        >

        </ListView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 20
  }
})