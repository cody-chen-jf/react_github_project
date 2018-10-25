import React, { Component } from 'react'
import {
  AsyncStorage
} from 'react-native'

export default class DataRepository {
  async fetchRepository(url) {
    let result = await this.fetchLocalRepository(url)
    if (result) {
      return result
    } else {
      return await this.fetchNetRepository(url)
    }
  }

  fetchLocalRepository(url) {
    return new Promise((resolve, reject)=> {
      AsyncStorage.getItem(url, (error, result)=> {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      })
    })
  }

 // async fetchLocalRepository(url) {
 //    console.log('urlppp === ', url)
 //    await AsyncStorage.getItem(url, (error, result) => {
 //      if (!error) {
 //        if(result) {
 //          // let result = JSON.parse(result)
 //          // console.log('fetchLocalRepository222 ==== ', result)
 //          return result
 //        }
 //      } else {
 //        console.log('error === ', error)
 //      }
 //    })
 //  }

  async fetchNetRepository(url) {
    let response = await fetch(url)
    let returnData = await response.json()
    this.saveRepository(url, returnData.items)
    return returnData
  }

  saveRepository(url, items, callBack) {
    if(!url || !items) {
      return null
    } else {
      let wrapData = {items: items, update_date: new Date().getTime()}
      AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack)
    }
  }

  checkDate(longTime) {
    let cDate = new Date()
    let tDate = new Date()
    tDate.setTime(longTime)

    if(cDate.getMonth() !== tDate.getMonth()) return false
    if(cDate.getDay() !== tDate.getDay()) return false
    if(cDate.getHours() - tDate.getHours() > 4) return false
    return true
  }
}