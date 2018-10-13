import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  RefreshControl
} from 'react-native'
import NavigationBar from './../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import RepositoryCell from '../common/RepositoryCell'

export default class WelcomePage extends Component {

  render() {
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

        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar/>}
          tabBarBackgroundColor="#2196F3"
          tabBarActiveTextColor="white"
          tabBarInactiveTextColor="mintcream"
          tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
        >
          <PopularTab tabLabel="Java">Java</PopularTab>
          <PopularTab tabLabel="iOS">iOS</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="Javascript">Javascript</PopularTab>
        </ScrollableTabView>

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
    return <RepositoryCell data={data}/>
  }

  async onLoad() {
    this.setState({
      isLoading: true
    })
    let url = this.generateUrl(this.props.tabLabel)
    console.log('this.dataRepository === ', this.dataRepository.fetchNetRepository)
    let data = await this.dataRepository.fetchNetRepository(url)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data.items),
      isLoading: false
    })
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