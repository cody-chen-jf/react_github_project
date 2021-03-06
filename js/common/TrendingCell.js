import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import HTMLView from 'react-native-htmlview'

export default class TrendingCell extends Component {
  render() {
    let data = this.props.data
    let description = '<p>' + data.description + '</p>'
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {this.props.onSelect()}}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>{data.fullName}</Text>
          <HTMLView
            value={description}
            stylesheet={{
              p: styles.description,
              a: styles.description
            }}
          />

          <Text style={styles.description}>{data.meta}</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.author}>Build by:</Text>
              {data.contributors.map((result, i, arr) => {
                return <Image
                  key={i}
                  style={{width: 22, height: 22}}
                  source={{uri: arr[i]}}
                />
              })}
            </View>

            <Image style={{width: 22, height: 22}} source={require('../../res/images/ic_star.png')}/>

          </View>

        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  author: {
    color: '#757575',
    marginRight: 5
  }
})