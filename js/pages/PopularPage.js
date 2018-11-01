import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native'
import NavigationBar from './../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import RepositoryDetail from './RepositoryDetail'

export default class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
    this.state = {
      languages: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.languageDao.fetch().then(result => {
      this.setState({
        languages: result
      })
    }).catch(error => {
      console.log(error)
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
            return language.checked ? <PopularTab key={index} tabLabel={language.name} {...this.props} /> : null
          })
        }
      </ScrollableTabView> : null
    return (
      <View style={styles.container}>
        <NavigationBar
          title="最热"
          statusBar={{
            backgroundColor: '#2196F3',
            barStyle: 'light-content'
          }}
          style={{backgroundColor: '#2196F3'}}
        />

        {content}

      </View>
    )
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props)
    this.dataRepository = new DataRepository()
    this.state = {
      result: '',
      isLoading: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  async componentDidMount() {
    await this.onLoad()
  }

  generateUrl(key) {
    return `https://api.github.com/search/repositories?q=${key}&sort=stars&order=desc`
  }

  renderRow(data) {
    return <RepositoryCell
      key={data.id}
      data={data}
      onSelect={() => this.onSelect(data)}
    />
  }

  onSelect(item) {
    console.log('item === ', item)
    this.props.navigator.push({
      component: RepositoryDetail,
      params: {
        item: item,
        ...this.props
      }
    })
  }

  async onLoad() {
    this.setState({
      isLoading: true
    })
    let url = this.generateUrl(this.props.tabLabel)
    let data = await this.dataRepository.fetchRepository(url)
    let items = data && data.items ? data.items : data ? data : []
    if(items) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        isLoading: false
      })
    }
    if(data && data.update_date && !this.dataRepository.checkDate(data.update_date)) {
      DeviceEventEmitter.emit('showToast', '数据过时')
      let data = await this.dataRepository.fetchNetRepository(url)
      let items =  data.items
      if (!items || items.length === 0) {
        return
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      })
      DeviceEventEmitter.emit('showToast', '显示网络数据')
    } else {
      DeviceEventEmitter.emit('showToast', '显示缓存数据')
    }
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
              onRefresh={()=>{this.onLoad()}}
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