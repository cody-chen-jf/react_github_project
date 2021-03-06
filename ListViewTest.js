import React, { Component } from 'react'
import {
  ListView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import NavigationBar from './NavigationBar'

var data = {
  'result': [
    {
      'email': 'f.lee@taylor.edu',
      'fullName': '张三张三张三张三'
    },
    {
      'email': 'g.jackson@hall.net',
      'fullName': '张三张三张三张三张三'
    },
    {
      'email': 'l.hall@rodriguez.com',
      'fullName': '张三张三张三张三'
    },
    {
      'email': 'q.lopez@davis.io',
      'fullName': '张三张三张三张三'
    },
    {
      'email': 'c.gonzalez@perez.net',
      'fullName': '张三张三张三'
    },
    {
      'email': 'a.johnson@williams.net',
      'fullName': '张三张三'
    },
    {
      'email': 'i.anderson@lopez.edu',
      'fullName': '张三张三'
    },
    {
      'email': 'r.lee@davis.org',
      'fullName': '张三张三'
    },
    {
      'email': 'o.young@lee.edu',
      'fullName': '张三张三张三张三张三'
    },
    {
      'email': 'j.wilson@williams.org',
      'fullName': '张三张三张三张三张三'
    },
    {
      'email': 'z.walker@jackson.io',
      'fullName': '张三张三'
    },
    {
      'email': 'j.martinez@brown.gov',
      'fullName': '张三张三张三张三'
    },
    {
      'email': 'y.martin@lewis.io',
      'fullName': '张三张三张三张三'
    },
    {
      'email': 'w.taylor@gonzalez.org',
      'fullName': '张三张三'
    },
    {
      'email': 'j.thomas@garcia.org',
      'fullName': '张三张三张三张三'
    }
  ],
  'statusCode': 0
}

export default class ListViewTest extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(data.result),
      isLoading: true
    }
    this.onRefresh()
  }

  renderRow(item) {
    return <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          this.toast.show('你单击了：' + item.fullName, DURATION.LENGTH_SHORT)
        }}
      >
        <Text style={styles.tips}>{item.fullName}</Text>
        <Text style={styles.tips}>{item.email}</Text>
      </TouchableOpacity>
    </View>
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return <View style={styles.line}/>
  }

  renderFooter() {
    return <View>
      <Image
        style={{width: 100, height: 100}}
        source={{uri: 'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}}/>
    </View>
  }

  onRefresh() {
    console.log('pppp', this.state.isLoading)
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 2000)

  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="ListView"/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(item) => this.renderRow(item)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
          renderFooter={() => this.renderFooter()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.onRefresh()}
            />
          }
        />
        <Toast ref={toast => {this.toast = toast}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tips: {
    fontSize: 18
  },
  row: {
    height: 50
  },
  line: {
    height: 1,
    backgroundColor: 'black'
  }
})