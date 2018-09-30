/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, View, Image, Text } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import { Navigator } from 'react-native-deprecated-custom-components'
import Boy from './Boy'
import ListViewTest from './ListViewTest'
import FetchTest from './FetchTest'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
})

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<TabNavigator>*/}
        {/*<TabNavigator.Item*/}
        {/*selected={this.state.selectedTab === 'tb_popular'}*/}
        {/*title="最热"*/}
        {/*renderIcon={() => <Image style={styles.image1} source={require('./res/images/ic_polular.png')}/>}*/}
        {/*renderSelectedIcon={() => <Image style={[styles.image1, {tintColor: 'blue'}]} source={require('./res/images/ic_polular.png')}/>}*/}
        {/*badgeText="1"*/}
        {/*onPress={() => this.setState({selectedTab: 'tb_popular'})}>*/}
        {/*<View style={styles.page1}>*/}
        {/*<Text>*/}
        {/*aaa*/}
        {/*</Text>*/}
        {/*</View>*/}
        {/*</TabNavigator.Item>*/}
        {/*<TabNavigator.Item*/}
        {/*selected={this.state.selectedTab === 'tb_trending'}*/}
        {/*title="趋势"*/}
        {/*renderIcon={() => <Image style={styles.image1} source={require('./res/images/ic_polular.png')}/>}*/}
        {/*renderSelectedIcon={() => <Image style={[styles.image1, {tintColor: 'blue'}]} source={require('./res/images/ic_polular.png')}/>}*/}
        {/*badgeText="1"*/}
        {/*onPress={() => this.setState({selectedTab: 'tb_trending'})}>*/}
        {/*<View style={styles.page1}>*/}
        {/*<Text>*/}
        {/*aaa*/}
        {/*</Text>*/}
        {/*</View>*/}
        {/*</TabNavigator.Item>*/}
        {/*<TabNavigator.Item*/}
        {/*selected={this.state.selectedTab === 'tb_favorite'}*/}
        {/*title="收藏"*/}
        {/*renderIcon={() => <Image style={styles.image2} source={require('./res/images/ic_trending.png')}/>}*/}
        {/*renderSelectedIcon={() => <Image style={[styles.image2, {tintColor: 'blue'}]} source={require('./res/images/ic_trending.png')}/>}*/}
        {/*onPress={() => this.setState({selectedTab: 'tb_favorite'})}>*/}
        {/*<View style={styles.page2}>*/}
        {/*<Text>*/}
        {/*bbb*/}
        {/*</Text>*/}
        {/*</View>*/}
        {/*</TabNavigator.Item>*/}
        {/*<TabNavigator.Item*/}
        {/*selected={this.state.selectedTab === 'tb_my'}*/}
        {/*title="我的"*/}
        {/*renderIcon={() => <Image style={styles.image2} source={require('./res/images/ic_trending.png')}/>}*/}
        {/*renderSelectedIcon={() => <Image style={[styles.image2, {tintColor: 'blue'}]} source={require('./res/images/ic_trending.png')}/>}*/}
        {/*onPress={() => this.setState({selectedTab: 'tb_my'})}>*/}
        {/*<View style={styles.page2}>*/}
        {/*<Text>*/}
        {/*bbb*/}
        {/*</Text>*/}
        {/*</View>*/}
        {/*</TabNavigator.Item>*/}
        {/*</TabNavigator>*/}

        {/*<Navigator*/}
          {/*initialRoute={{*/}
            {/*component: Boy*/}
          {/*}}*/}
          {/*renderScene={(route, navigator) => {*/}
            {/*let Component = route.component*/}
            {/*return <Component navigator={navigator} {...route.params}/>*/}
          {/*}}>*/}
        {/*</Navigator>*/}

        {/*<Navigator*/}
          {/*initialRoute={{*/}
            {/*component: ListViewTest*/}
          {/*}}*/}
          {/*renderScene={(route, navigator) => {*/}
            {/*let Component = route.component*/}
            {/*return <Component navigator={navigator} {...route.params}/>*/}
          {/*}}>*/}

        {/*</Navigator>*/}


        <Navigator
          initialRoute={{
            component: FetchTest
          }}
          renderScene={(route, navigator) => {
            let Component = route.component
            return <Component navigator={navigator} {...route.params}/>
          }}>

        </Navigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  page1: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  page2: {
    flex: 1,
    backgroundColor: 'blue'
  },
  image1: {
    height: 22,
    width: 22
  },
  image2: {
    height: 22,
    width: 22
  }
})
