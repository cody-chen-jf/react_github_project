import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native'

import Toast, {DURATION} from 'react-native-easy-toast'
import TabNavigator from 'react-native-tab-navigator'
import PopularPage from './PopularPage'
import MyPage from './my/MyPage'
import AsyncStorageTest from '../../AsyncStorageTest'
import WebViewTest from '../../WebViewTest'

export default class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'tb_popular'
    }
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.toast.show(text, DURATION.LONG)
    })
  }

  componentWillUnmount() {
    this.listener && this.listener.remove()
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{color: '#2196F3'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]}
                                             source={require('../../res/images/ic_polular.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_popular'})}>
            <PopularPage {...this.props}/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            title="趋势"
            selectedTitleStyle={{color: 'yellow'}}
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'yellow'}]}
                                             source={require('../../res/images/ic_trending.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_trending'})}>
            <AsyncStorageTest />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            title="收藏"
            selectedTitleStyle={{color: 'green'}}
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'green'}]}
                                             source={require('../../res/images/ic_favorite.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
            <WebViewTest />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            title="我的"
            selectedTitleStyle={{color: 'blue'}}
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'blue'}]}
                                             source={require('../../res/images/ic_my.png')}/>}
            onPress={() => this.setState({selectedTab: 'tb_my'})}>
            <MyPage {...this.props} />
          </TabNavigator.Item>
        </TabNavigator>

        <Toast ref={toast => this.toast = toast}/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 22,
    width: 22
  }
})